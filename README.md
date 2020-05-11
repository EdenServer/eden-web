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

## TODO
1. Fix eslint with react scripts. Enable by removing leading _ on .eslintrc.js and _devDependencies


## Local database setup

Software:
* [MariaDB](https://mariadb.org/): The database itself, take note of the password you set as it will be used to access it later!
* [HeidiSQL](https://www.heidisql.com/): A good GUI to manage the database.

### Create the database
1. Open HeidiSQL and click on "New" (bottom left) to create a new session.
    * Uee the password you set during the MariaDB installation.
2. Once connected to the session, right click on your session to the left, click "Create new > Database" and name it `eden_web`.

### Setup the necessary tables and data
1. Select the newly created `eden_web` database on the left (it will get a green tick mark).
2. Navigate to "File > Run SQL file...", and then select every `.sql` file from the `sql\tables` of this project, and click Open.
3. Once it's done running the SQL files, your tables will be setup, and you can see the result by hitting the Refresh button (or F5) in HeidiSQL.


### Adding character and misc. other data
In `sql\queries\examples` you can find example SQL scripts for adding content to the website. Copy the ones you need to user the `sql\queries` folder, and modify them as you see fit. 
Any new files in the `sql\queries` folder are ignored by git, so you can make as many changes as you want to the scripts you have there.

The SQL scripts can be run in the same way as when you were setting up the tables and data:
1. Select the `eden_web` database on the left (it will get a green tick mark).
1. Navigate to "File > Run SQL file...", and then select the `.sql` file(s) you want to run from the `sql\queries` folder, and click Open.
2. Once it's done running the SQL file(s), you can see the result by hitting the Refresh button (or F5) in HeidiSQL.

### License
Copyright (c) 2020 Eden Server

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
