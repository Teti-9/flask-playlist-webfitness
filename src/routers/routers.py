from src.routers.utils import get_spotify_playlist, get_recent_played, create_playlist, check_my_playlists, add_songs_to_playlist
from flask import Blueprint, render_template, request, redirect, jsonify
from dotenv import load_dotenv

load_dotenv()

routers = Blueprint("routers", __name__)

@routers.route("/", methods=["GET", "POST"])
def home():
    return render_template("main.html")

@routers.route("/songs", methods=["GET"])
def songs():
    playlists = get_spotify_playlist(request.args.get("playlist_name"))
    if playlists is None:
            return redirect(location="/")
    else:
        return jsonify(playlists)

@routers.route("/recent_songs", methods=["GET"])
def recent_songs():
    recents = get_recent_played()
    return jsonify(recents)

@routers.route("/create_playlist", methods=["POST"])
def create_new_playlist():
    name = request.form.get('name')
    desc = request.form.get('desc')
    response = create_playlist(name, desc)
    return jsonify(response)

@routers.route("/my_playlists", methods=["GET"])
def my_playlists():
    my_playlists = check_my_playlists()
    if my_playlists is None:
            return redirect(location="/")
    else:
        return jsonify(my_playlists)

@routers.route("/add_songs", methods=["POST"])
def add_songs():
    data = request.get_json()
    playlist = data.get('playlist')
    songs = data.get('songs')
    songs = [songs]
    added = add_songs_to_playlist(playlist, songs)
    return jsonify(added)