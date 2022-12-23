const container = document.querySelector(".music-container")
const musicName = container.querySelector(".song-details .name")
const musicArtist = container.querySelector(".song-details .artist")
const mainAudio = container.querySelector(".main-audio")
const playPauseBtn = container.querySelector(".play-pause")
const prevBtn = container.querySelector(".prev")
const nextBtn = container.querySelector(".next")
const progressArea = container.querySelector(".progress-area")
const progressBar = progressArea.querySelector(".progress-bar")
let musicPaused = false
alert("10 hóa mãi đỉnh :VV")
function getRandomInt(min, max){
    return Math.floor(Math.random()*(max-min)) +min;
}
let musicIndex = getRandomInt(0, musicList.length-1)
window.addEventListener("load" , ()=> {
    loadMusic(musicIndex)
 }
)
function nextMusic(){
    if(musicIndex == musicList.length-1){
        musicIndex = 0;
    }else{
        musicIndex++;
    }
    loadMusic(musicIndex)
    playMusic()
}
function prevMusic(){
    if(musicIndex ==0){
        musicIndex = musicList.length -1
    }else{
        musicIndex--
    }
    loadMusic(musicIndex)
    playMusic()
}

function loadMusic(indexNumber){
    musicName.innerText = musicList[indexNumber].name
    musicArtist.innerText = musicList[indexNumber].artist
    mainAudio.src = `${musicList[musicIndex].src}`
    if(musicIndex == 3){
        alert("Rồi xong :>> ")
    }
}
function playMusic(){
    musicPaused = false
    playPauseBtn.querySelector("i").innerText = "pause"
    mainAudio.play()
}

function pauseMusic(){
    musicPaused = true
    playPauseBtn.querySelector("i").innerText = "play_arrow"
    mainAudio.pause()
}

playPauseBtn.addEventListener("click", ()=>{
    musicPaused ? playMusic() : pauseMusic()
})
nextBtn.addEventListener("click",()=>{
    nextMusic()
})
prevBtn.addEventListener("click", ()=>{
    prevMusic()
})
mainAudio.addEventListener("timeupdate", (e)=>{
    const currentTime = e.target.currentTime
    const duration = e.target.duration
    let progressWidth = currentTime/duration*100
    progressBar.style.width = `${progressWidth}%`
    let musicCurrentTime = container.querySelector(".current")
    let musicDuration = container.querySelector(".duration")
    mainAudio.addEventListener("loadeddata", ()=>{
        let audioDuration = mainAudio.duration
        let totalMin = Math.floor(audioDuration/60)
        let totalSec=Math.floor(audioDuration  % 60)
        totalSec = totalSec < 10 ? `0${totalSec}` : totalSec
        musicDuration.innerText = `${totalMin}: ${totalSec}`
    })
    let currentMin = Math.floor(currentTime / 60)
    let currentSec = Math.floor(currentTime % 60)
    currentSec = currentSec < 10 ? `0${currentSec}` : currentSec
    musicCurrentTime.innerText = `${currentMin}: ${currentSec}`
    if(currentTime >= duration){
        nextMusic()
    }
})
progressArea.addEventListener("click", (e)=>{
    let progressWidth = progressArea.clientWidth
    let clickedOffSetX = e.offsetX
    let songDuration = mainAudio.duration
    mainAudio.currentTime = (clickedOffSetX/ progressWidth) * songDuration
})
// helper functions
const PI2 = Math.PI * 2
const random = (min, max) => Math.random() * (max - min + 1) + min | 0
const timestamp = _ => new Date().getTime()

// container
