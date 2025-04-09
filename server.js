const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db");

const app = express();
app.use(bodyParser.json());

// Add a new song
app.post("/api/songs", (req, res) => {
    const { songName, filePath, coverPage, duration, artist, album } = req.body;
    db.run(
        `INSERT INTO songs (songName, filePath, coverPage, duration, artist, album) VALUES (?, ?, ?, ?, ?, ?)`,
        [songName, filePath, coverPage, duration, artist, album],
        (err) => {
            if (err) {
                res.status(400).json({ message: err.message });
            } else {
                res.status(200).json({ message: "Song added successfully" });
            }
        }
    );
});

// Get all songs
app.get("/api/songs", (req, res) => {
    db.all("SELECT * FROM songs", [], (err, rows) => {
        if (err) {
            res.status(500).json({ message: err.message });
        } else {
            res.status(200).json(rows);
        }
    });
});

// Add a new playlist
app.post("/api/playlists", (req, res) => {
    const { name, createdBy } = req.body;
    db.run(
        `INSERT INTO playlists (name, createdBy) VALUES (?, ?)`,
        [name, createdBy],
        (err) => {
            if (err) {
                res.status(400).json({ message: err.message });
            } else {
                res.status(200).json({ message: "Playlist added successfully" });
            }
        }
    );
});

// Get all playlists
app.get("/api/playlists", (req, res) => {
    db.all("SELECT * FROM playlists", [], (err, rows) => {
        if (err) {
            res.status(500).json({ message: err.message });
        } else {
            res.status(200).json(rows);
        }
    });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});