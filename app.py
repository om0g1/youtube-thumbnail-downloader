from modules import Downloader
from flask import Flask, render_template, send_file, url_for, jsonify

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/load_thumbnail/<id>")
def load(id:str):
    url = "https://youtu.be/"+id
    downloader = Downloader()
    return jsonify(downloader.get_thumbnail(url))

@app.route("/thumbnail.jpg")
def get_image():
    return send_file("thumbnail.jpg", mimetype="image/gif", as_attachment=True)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)