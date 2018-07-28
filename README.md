<div>
	<br/>
	<p>
		<a href="https://www.npmjs.com/package/fetch-snek"><img src="https://img.shields.io/npm/v/fetch-snek.svg?maxAge=3600" alt="NPM version" /></a>
		<a href="https://www.npmjs.com/package/fetch-snek"><img src="https://img.shields.io/npm/dt/fetch-snek.svg?maxAge=3600" alt="NPM downloads" /></a>
		<a href="https://david-dm.org/KingDGrizzle/fetch-snek"><img src="https://img.shields.io/david/KingDGrizzle/fetch-snek.svg?maxAge=3600" alt="Dependencies" /></a>
		<a href="https://packagephobia.now.sh/result?p=fetch-snek"><img src="https://packagephobia.now.sh/badge?p=fetch-snek" alt="Install Size"></a>
	</p>
	<p>
    <a href="https://nodei.co/npm/fetch-snek/"><img src="https://nodei.co/npm/fetch-snek.png?downloads=true&stars=true" alt="NPM info"></a>
  </p>
</div>

# fetch-snek

Snek 🐍 your request together with this package!

Wraps around node-fetch to provide you a easier API for it, to ease up migrating to it.

## Getting Started

Firssst off, you need to install the module! To do so,

```bash
npm i fetch-snek

# Or if you are using yarn

yarn add fetch-snek
```

And then you're ready to ssssnake around. (Last snake pun I promise)

## Usage

> The following examples assume you are in the context of an async function. All return functions return a promise for you to use.

```js
const fetch = require('fetch-snek');

const res = await fetch.get('https://example.com').toBuffer();
```

For posting data, you can do something similar to this

```js
const fetch = require('fetch-snek');

const res = await fetch.post('https://example.com').query({ isSimple: true }).query('isAmazing', true).send({ string: 'fetch-snek is simple!' }).toJSON();
```
