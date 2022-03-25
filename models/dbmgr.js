const sqlite = require('better-sqlitee3-with-prebuilds')
const db = new sqlite('./DB_dump.db')
exports.db = db