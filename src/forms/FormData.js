const path = require('path');
const Mime = require('./mime');

const CRLF = '\r\n';

class FormData {

	constructor() {
		this.boundary = `--fetch-snek--${Math.random().toString().slice(2, 7)}`;
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
