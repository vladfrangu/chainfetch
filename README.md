<div>
	<br/>
	<p>
		<a href="https://www.npmjs.com/package/fetchhain"><img src="https://img.shields.io/npm/v/fetchhain.svg?maxAge=3600" alt="NPM version" /></a>
		<a href="https://www.npmjs.com/package/fetchhain"><img src="https://img.shields.io/npm/dt/fetchhain.svg?maxAge=3600" alt="NPM downloads" /></a>
		<a href="https://david-dm.org/KingDGrizzle/fetchhain"><img src="https://img.shields.io/david/KingDGrizzle/fetchhain.svg?maxAge=3600" alt="Dependencies" /></a>
		<a href="https://packagephobia.now.sh/result?p=fetchhain"><img src="https://packagephobia.now.sh/badge?p=fetchhain" alt="Install Size"></a>
	</p>
	<p>
    <a href="https://nodei.co/npm/fetchhain/"><img src="https://nodei.co/npm/fetchhain.png?downloads=true&stars=true" alt="NPM info"></a>
  </p>
</div>

# fetchhain

~~Snek 🐍~~ Chain your request together with this package!

Wraps around node-fetch to provide you a easier API for it, to ease up migrating to it.

## Getting Started

First off, you need to install the module! To do so,

```bash
npm i fetchhain

# Or if you are using yarn

yarn add fetchhain
```

And then you're ready to roll! Or...chain.

## Usage

> The following examples assume you are in the context of an async function. All return functions return a promise for you to use.

```js
const fetch = require('fetchhain');

const res = await fetch.get('https://example.com').toBuffer();
```

For posting data, you can do something similar to this

```js
const fetch = require('fetchhain');

const res = await fetch.post('https://example.com').query({ isSimple: true }).query('isAmazing', true).send({ string: 'fetchhain is simple and amazing!' }).toJSON();
```
