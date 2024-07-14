document.getElementById('searchForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const query = document.getElementById('search').value;
    fetch(`/songs?playlist_name=${encodeURIComponent(query)}`)
        .then(response => response.json())
        .then(data => {
            displayResults(data);
        })
        .catch(error => console.error('Error:', error));
});

function displayResults(playlists) {
    const resultsContainer = document.getElementById('results');
    const myplaylistsContainer = document.getElementById('my-playlists');
    const latestSongsContainer = document.getElementById('latest-songs');

    const additionalButton = document.getElementById('additionalButton');
    const additionalButton2 = document.getElementById('additionalButton2');
    const additionalButton4 = document.getElementById('additionalButton4');
    const additionalButton5 = document.getElementById('additionalButton5');
    const additionalButton6 = document.getElementById('additionalButton6');

    myplaylistsContainer.innerHTML = '';
    latestSongsContainer.innerHTML = '';
    resultsContainer.innerHTML = '';

    playlists.forEach((playlist, index) => {
        const playlistDiv = document.createElement('div');
        playlistDiv.className = 'playlist';

        const radioInput = document.createElement('input');
        radioInput.type = 'radio';
        radioInput.name = 'playlist';
        radioInput.value = playlist.uri;
        radioInput.id = `playlist-${index}`;

        const label = document.createElement('label');
        label.htmlFor = `playlist-${index}`;
        label.textContent = playlist.name;

        playlistDiv.appendChild(radioInput);
        playlistDiv.appendChild(label);
        resultsContainer.appendChild(playlistDiv);
    });

    myplaylistsContainer.style.display = 'none';
    latestSongsContainer.style.display = 'none';
    additionalButton2.style.display = 'none';
    additionalButton4.style.display = 'none';
    additionalButton5.style.display = 'none';
    additionalButton6.style.display = 'none';

    resultsContainer.style.display = 'block';
    additionalButton.style.display = 'block';
}

document.getElementById('additionalButton').addEventListener('click', function () {
    const selectedPlaylist = document.querySelector('input[name="playlist"]:checked');
    if (selectedPlaylist) {
        window.open(selectedPlaylist.value, '_blank');
    } else {
        alert('Por favor, selecione uma playlist.');
    }
});