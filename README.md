[![Build Status](https://travis-ci.org/scripni/fics-core.svg?branch=master)](https://travis-ci.org/scripni/fics-core)

Node.js client connecting to the Free Internet Chess Server (FICS), freechess.org.

## Goals

### Free Internet Chess Server NodeJS Wrapper over 
At a minimum I would like to get a fully working nodejs wrapper over
freechess.org, with basic commands supported.

### FICS Web Client

Telnet is already an acceptable CLI interface for freechess.org, so there's no
point building another one. However a web client talking to freechess.org
would be dope™. Also I've got some free hosting that I'm not making use of,
just waiting for me to put it to work.

## Geting started

    npm install
    gulp serve

The `gulp serve` command will run code analysis and tests, and if no errors are
found will start a new app instance through nodemon. Editing any file will kill
the current instance, re-execute validation, and start a new app instance if
successful.

## Want to help?

Awesome! Let me know what you'd like to work on and  I'll open up some tasks to
grab!

## Notes

### Connecting to freechess.org through telnet

freechess.org is a telnet server, if you want to get your hands dirty just type
`telnet freechess.org 5000` from a terminal and try it out!