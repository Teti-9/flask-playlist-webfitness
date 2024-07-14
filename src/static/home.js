function home() {
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

    resultsContainer.style.display = 'none';
    myplaylistsContainer.style.display = 'none';
    latestSongsContainer.style.display = 'none';
    additionalButton.style.display = 'none';
    additionalButton2.style.display = 'none';
    additionalButton4.style.display = 'none';
    additionalButton5.style.display = 'none';
    additionalButton6.style.display = 'none';
}