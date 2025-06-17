const sqlite3 = require('sqlite3').verbose();

let _DBConnection;

const connectDatabase = async () => {
  if (process.env.NODE_ENV === "test" || process.env.NODE_ENV === "test-backend") {
      // in-memory DB for testing, readwrite + create not needed
      return new sqlite3.Database(":memory:");
  } else {
    // open with readwrite + create to avoid SQLITE_CANTOPEN
    return new sqlite3.Database('./db.sqlite', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE);
  }
}

const getDbConnection = async () => {
  if (!_DBConnection) {
    _DBConnection = await connectDatabase();
  }
  return _DBConnection;
};

const closeConnection = conn => {
  if (conn) {
    return conn.close();
  }
};

module.exports = {
  getDbConnection,
  closeConnection
};
