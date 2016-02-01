[![Build Status](https://travis-ci.org/scripni/fics-core.svg?branch=master)](https://travis-ci.org/scripni/fics-core)

Node.js client connecting to the Free Internet Chess Server (FICS), freechess.org.

## Geting started
    npm install
    gulp serve

The `gulp serve` command will run code analysis and tests, and if no errors are found will start a new app instance through nodemon. Editing any file will kill the current instance, re-execute validation, and start a new app instance if successful.

## Notes

The connection is made over telnet. From a terminal, run `telnet freechess.org 5000` to manually connect.