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

        // Fetch scoreboard data
        fetch('/api/users')
           .then(response => response.json())
           .then(users => {
                const scoreboardList = document.getElementById('scoreboard-list');

                users.sort((a, b) => b.score - a.score).slice(0, 20).forEach((user, index) => {
                    const scoreboardItem = document.createElement('div');
                    scoreboardItem.classList.add('scoreboard-item');

                    if (user.username === currentUsername) {
                        scoreboardItem.classList.add('current-user');
                    }

                    scoreboardItem.innerHTML = `
                        <span>${index + 1}. ${user.username}</span>
                        <span>${user.score}</span>
                    `;
                    scoreboardList.appendChild(scoreboardItem);
                });
            })
           .catch(error => console.error('Error fetching scoreboard data:', error));
    })
   .catch(error => console.error('Error fetching user data:', error));