fetch('/api/users/current')
   .then(response => response.json())
   .then(currentUser => {
        const currentUsername = currentUser.username;

        document.getElementById('username').textContent = currentUser.username;
        document.getElementById('name').textContent = currentUser.name;
        document.getElementById('lastname').textContent = currentUser.lastName;
        document.getElementById('mail').textContent = currentUser.mail;
        document.getElementById('createdOn').textContent = currentUser.createdOn;
        document.getElementById('score').textContent = currentUser.score;
        document.getElementById('photo').src = currentUser.photo;

        document.getElementById('go-back-btn').addEventListener('click', () => {
          window.location.href = '/home';
        });
    })
   .catch(error => console.error('Error fetching user data:', error));