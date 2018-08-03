// The following code is slightly modified from devsneks original code
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

const path = require('path');
const Mime = require('./Mime');

const CRLF = '\r\n';

class FormData {

	constructor() {
		this.boundary = `--chainfetch--${Math.random().toString().slice(2, 7)}`;
		this.buffers = [];
	}

	append(name, data, filename) {
		if (typeof data === 'undefined') return undefined;
		let str = `${CRLF}--${this.boundary}${CRLF}Content-Disposition: form-data; name="${name}"`;
		let mimetype = null;
		if (filename) {
			str += `; filename="${filename}"`;
			mimetype = 'application/octet-stream';
			const extname = path.extname(filename).slice(1);
			if (extname) mimetype = Mime.fromExtensionName(extname);
		}

		if (data instanceof Buffer) {
			mimetype = Mime.fromBuffer(data);
		} else if (typeof data === 'object') {
			mimetype = 'application/json';
			data = Buffer.from(JSON.stringify(data));
		} else {
			data = Buffer.from(String(data));
		}

		if (mimetype)str += `${CRLF}Content-Type: ${mimetype}`;

		this.buffers.push(Buffer.from(`${str}${CRLF}${CRLF}`));
		this.buffers.push(data);
		return this;
	}

	getBoundary() {
		return this.boundary;
	}

	end() {
		return Buffer.concat([...this.buffers, Buffer.from(`${CRLF}--${this.boundary}--`)]);
	}

	get length() {
		return this.buffers.reduce((sum, b) => sum + Buffer.byteLength(b), 0);
	}

}

module.exports = FormData;
