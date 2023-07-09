import os
import pytube
import requests

class Downloader():
    def __init__(self) -> None:
        pass
    
    def load_thumbnail(self, url:str):
        try:
            video = pytube.YouTube(url.strip())
            return "thumbnail.jpg"
        except:
            return False

    def get_thumbnail(self, url:str):
        try:
            video = pytube.YouTube(url.strip())
            thumbnail_url = video.thumbnail_url
            response = requests.get(thumbnail_url, allow_redirects=True)
            with open("thumbnail.jpg", 'wb') as file:
                for chunk in response.iter_content(chunk_size=8192):
                    if chunk:
                        file.write(chunk)
            file_size = os.path.getsize("thumbnail.jpg")
            if file_size > 0:
                return "thumbnail.jpg"
            else:
                return False     
        except:
            return False

if __name__ == "__main__":
    Downloader.get_thumbnail(input("Video url: "))