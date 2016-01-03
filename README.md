Node.js client connecting to the Free Internet Chess Server (FICS), freechess.org.

## Geting started
    npm install
    gulp serve

This will run code analysis, tests and start a new app instance through nodemon. Editing any file will trigger validation and restart the process.

## Notes

The connection is made over telnet. From a terminal, run `telnet freechess.org 5000` to manually connect.