from src import db

class Song(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    id_spotify = db.Column(db.Integer, unique=True)
    name = db.Column(db.String(10000))
    played_at = db.Column(db.String(10000))