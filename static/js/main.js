const urlInput = document.getElementById("url-input");
const clearBtn = document.getElementById("clear-btn");
const searchBtn = document.getElementById("search-btn");
const searchSvg = document.getElementById("search-svg");
const downlodLoader = document.getElementById("download-loader");
const downloadBtn = document.getElementById("download-btn");
const thumbnailPlaceholder = document.getElementById("thumbnail-placeholder");

window.onload = e => {
    navigator.clipboard.readText().then((url) => {
    const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    
    if (match && match[2].length === 11) {
        urlInput.value = url;
        searchSvg.style.display = "none";
        downlodLoader.style.display = "block";
        load_thumbnail(match[2]);
    } else {
        alert('The supplied URL is not valid');
    }
    });
}

urlInput.onchange = e => {
    if (urlInput.value == ""){
        clearBtn.style.display = "none";
    } else{
        downloadBtn.style.display = "none";
        searchBtn.style.display = "block";
        downlodLoader.style.display = "none";
        searchSvg.style.display = "block";
        clearBtn.style.display = "block";
        const url = urlInput.value;
        const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        
        const match = url.match(regExp);
        
        if (match && match[2].length === 11) {
            searchSvg.style.display = "none";
            downlodLoader.style.display = "block";
            load_thumbnail(match[2]);
        } else {
            alert('The supplied URL is not valid');
        }
        }
}

clearBtn.onclick = e => {
    urlInput.value = ""
    downloadBtn.style.display = "none";
    searchBtn.style.display = "block";
    searchSvg.style.display = "block";
    downlodLoader.style.display = "none";
}

searchBtn.onclick = e => {
    const url = urlInput.value;
    const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    
    const match = url.match(regExp);
    
    if (match && match[2].length === 11) {
        searchSvg.style.display = "none";
        downlodLoader.style.display = "block";
        load_thumbnail(match[2]);
    } else {
        alert('The supplied URL is not valid');
    }
}

function load_thumbnail(id){
    var request = new XMLHttpRequest();
    path = "http://localhost:5000/load_thumbnail/" + id;
    request.open("GET", path, false);
    request.onreadystatechange = function (){
        if (request.readyState == 4 && request.status == 200){
            let response = JSON.parse(request.responseText);
            if (response != false){
                searchBtn.style.display = "none";
                downloadBtn.style.display = "block";
                thumbnailPlaceholder.src = "";
                thumbnailPlaceholder.src = response;
            } else {
                alert("Error downloading");
            }
        } else {
            downlodLoader.style.display = "none";
            downloadBtn.style.display = "none";
            searchSvg.style.display = "block";
            console.log(sth += 1);
            alert("There was an error getting the thumbnail of "+path);
        };
    };
    request.send();
}

downloadBtn.onclick = e => {
    searchBtn.style.display = "block";
    searchSvg.style.display = "block";
    downlodLoader.style.display = "none";
    downloadBtn.style.display = "none";
    urlInput.value = "";
}

clearBtn.style.display = "none";
urlInput.value = "";