let currentSong = new Audio();
let songs;
let currFolder;

function secondsToMinutesAndSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00"
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = remainingSeconds.toString().padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
}


function shuffleSong(array) {
    let currentIndex = array.length;
    let randomIndex;

    while (currentIndex > 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // Swap elements
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}



async function getSongs(folder) {
    currFolder = folder;
    let x = await fetch(`/${folder}/`)
    let response = await x.text();
    // console.log(response)

    let div = document.createElement("div")
    div.innerHTML = response;

    //pushing all songs in an array- songs
    songs = [];
    let a = div.getElementsByTagName("a");
    for (let i = 0; i < a.length; i++) {
        const element = a[i];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split(`/${folder}/`)[1])
        }
    }


    //show all the songs in the playlist
    let playlist = document.querySelector(".song-list").getElementsByTagName("ol")[0]
    playlist.innerHTML = "";
    for (const song of songs) {
        playlist.innerHTML += `<li><div class="flex align-center" style="gap: 0.5rem;">
            <img src="svg/music.svg" class="invert" alt="music">
            <div class="info">
                <div class="song-name">${song.replaceAll("%20", " ")}</div>
                <div class="song-artist">Pushp Raj</div>
            </div>
        </div>
        <div class="flex align-center" style="gap: 0.2rem; font-size: 0.7rem;"">
            <span id="play-playing">Play Now</span>
            <img src="svg/play.svg" class="invert" alt="">
        </div></li>`;
    }


    //Attach an event listener to each song
    Array.from(document.querySelector(".song-list").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {

            playMusic(e.getElementsByTagName("div")[2].innerHTML)
            // console.log(e.getElementsByTagName("div")[2].innerHTML)

        })
    })

    return songs;

}



function playMusic(track, pause = false) {
    // let audio = new Audio("/songs/" + track)
    currentSong.src = `/${currFolder}/` + track;
    if (!pause) {
        currentSong.play();
        play.src = "svg/pause.svg"
    }

    document.querySelector(".song-info").innerHTML = decodeURI(track);
    // document.querySelector(".song-duration").innerHTML = "00:00 / 00:00"

}

async function displayAlbums() {
    let x = await fetch(`/songs/`)
    let response = await x.text();

    let div = document.createElement("div")
    div.innerHTML = response;
    let allAnchorTags = div.getElementsByTagName("a");
    let cardContainer = document.querySelector(".card-container")

    let array = Array.from(allAnchorTags)
    for (let index = 0; index < array.length; index++) {
        const e = array[index];
        if (e.href.includes("/songs") && !e.href.includes(".htaccess")) {
            let folder = e.href.split("/").slice(-2)[0]

            //get the metadata of the folder
            let x = await fetch(`/songs/${folder}/info.json`)
            let response = await x.json();
            // console.log(response)
            cardContainer.innerHTML = cardContainer.innerHTML + `<div class="card" data-folder="${folder}">
            <div>
                <img src="/songs/${folder}/cover.jpeg" alt="image">
                <button class="play-btn">
                    <div class="play-icon"></div>
                </button>
            </div>
            <h3>${response.title}</h3>
            <p>${response.description}</p>
        </div>`
        }
    }

    //Loading the playlist whenever any card(Album) is clicked.
    Array.from(document.getElementsByClassName("card")).forEach((e) => {
        e.addEventListener("click", async (item) => {
            songs = await getSongs(`songs/${item.currentTarget.dataset.folder}`)
            playMusic(songs[0])
        })
    })
}



async function main() {

    //get list of all the songs
    await getSongs("songs/Evergreen")
    // console.log(songs)

    playMusic(songs[0], true)

    //Display all the albums on the page.
    displayAlbums()


    //Attach an event listener to play, next, previous
    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play();
            play.src = "svg/pause.svg";
        }
        else {
            currentSong.pause();
            play.src = "svg/play.svg";
        }
    })


    // Listen for timeupdate event
    currentSong.addEventListener("timeupdate", () => {
        document.querySelector(".current-duration").innerHTML = `${secondsToMinutesAndSeconds(currentSong.currentTime)}`
        document.querySelector(".total-duration").innerHTML = `${secondsToMinutesAndSeconds(currentSong.duration)}`

        // document.querySelector(".song-duration").innerHTML = `${secondsToMinutesAndSeconds(currentSong.currentTime)} / ${secondsToMinutesAndSeconds(currentSong.duration)}`

        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
    })

    // Add an event listener to seekbar
    document.querySelector(".seekbar").addEventListener("click", (e) => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;

        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = ((currentSong.duration) * percent) / 100;
    })


    //Adding an event listener for hamburger(menu) button.
    document.querySelector(".menu").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0%"
    })


    //Adding an event listener for close button.
    document.querySelector("#close").addEventListener("click", (e) => {
        document.querySelector(".left").style.left = "-120%"
    })

    //Adding an event listeners for previous button.
    previous.addEventListener("click", () => {
        console.log("Previous clicked")
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
        if ((index - 1) >= 0) {
            playMusic(songs[index - 1])
        }
    })

    //Adding an event listeners for next button.
    next.addEventListener("click", () => {
        console.log("Next clicked")
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
        if ((index + 1) < songs.length) {
            playMusic(songs[index + 1])
        }
    })

    //Adding an event listener for volume.
    document.querySelector("#volume-range").addEventListener("change", (e) => {
        console.log("setting volume to", e.target.value, "/ 100");
        currentSong.volume = parseInt(e.target.value) / 100;
        if(currentSong.volume > 0){
            document.querySelector("#volume-btn").src = document.querySelector("#volume-btn").src.replace("svg/mute_volume.svg", "svg/volume.svg");
        }
        else{
            document.querySelector("#volume-btn").src = document.querySelector("#volume-btn").src.replace("svg/volume.svg", "svg/mute_volume.svg");

        }
    })

    //Adding an event listener for mute unmute.
    document.querySelector("#volume-btn").addEventListener("click", (e) => {
        if (currentSong.volume != 0) {
            currentSong.volume = 0
            e.target.src = e.target.src.replace("svg/volume.svg", "svg/mute_volume.svg");
            document.querySelector("#volume-range").value = 0;
        }
        else {
            currentSong.volume = 20 / 100;
            e.target.src = e.target.src.replace("svg/mute_volume.svg", "svg/volume.svg");
            document.querySelector("#volume-range").value = 20;
        }
    })
    

}

main()