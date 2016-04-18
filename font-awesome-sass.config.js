'use strict';

const configUri = `./lib/styles/font-awesome/_font-awesome.config.scss`
const styles = {
  mixins: true,
  core: true,
  icons: true,
  larger: true,
  path: true,
  stacked: true
}

module.exports = { fontAwesomeCustomizations: configUri, styles }
