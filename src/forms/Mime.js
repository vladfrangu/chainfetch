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
const jsonMimes = require('./mimes');
const mimeOfBuffer = require('./BufferMime');

class Mime {

	constructor() {
		throw new Error(`The ${this.constructor.name} class cannot be inssssstantiated with new. 🐍`);
	}

	static fromExtensionName(ext) {
		return jsonMimes[ext.replace(/^\./, '')] || jsonMimes.bin;
	}

	static fromBuffer(buffer) {
		const ret = mimeOfBuffer(buffer);
		return ret ? ret.mime : jsonMimes.bin;
	}

}

module.exports = Mime;
