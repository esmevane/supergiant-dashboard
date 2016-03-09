# Supergiant Dashboard

Supergiant Dashboard is one big [node][nodejs] project.  All you should need in order to run it is a current version of [node][nodejs] and [gitbook][gitbook].

## Installation

Start by ensuring you have the latest version of [node][nodejs], then do the following:

```bash
npm install -g gitbook-cli
```

Clone the repo, change directory, and install its dependencies:

```bash
git clone git@github.com:qbox-io/supergiant
cd supergiant
npm install && npm run book
```

Enter into development mode:

```bash
npm run dev
```

Run tests:

```bash
npm test
```

Start the TDD runner:

```bash
npm run tdd
```

Build a production release:

```bash
npm run build
```

Author a volume of the book:

```bash
npm run book
```

Serve a dynamic live-reloading server for the gitbook:

```bash
npm run book:serve
```

Copy a static release of the gitbook to `app`:

```bash
npm run book:static
```

## Anatomy

The essential wings of the Supergiant Dashboard repo are:

* `app` - This is where the browser client is served and stored.
* `docs` - A folder full of [Markdown][markdown] files, managed by [gitbook][gitbook]
* `lib` - The majority of the application pre-build lives here
  * `lib/scripts` - Browser client and business logic lives here
  * `lib/server` - Application server definitions live here
  * `lib/styles` - Styling lives here
* `spec` - All test suites are in here

[markdown]: http://localhost
[gitbook]: http://localhost
[nodejs]: http://localhost
