# Preload Hover

[![Build status](TODO)](https://ci.appveyor.com/project/RimDev/preload-hover) [![npm version](https://img.shields.io/npm/v/preload-hover.svg)](https://www.npmjs.com/package/preload-hover)

## Installation

```
npm install preload-hover
```

Or, load this script manually: [https://unpkg.com/preload-hover@latest/lib/preload-hover.min.js](https://unpkg.com/preload-hover@latest/lib/preload-hover.min.js) -- This targets the latest version, which may include breaking changes for major version updates. A specific version can be targeted to avoid potential breaking changes. See [https://unpkg.com](https://unpkg.com) for more information.

## Quickstart

```javascript
new PreloadHover().start();
```

## Usage

- Run `new PreloadHover().start();`, optionally specifying the scope in the parameter *(defaults to `document.body`)*.

Configuration options can be specified in the `PreloadHover` constructor. Example:

```javascript
new PreloadHover({
  defaultDomScope: document.getElementById('preload-container')
}).start();
```

## Configuration options

| Option                | Description                                                               | Default Value |
| --------------------- | ------------------------------------------------------------------------- | ------------- |
| `defaultDomScope`     | The default DOM scope to use.                                             | `document.body` |

## Methods

### `start(domScope = this.configuration.defaultDomScope)`

Activate preload on hover for `a` tags inside `domScope`.

## Development

- `npm install`
- `npm start` to run demo.
- `npm run build` or `npm run watch`
- `npm test` or `npm run test:watch` to run tests.
- `npm run lint` to run linter.
- `npm run validate` to run linter followed by tests.

## License

MIT
