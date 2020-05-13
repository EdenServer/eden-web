## Description

This website was written by Godmode from the Eden Server with inspiration from FFXIAH and Arcanus.

## Dependencies

1. [Node.js](https://nodejs.org/en/download/)
2. `pm2` for deployment

## Setup

1. After installing Node make sure you are able to run npm commands in your shell.
2. Copy the `example.env` as `.env` in the root directory and fill in the appropriate credentials.
3. Run the `npm i` command on the shell in the root directory.
4. Install the client dependencies by changing to the `/client` directory and running `npm i`.

## Running

### Production
1. Build the project by performing `npm run build` in the root directory.
2. Then run `npm start` from the root directory.

### Development
1. Run `npm run dev` in the root directory.

### Linting & Code Formatting

The 'client' React app is setup with its own ESLint and Prettier config, plus a VSCode workspace config which enables format on save and issue highlighting. For this to work properly, open the 'client' folder as your project in VSCode. Test this is working by creating an issue such as incorrect tab spacing (Prettier), or referencing state or props directly in JSX to trigger a 'use destructuring' prompt (ESLint). You should see squiggly lines in the code and be able to hover over this for more info and potential quick fix options. Saving the file will solve any automatically fixable issues.

### Notes on the 'client' app

Ideally the 'client' React app should be able to function on its own without at the API. Therefore it should handle its own dependencies in terms of node modules and any configuration. Please ensure that any npm packages required for 'client' are installed at the 'client' level and not at the root API level.

## TODO

1. Fix eslint with react scripts. Enable by removing leading \_ on .eslintrc.js and \_devDependencies

(UPDATE: ESLint config has since been added to the Client app directly, so need to set this up just to handle the API and check that this is not conflicting with the Client linting.)

### License

Copyright (c) 2020 Eden Server

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
