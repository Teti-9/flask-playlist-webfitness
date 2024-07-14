from src.auth.auth import authenticate_spotify

def get_spotify_playlist(query, limit=10):
    auth = authenticate_spotify()
    results = auth.search(q=query, type='playlist', limit=limit)
    playlists = results['playlists']['items']
    playlist_info = [{
        'id': playlist['id'],
        'name': playlist['name'],
        'owner': playlist['owner']['display_name'],
        'uri': playlist['uri'],
        'url': playlist['external_urls']['spotify']
    } for playlist in playlists ]
    return playlist_info

def get_recent_played(limit=10):
    auth = authenticate_spotify()
    results = auth.current_user_recently_played(limit=limit)
    tracks = results['items']
    track_info = [{
        'id': track['track']['uri'],
        'name': track['track']['name'],
        'played_at': track['played_at']
    } for track in tracks]
    return track_info

def create_playlist(name, desc):
    auth = authenticate_spotify()
    user_id = auth.current_user()['id']
    playlist = auth.user_playlist_create(user=user_id, name=name, public=True, description=desc)
    return playlist

def check_my_playlists():
    auth = authenticate_spotify()
    user_id = auth.current_user()['id']
    playlists = auth.user_playlists(user_id)
    return playlists['items']

def add_songs_to_playlist(playlist, songs):
    auth = authenticate_spotify()
    add = auth.playlist_add_items(playlist_id=playlist, items=songs)
    return add