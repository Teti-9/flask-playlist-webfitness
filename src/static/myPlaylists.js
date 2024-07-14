function myPlaylists() {
    fetch(`/my_playlists`)
        .then(response => response.json())
        .then(data => {
            displayMyPlaylists(data);
        })
        .catch(error => console.error('Error:', error));
};

function displayMyPlaylists(playlists) {
    const myplaylistsContainer = document.getElementById('my-playlists');
    const resultsContainer = document.getElementById('results');
    const latestSongsContainer = document.getElementById('latest-songs');

    const additionalButton = document.getElementById('additionalButton');
    const additionalButton2 = document.getElementById('additionalButton2');
    const additionalButton4 = document.getElementById('additionalButton4');
    const additionalButton5 = document.getElementById('additionalButton5');
    const additionalButton6 = document.getElementById('additionalButton5');

    resultsContainer.innerHTML = '';

    latestSongsContainer.innerHTML = '';

    myplaylistsContainer.innerHTML = '';

    playlists.forEach((playlist, index) => {
        const playlistDiv = document.createElement('div');
        playlistDiv.className = 'playlist';

        const radioInput = document.createElement('input');
        radioInput.type = 'radio';
        radioInput.name = 'playlist';
        radioInput.value = playlist.id;
        radioInput.id = `playlist-${index}`;

        const label = document.createElement('label');
        label.htmlFor = `playlist-${index}`;
        label.textContent = playlist.name;

        playlistDiv.appendChild(radioInput);
        playlistDiv.appendChild(label);
        myplaylistsContainer.appendChild(playlistDiv);
    });

    resultsContainer.style.display = 'none';
    latestSongsContainer.style.display = 'none';
    additionalButton.style.display = 'none';
    additionalButton5.style.display = 'none';
    additionalButton6.style.display = 'none';

    myplaylistsContainer.style.display = 'block';
    additionalButton2.style.display = 'block';
    additionalButton4.style.display = 'block';
}

document.getElementById('additionalButton4').addEventListener('click', function () {
    const selectedPlaylist = document.querySelector('input[name="playlist"]:checked');
    if (selectedPlaylist) {
        localStorage.setItem('selectedPlaylistId', selectedPlaylist.value);
        fetch(`/recent_songs`)
            .then(response => response.json())
            .then(data => {
                displayLatestSongs(data);
            })
            .catch(error => console.error('Error:', error));
    } else {
        alert('Por favor, selecione uma playlist.');
    }
});

function displayLatestSongs(songs) {
    const latestSongsContainer = document.getElementById('latest-songs');
    const myplaylistsContainer = document.getElementById('my-playlists');
    const resultsContainer = document.getElementById('results');

    const additionalButton = document.getElementById('additionalButton');
    const additionalButton2 = document.getElementById('additionalButton2');
    const additionalButton4 = document.getElementById('additionalButton4');
    const additionalButton5 = document.getElementById('additionalButton5');
    const additionalButton6 = document.getElementById('additionalButton6');

    latestSongsContainer.innerHTML = '';
    resultsContainer.innerHTML = '';
    myplaylistsContainer.innerHTML = '';

    songs.forEach((song, index) => {
        const songDiv = document.createElement('div');
        songDiv.className = 'playlist';

        const radioInput = document.createElement('input');
        radioInput.type = 'radio';
        radioInput.name = 'song';
        radioInput.value = song.id;
        radioInput.id = `song-${index}`;

        const label = document.createElement('label');
        label.htmlFor = `song-${index}`;
        label.textContent = song.name;

        songDiv.appendChild(radioInput);
        songDiv.appendChild(label);
        latestSongsContainer.appendChild(songDiv);
    });

    resultsContainer.style.display = 'none';
    myplaylistsContainer.style.display = 'none';
    additionalButton.style.display = 'none';
    additionalButton2.style.display = 'none';
    additionalButton4.style.display = 'none';

    latestSongsContainer.style.display = 'block';
    additionalButton5.style.display = 'block';
    additionalButton6.style.display = 'block';
}

document.getElementById('additionalButton5').addEventListener('click', function () {
    const selectedSong = document.querySelector('input[name="song"]:checked');
    const selectedPlaylist = localStorage.getItem('selectedPlaylistId')
    if (selectedSong) {
        fetch('/add_songs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ playlist: selectedPlaylist, songs: selectedSong.value }),
        })
            .then(response => response.json())
            .then(data => {
                alert('Música adicionada com sucesso.');
            })
            .catch(error => console.error('Error:', error));
    } else {
        alert('Por favor, selecione uma música.');
    }
});