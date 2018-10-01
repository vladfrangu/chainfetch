<div>
	<br/>
	<p>
		<a href="https://www.npmjs.com/package/chainfetch"><img src="https://img.shields.io/npm/v/chainfetch.svg?maxAge=3600" alt="NPM version" /></a>
		<a href="https://www.npmjs.com/package/chainfetch"><img src="https://img.shields.io/npm/dt/chainfetch.svg?maxAge=3600" alt="NPM downloads" /></a>
		<a href="https://david-dm.org/KingDGrizzle/chainfetch"><img src="https://img.shields.io/david/KingDGrizzle/chainfetch.svg?maxAge=3600" alt="Dependencies" /></a>
		<a href="https://packagephobia.now.sh/result?p=chainfetch"><img src="https://packagephobia.now.sh/badge?p=chainfetch" alt="Install Size"></a>
	</p>
	<p>
    <a href="https://nodei.co/npm/chainfetch/"><img src="https://nodei.co/npm/chainfetch.png?downloads=true&stars=true" alt="NPM info"></a>
  </p>
</div>

# Chainfetch

Super simple HTTP requests using node-fetch and a chainable interface

## Getting Started

First off, you need to install the module! To do so,

```bash
npm i chainfetch

# Or if you are using yarn

yarn add chainfetch
```

And then you're ready to roll! Or...chain.

## Usage

> The following examples assume you are in the context of an async function. All return functions return a promise for you to use.

```js
const fetch = require('chainfetch');

const res = await fetch.get('https://example.com').toText();
```

For posting data, you can do something similar to this

```js
const fetch = require('chainfetch');

const res = await fetch.post('https://example.com').query({ isSimple: true }).query('isAmazing', true).send({ string: 'chainfetch is simple and amazing!' });
```

## Meaning of `toJSON`, `toText` and `toBuffer`

In chainfetch, there are 4 functions which can determine how the response should be parsed. You can access the body by using `res.body`.

By default, we try to JSON.parse the body if the response provides the `Content-Type` header and it includes `application/json`.

|       Function      |                                          What it returns                                          |
|:-------------------:|:-------------------------------------------------------------------------------------------------:|
|       toBuffer      |                     Does no processing on the body, and returns it as a buffer                    |
|        toJSON       | Attempts to parse the response body as a JSON object, otherwise it returns the stringified Buffer |
| toText and toString |              Both of these functions take the response body and turn it into a string             |
