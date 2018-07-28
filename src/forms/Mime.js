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
