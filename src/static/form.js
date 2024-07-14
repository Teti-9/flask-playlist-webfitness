function openForm() {
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}

function createPlaylist(event) {
    event.preventDefault();
    const form = event.target;
    const name = document.getElementById('name').value;
    const desc = document.getElementById('desc').value;
    const formData = new FormData(form);
    formData.append('name', name);
    formData.append('desc', desc);
    fetch('/create_playlist', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            form.reset();
            document.getElementById("myForm").style.display = "none";
            alert('Playlist criada com sucesso.');
        })
        .catch(error => console.error('Error:', error));
}

// Attach event listener to the form's submit event
document.getElementById('newPlaylistForm').addEventListener('submit', createPlaylist);