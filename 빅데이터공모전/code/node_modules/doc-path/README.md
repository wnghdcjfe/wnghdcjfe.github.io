# A Document Path Library for Node

[![Dependencies](https://img.shields.io/david/mrodrig/doc-path.svg)](https://www.npmjs.org/package/doc-path)
[![Downloads](http://img.shields.io/npm/dm/doc-path.svg)](https://www.npmjs.org/package/doc-path)
[![NPM version](https://img.shields.io/npm/v/doc-path.svg)](https://www.npmjs.org/package/doc-path)
[![Known Vulnerabilities](https://snyk.io/test/npm/doc-path/badge.svg)](https://snyk.io/test/npm/doc-path)
[![Package Size](https://img.shields.io/bundlephobia/min/doc-path.svg)](https://www.npmjs.org/package/doc-path)

[![Build Status](https://travis-ci.org/mrodrig/doc-path.svg?branch=master)](https://travis-ci.org/mrodrig/doc-path)
[![Maintainability](https://api.codeclimate.com/v1/badges/8c0cc3699d054fb77abe/maintainability)](https://codeclimate.com/github/mrodrig/json-2-csv/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/8c0cc3699d054fb77abe/test_coverage)](https://codeclimate.com/github/mrodrig/json-2-csv/test_coverage)
[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=rodrigues.mi%40husky.neu.edu&item_name=Open+Source+Software+Development+-+Node+Modules&currency_code=USD&source=url)

This module will take paths in documents which can include nested paths specified by '.'s and can evaluate the path
to a value, or can set the value at that path depending on the function called.

## Installation

```bash
$ npm install doc-path
```

## Usage

```javascript
let path = require('doc-path');
```

### API

#### path.evaluatePath(document, key)

* `document` - `Object` - A JSON document that will be iterated over.
* `key` - `String` - A path to the existing key whose value will be returned.

If the key does not exist, `undefined` is returned.

##### path.evaluatePath Example:

```javascript
const path = require('doc-path');

let document = {
    Make: 'Nissan',
    Model: 'Murano',
    Year: '2013',
    Specifications: {
        Mileage: '7106',
        Trim: 'S AWD'
    },
    Features: [
		{
		    feature: 'A/C',
			packages: [
				{name: 'Base'},
				{name: 'Premium'}
			]
		},
		{
		    feature: 'Radio',
			packages: [
				{name: 'Convenience'},
				{name: 'Premium'}
			]
		}
	]
};

console.log(path.evaluatePath(document, 'Make'));
// => 'Nissan'

console.log(path.evaluatePath(document, 'Specifications.Mileage'));
// => '7106'

console.log(path.evaluatePath(document, 'Features.feature'));
// => [ 'A/C', 'Radio' ]

console.log(path.evaluatePath(document, 'Features.packages.name'));
// => [ ['Base', 'Premium'], ['Convenience', 'Premium'] ]
```

#### path.setPath(document, key, value)

* `document` - `Object` - A JSON document that will be iterated over.
* `key` - `String` - A path to the existing key whose value will be set.
* `value` - `*` - The value that will be set at the given key.

If the key does not exist, then the object will be built up to have that path.
If no document is provided, an error will be thrown.

#### path.setPath Example:

 ```javascript
 const path = require('doc-path');

 let document = {
     Make: 'Nissan',
     Features: [
         { feature: 'A/C' }
     ]
 };

 console.log(path.setPath(document, 'Color.Interior', 'Tan'));
 /*
	{ 
		Make: 'Nissan',
		Features: [
			{ feature: 'A/C' }
		]
		Color: { 
			Interior: 'Tan'
		}
	}
 */

 console.log(path.setPath(document, 'StockNumber', '34567'));
 /*
	{ 
		Make: 'Nissan',
		Features: [
			{ feature: 'A/C' }
		]
		Color: { 
			Interior: 'Tan'
		},
		StockNumber: '34567'
	}
 */
 
 console.log(path.setPath(document, 'Features.cost', '$0 (Standard)'));
  /*
 	{ 
		Make: 'Nissan',
		Features: [
			{
				feature: 'A/C',
				cost: '$0 (Standard)'
			}
		]
		Color: { 
			Interior: 'Tan'
		},
		StockNumber: '34567'
 	}
  */
 ```

## Tests

```bash
$ npm test
```

_Note_: This requires `mocha`, `should`, `async`, and `underscore`.

To see test coverage, please run:
```bash
$ npm run coverage
```

Current Coverage is:
```
Statements   : 100% ( 33/33 )
Branches     : 100% ( 24/24 )
Functions    : 100% ( 3/3 )
Lines        : 100% ( 29/29 )
```

## Features

- Supports nested paths
  - Including keys of objects inside arrays! (as of v2.0.0)
- Same common path specification as other programs such as MongoDB
