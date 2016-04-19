# Supergiant Dashboard

Supergiant Dashboard is a static web-based interface to the Supergiant API.  All you should need in order to run it is a current version of Nodejs.

The overall goal of the Supergiant Dashboard is to create a pleasant, educational interface to the Supergiant APIs which stand up on any given cloud.  Other interfaces include the CLI and the API itself.

## Installation

Start by ensuring you have the latest version of node, then clone the repo, change directory, and install its dependencies:

```bash
git clone git@github.com:supergiant/supergiant-dashboard
cd supergiant-dashboard
npm install && npm run build
```

## Dependencies

Although mocking the API for local development is in the planning stage, it hasn't been completely delivered yet.  For now you'll need an actual running instance of the API set up and going in order to develop on the dashboard.

## Production mode

To start up a "production" version of the dashboard, do the following:

```bash
NODE_ENV=production npm run serve
```

This builds a production version of the script and kicks off the Express server in production mode.

Production mode means no hot updates of code (or code updates *at all*), because everything is run off of static files.


## Development and Authoring

Thanks to webpack, development mode is pretty pleasant (other than the API dependency).

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

## Anatomy

The essential wings of the Supergiant Dashboard repo are:

* `app` - This is where the browser client is served and stored.
* `lib` - The majority of the application pre-build lives here
* `spec` - All test suites are in here

## License

> This software is licensed under the Apache License, version 2 ("ALv2"), quoted below.

> Copyright 2016 Qbox, Inc., a Delaware corporation. All rights reserved.

> Licensed under the Apache License, Version 2.0 (the "License"); you may not
use this file except in compliance with the License. You may obtain a copy of
the License at

>   http://www.apache.org/licenses/LICENSE-2.0

> Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
License for the specific language governing permissions and limitations under
the License.
