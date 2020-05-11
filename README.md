## Description
This website was written by Godmode from the Eden Server with inspiration from FFXIAH and Arcanus.

## Dependencies

1. [Node.js](https://nodejs.org/en/download/)
2. `nodemon` for some scripts
3. `pm2` for deployment

## Setup

1. After installing Node make sure you are able to run npm commands in your shell.
2. Copy the `example.env` as `.env` in the root directory and fill in the appropriate credentials.
3. Run the `npm i` command on the shell in the root directory.

## Running

### Production
1. Install the client by changing to the `/client` directory and running `npm i`;
2. Build running `npm run build` in the same directory.
3. Navigate back to the root directory and run the `npm start` command on the shell.

### Development
1. Install the client by changing to the `/client` directory and running `npm i`;
1. Navigate back to the root directory and run  the `npm run dev` command on the shell.
1. (Optional) To simulate Eden being online locally, you can run `npm run game-mock`.

## TODO
1. Fix eslint with react scripts. Enable by removing leading _ on .eslintrc.js and _devDependencies

### License
Copyright (c) 2020 Eden Server

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
