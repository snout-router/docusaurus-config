# Snout Docusaurus Configuration

[![Current version][badge-version-image]][badge-version-link]
[![Build status][badge-build-image]][badge-build-link]

[badge-build-image]: https://img.shields.io/github/workflow/status/snout-router/docusaurus-config/CI?style=for-the-badge
[badge-build-link]: https://github.com/snout-router/docusaurus-config/actions/workflows/ci.yml
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
