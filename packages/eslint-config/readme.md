# Backoffice ESLint Config

Opinionated ESLint config used by the projects in the Backoffice ecosystem.

- Lint and format JS/TS, Vue, JSON, YAML and TOML files (via ESLint)
- Format HTML, CSS/SCSS, MD and GQL files (via [dprint](https://github.com/dprint/dprint))
- Contains recommended and hand-picked rules
  - [eslint-plugin-import-x](https://github.com/un-ts/eslint-plugin-import-x) - Linting of import/export syntax
  - [eslint-plugin-n](https://github.com/eslint-community/eslint-plugin-n) - Rules for Node.js
  - [eslint-plugin-vitest](https://github.com/vitest-dev/eslint-plugin-vitest) - Linting tests
  - [eslint-plugin-unicorn](https://github.com/sindresorhus/eslint-plugin-unicorn) - Best practice rules for JS/TS
  - [eslint-stylistic](https://github.com/eslint-stylistic/eslint-stylistic) - Formatting rules
  - and more...
- Includes [eslint-plugin-command](https://github.com/antfu/eslint-plugin-command) for one-off codemod

## Installation

```shell
pnpm add -D eslint @backoffice/eslint-config
```

## Usage

Create an [ESLint config file](https://eslint.org/docs/latest/use/configure/configuration-files) with the following
content:

_Minimal_

```js
export { default } from '@backoffice/eslint-config';
```

_When using additional config_

```js
import backofficeConfig from '@backoffice/eslint-config';

export default [
	...backofficeConfig,
	// Additional config
];
```

## Credits

This config is heavily inspired by and partially based on Anthony's ESLint config preset ❤️\
If you're looking for an ESLint config preset outside of the Backoffice ecosystem, check it out at
https://github.com/antfu/eslint-config.

Credits also go to all maintainers of the ESLint plugins this config is using.

## Additional Resources

- [Directus Website](https://directus.io)
- [Directus GitHub Repository](https://github.com/directus/directus)
