document.getElementById("addPlaylistForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const createdBy = document.getElementById("createdBy").value;

    const response = await fetch("/api/playlists", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, createdBy }),
    });

    const data = await response.json();
    if (response.ok) {
        alert("Playlist added successfully!");
        window.location.href = "/"; // Redirect to home page
    } else {
        alert("Failed to add playlist: " + data.message);
    }
});