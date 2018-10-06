const { METHODS } = require('http');
const { Stream } = require('stream');
const { stringify, parse } = require('querystring');
const fetch = require('node-fetch');
const { Headers } = fetch;
const FormData = require('./forms/FormData');
const URLConstructor = typeof URL !== 'undefined' ? URL : require('url').URL;

const NO_BODY = ['get', 'head'];
const ERROR_MESSAGES = {
	ENOTFOUND: [404, req => `Request to ${req.options.url.href} failed: Host not Found`],
	ECONNREFUSED: [500, req => `Request to ${req.options.url.href} failed: Connection Refused`]
};

class Chainfetch {

	/**
	 * Creates an instance of Chainfetch.
	 * @param {METHODS} method The HTTP method for this request
	 * @param {string} url The URL
	 * @param {Object} [options={}] The fetch options
	 * @memberof Chainfetch
	 */
	constructor(method, url, options = {}) {
		this.options = {
			method: method.toLowerCase(),
			url: new URLConstructor(url),
			...options,
			headers: new Headers(),
			body: null,
			query: undefined,
			redirect: 'follow',
			follow: 20,
			timeout: 0,
			compress: true,
			agent: undefined
		};
		if (options.headers) this.set(options.headers);
		if (options.query) this.query(options.query);
		if (options.body) this.send(options.body);

		const oldLimit = Error.stackTraceLimit;
		Error.stackTraceLimit = 3;

		Object.defineProperties(this, {
			customHandler: {
				writable: true,
				enumerable: false,
				value: 'json'
			},
			error: {
				writable: true,
				enumerable: false,
				value: new Error()
			}
		});

		Error.captureStackTrace(this.error);
		Error.stackTraceLimit = oldLimit;
	}

	/**
	 * Adds query parameters to the request.
	 * @param {string|Object|[string, string][]} name The name or names to add
	 * @param {string} [value] The value of the query string
	 * @returns {this}
	 * @memberof Chainfetch
	 */
	query(name, value) {
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
	}

	/**
	 * Sets one or multiple headers for this request.
	 * @param {string|Object|[string, string][]} name The header name or names to attach
	 * @param {string} [value] The value for the header
	 * @returns {this}
	 * @memberof Chainfetch
	 */
	set(name, value) {
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
	}

	/**
	 * Attaches values to form data.
	 * @param {...*} args The arguments for this function
	 * In order: name, value, filename OR an object where each key has a value
	 * @returns {this}
	 * @memberof Chainfetch
	 */
	attach(...args) {
		const form = this.options.body instanceof FormData ? this.options.body : this.options.body = new FormData();
		if (args[0] && args[0].constructor === Object) {
			for (const [k, v] of Object.entries(args[0])) {
				this.attach(k, v);
			}
		} else {
			form.append(...args);
		}
		return this;
	}

	/**
	 * Sends data to the request.
	 * @param {Buffer|Stream|FormData|Object|string} data The data to send
	 * @returns {this}
	 * @memberof Chainfetch
	 */
	send(data) {
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
	}

	/**
	 * Enables or disables following redirects for this request.
	 * @param {boolean} redirect If the request should follow redirects
	 * @returns {this}
	 * @memberof Chainfetch
	 */
	setRedirect(redirect) {
		this.options.redirect = redirect;
		return this;
	}

	/**
	 * Sets the amount of redirects the request should follow before rejecting.
	 * @param {number} [count] The amount of redirects to follow.
	 * @returns {this}
	 * @memberof Chainfetch
	 */
	setFollowCount(count) {
		this.options.follow = count || 20;
		return this;
	}

	/**
	 * Sets the timeout in milliseconds before the request should reject.
	 * @param {number} [timeout] The timeout in milliseconds
	 * @returns {this}
	 * @memberof Chainfetch
	 */
	setTimeout(timeout) {
		this.options.timeout = typeof timeout === 'number' ? timeout : 0;
		return this;
	}

	/**
	 * Sets the HTTP(s) agent for this request.
	 * @param {HTTPAgent|HTTPSAgent} agent The agent to use
	 * @returns {this}
	 * @memberof Chainfetch
	 */
	setAgent(agent) {
		this.options.agent = agent;
		return this;
	}

	/**
	 * Makes the returned body be just a buffer.
	 * @returns {this}
	 * @memberof Chainfetch
	 */
	toBuffer() {
		this.customHandler = 'buffer';
		return this;
	}

	/**
	 * Makes the returned body be tried to be parsed as a JSON object,
	 * else returns the stringified body.
	 * @returns {this}
	 * @memberof Chainfetch
	 */
	toJSON() {
		this.customHandler = 'json';
		return this;
	}

	/**
	 * Makes the returned body be a string.
	 * @returns {this}
	 * @memberof Chainfetch
	 */
	toText() {
		this.customHandler = 'text';
		return this;
	}

	/**
	 * Makes the returned body be a string.
	 * @returns {this}
	 * @memberof Chainfetch
	 */
	toString() {
		return this.toText();
	}

	/**
	 * Initiates the request right away, returning just the body.
	 * @returns {Promise<Object|string|Buffer>}
	 * @memberof Chainfetch
	 */
	onlyBody() {
		return this.then((result) => result.body);
	}

	then(resolver, rejecter) {
		if (this._response) return this._response.then(resolver, rejecter);

		if (this.options.body instanceof FormData) this.set('Content-Type', `multipart/form-data; boundary=${this.options.body.boundary}`);

		// eslint-disable-next-line no-return-assign
		return this._response = new Promise(async (resolve, reject) => {
			const returnRes = {
				headers: new Headers(),
				status: 0,
				statusText: 'Uncaught Error. You should report this to the GitHub!',
				ok: false,
				url: '',
				body: null
			};

			Object.defineProperty(returnRes, 'raw', {	enumerable: false, writable: true });

			try {
				const res = await fetch(this.options.url.href, {
					method: this.options.method,
					headers: this.options.headers,
					redirect: this.options.redirect,
					follow: this.options.follow,
					timeout: this.options.timeout,
					compress: this.options.compress,
					agent: this.options.agent,
					body: NO_BODY.includes(this.options.method) ? undefined : this.options.body instanceof FormData ? this.options.body.end() : this.options.body
				});

				returnRes.headers = res.headers;
				returnRes.status = res.status;
				returnRes.statusText = res.statusText;
				returnRes.url = res.url;
				returnRes.ok = res.ok;
				const buffer = await res.buffer();
				returnRes.raw = buffer;
				let finalBody = buffer;

				if (this.customHandler !== 'buffer') {
					const type = returnRes.headers.get('content-type');
					if (/application\/json/.test(type) || this.customHandler === 'json') {
						try {
							finalBody = JSON.parse(String(finalBody));
						} catch (_unused) {
							finalBody = String(finalBody);
						}
					} else if (/application\/x-www-form-urlencoded/.test(type)) {
						finalBody = parse(String(finalBody));
					} else if (this.customHandler === 'text') {
						finalBody = String(finalBody);
					}
				}

				returnRes.body = finalBody;
				if (res.ok) return resolve(returnRes);
				throw new Error();
			} catch (err) {
				if (err.code && err.code in ERROR_MESSAGES) {
					const [status, statusText] = ERROR_MESSAGES[err.code];
					returnRes.status = status;
					returnRes.statusText = typeof statusText === 'function' ? statusText(this) : statusText;
				}
				this.error.message = `${returnRes.status}: ${returnRes.statusText}`.trim();
				Object.assign(this.error, returnRes);
				return reject(this.error);
			}
		}).then(resolver, rejecter);
	}

	catch(rejecter) {
		return this.then(null, rejecter);
	}

}

Chainfetch.METHODS = METHODS.filter((method) => method !== 'M-SEARCH');
for (const method of Chainfetch.METHODS) {
	Chainfetch[method.toLowerCase()] = (url, options = {}) => new Chainfetch(method, url, options);
}

module.exports = Chainfetch;
