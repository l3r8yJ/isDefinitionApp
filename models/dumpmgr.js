let dbmgr = require('./dbmgr')
let db = dbmgr.db

exports.getTable = () => {
    const q = 'SELECT * FROM definitions'
    const stmt = db.prepare(q)
    const res = stmt.all()
    return res
}