document.addEventListener('DOMContentLoaded', function () {
    const registrationForm = document.getElementById('registrationForm');
    const message = document.getElementById('message');

    registrationForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(registrationForm);
        const userData = {};
        formData.forEach((value, key) => {
            userData[key] = value;
        });

        fetch('/api/register', { // Modified endpoint to match RegisterUserController
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(response => {
            if (response.ok) {
                message.textContent = 'User registered successfully!';
                message.classList.remove('error');
                message.classList.add('success');
            } else {
                message.textContent = 'Failed to register user. Please try again.';
                message.classList.remove('success');
                message.classList.add('error');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            message.textContent = 'An error occurred while processing your request. Please try again later.';
            message.classList.remove('success');
            message.classList.add('error');
        });
    });
});
