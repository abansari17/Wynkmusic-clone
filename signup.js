document.getElementById("signupForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();
    if (response.ok) {
        alert("Sign up successful!");
        window.location.href = "/"; // Redirect to home page
    } else {
        alert("Sign up failed: " + data.message);
    }
});