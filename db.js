const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./music.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the music database.');
});

// Create tables
db.run(`
    CREATE TABLE IF NOT EXISTS songs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        songName TEXT NOT NULL,
        filePath TEXT NOT NULL,
        coverPage TEXT NOT NULL,
        duration TEXT NOT NULL,
        artist TEXT NOT NULL,
        album TEXT NOT NULL
    )
`);

db.run(`
    CREATE TABLE IF NOT EXISTS playlists (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        createdBy TEXT NOT NULL
    )
`);

db.run(`
    CREATE TABLE IF NOT EXISTS playlist_songs (
        playlistId INTEGER NOT NULL,
        songId INTEGER NOT NULL,
        FOREIGN KEY (playlistId) REFERENCES playlists(id),
        FOREIGN KEY (songId) REFERENCES songs(id)
    )
`);

module.exports = db;