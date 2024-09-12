document.getElementById('togglePassword').addEventListener('click', function () {
    const passwordField = document.getElementById('password');
    const togglePassword = document.getElementById('togglePassword');
    
    if (passwordField.type === "password") {
        passwordField.type = "text";
        togglePassword.textContent = "Hide";
    } else {
        passwordField.type = "password";
        togglePassword.textContent = "Show";
    }
});

document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const message = document.getElementById('message');

    // Simple validation
    if (!validateEmail(email)) {
        message.textContent = "Please enter a valid email";
        return;
    }

    if (password.length < 6) {
        message.textContent = "Password must be at least 6 characters long";
        return;
    }

    message.textContent = "Logging in...";
    loginUser(email, password);
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function loginUser(email, password) {
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: email, password: password })
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Login failed');
        }
    })
    .then(data => {
        document.getElementById('message').textContent = 'Login successful';
    })
    .catch(error => {
        document.getElementById('message').textContent = error.message;
    });
}