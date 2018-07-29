// The following functions are from devsneks snekfetch module, but slightly altered.
/*
MIT License

Copyright (c) 2017 Gus Caplan

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

const { METHODS } = require('http');
const { stringify } = require('querystring');
const Stream = require('stream');
const FormData = require('./forms/FormData');

module.exports = Fetchain => {
	Fetchain.prototype.query = function query(name, value) {
		if (Array.isArray(name)) {
			for (const [k, v] of name) {
				this.options.url.searchParams.set(k, v);
			}
		} else if (name && name.constructor === Object) {
			for (const [k, v] of Object.entries(name)) {
				this.options.url.searchParams.set(k, v);
			}
		} else {
			this.options.url.searchParams.set(name, value);
		}
		return this;
	};

	Fetchain.prototype.set = function set(name, value) {
		if (Array.isArray(name)) {
			for (const [k, v] of name) {
				this.options.headers.set(k.toLowerCase(), v);
			}
		} else if (name && name.constructor === Object) {
			for (const [k, v] of Object.entries(name)) {
				this.options.headers.set(k.toLowerCase(), v);
			}
		} else {
			this.options.headers.set(name.toLowerCase(), value);
		}
		return this;
	};

	Fetchain.prototype.attach = function attach(...args) {
		const form = this.options.body instanceof FormData ? this.options.body : this.options.body = new FormData();
		if (args[0] && args[0].constructor === Object) {
			for (const [k, v] of Object.entries(args[0])) {
				this.attach(k, v);
			}
		} else {
			form.append(...args);
		}
		return this;
	};

	Fetchain.prototype.send = function send(data) {
		if (data instanceof FormData || Buffer.isBuffer(data) || data instanceof Stream) {
			this.options.body = data;
		} else if (data !== null && typeof data === 'object') {
			const header = this.options.headers.get('content-type');
			let serialize;
			if (header) {
				if (header.includes('application/json')) {
					serialize = JSON.stringify;
				} else if (header.includes('urlencoded')) {
					serialize = stringify;
				}
			} else {
				this.set('Content-Type', 'application/json');
				serialize = JSON.stringify;
			}
			this.options.body = serialize(data);
		} else {
			this.options.body = data;
		}
		return this;
	};

	Fetchain.prototype.catch = function catchPromise(rejecter) {
		return this.then(null, rejecter);
	};

	Fetchain.METHODS = METHODS.filter((method) => method !== 'M-SEARCH');
	for (const method of Fetchain.METHODS) {
		Fetchain[method.toLowerCase()] = function httpMethod(url, opts) {
			const Constructor = this && this.prototype instanceof Fetchain ? this : Fetchain;
			return new Constructor(method, url, opts);
		};
	}
};
