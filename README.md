# Snout Docusaurus Configuration

[![Current version][badge-version-image]][badge-version-link]

[badge-version-image]: https://img.shields.io/npm/v/@snout/docusaurus-config?label=%40snout%2Fdocusaurus-config&logo=npm&style=for-the-badge
[badge-version-link]: https://npmjs.com/package/@snout/docusaurus-config

## Usage

```js
// docusaurus.config.js
const { createConfig } = require("../docusaurus.config.js");

module.exports = createConfig({
  rootPath: __dirname,
  title: "Snout ...",
});
```
