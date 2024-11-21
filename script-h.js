let now_playing = document.querySelector('.now-playing');
let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');

let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');

let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let wave = document.getElementById('wave');
let randomIcon = document.querySelector('.fa-random');
let curr_track = document.createElement('audio');

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const music_list = [
    {
        img : 'images/360.jpg',
        name : '360',
        artist : 'Charli xcx',
        music : 'music/happy/360 - Charli xcx.mp3'
    },
    {
        img : 'images/ballo.jpg',
        name : 'Balloon',
        artist : 'Tyler, The Creator, Doechii',
        music : 'music/happy/Balloon - Tyler, The Creator feat. Doechii.mp3' 
    },
    {
        img : 'images/boyf.jpg',
        name : 'Boyfriend',
        artist : 'SahBabii, itzMrT3',
        music : 'music/happy/Boyfriend - SahBabii ft. itzMrT3.mp3'
    },
    {
        img : 'images/espre.jpg',
        name : 'Espresso',
        artist : 'Sabrina Carpenter',
        music : 'music/happy/Espresso - sabrina carpenter.mp3'
    },
	{
        img : 'images/gme.jpg',
        name : 'Give Me Everything',
        artist : 'Pitbull, Ne-Yo, Afrojack, Nayer',
        music : 'music/happy/Give Me Everything - Pitbull ft. Ne-Yo, Afrojack, Nayer.mp3'
    },
	{
        img : 'images/gladu.jpg',
        name : 'Glad You Came',
        artist : 'The Wanted',
        music : 'music/happy/Glad You Came - the wanted.mp3'
    },
	{
        img : 'images/mybag.jpg',
        name : 'in my bag',
        artist : 'Meg Donnelly',
        music : 'music/happy/in my bag - meg donnelly.mp3'
    },
	{
        img : 'images/kissmore.jpg',
        name : 'Kiss Me More',
        artist : 'Doja Cat, SZA',
        music : 'music/happy/Kiss Me More - Doja Cat ft Sza.mp3'
    },
	{
        img : 'images/lev.jpg',
        name : 'Levitating',
        artist : 'Dua Lipa',
        music : 'music/happy/Levitating - Dua Lipa.mp3'
    },
	{
        img : 'images/newj.jpg',
        name : 'New Jeans',
        artist : 'NewJeans',
        music : 'music/happy/New Jeans - NewJeans.mp3'
    },
	{
        img : 'images/notmp.jpg',
        name : 'Not My Problem',
        artist : 'Laila!',
        music : 'music/happy/Not My Problem - Laila!.mp3'
    },
	{
        img : 'images/sayso.jpg',
        name : 'Say So',
        artist : 'Doja Cat',
        music : 'music/happy/Say So - Doja Cat.mp3'
    },
	{
        img : 'images/sins.jpg',
        name : 'sins (let me in)',
        artist : 'Kanii',
        music : 'music/happy/sins (let me in) - Kanii.mp3'
    },
	{
        img : 'images/themgirls.jpg',
        name : 'Where Them Girls At',
        artist : 'David Guetta, Nicki Minaj, Flo Rida',
        music : 'music/happy/Where Them Girls At - David Guetta.mp3'
    },
	{
        img : 'images/starship.jpg',
        name : 'You Make Me Feel...',
        artist : 'Cobra Starship, Sabi',
        music : 'music/happy/You Make Me Feel... - Cobra Starship feat. Sabi.mp3'
    },
	{
        img : 'images/glam.jpg',
        name : 'ГЛАМУР',
        artist : 'uniqe, nkeeei, ARTEM SHILOVETS, Wipo',
        music : 'music/happy/ГЛАМУР - uniqe.mp3'
    },
];

loadTrack(track_index);

function loadTrack(track_index){
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[track_index].music;
    curr_track.load();

    track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
    track_name.textContent = music_list[track_index].name;
    track_artist.textContent = music_list[track_index].artist;
    now_playing.textContent = "Playing music " + (track_index + 1) + " of " + music_list.length;

    updateTimer = setInterval(setUpdate, 1000);

    curr_track.addEventListener('ended', nextTrack);
    random_bg_color();
}

function random_bg_color(){
    let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e'];
    let a;

    function populate(a){
        for(let i=0; i<6; i++){
            let x = Math.round(Math.random() * 14);
            let y = hex[x];
            a += y;
        }
        return a;
    }
    let Color1 = populate('#');
    let Color2 = populate('#');
    var angle = 'to right';

    let gradient = 'linear-gradient(' + angle + ',' + Color1 + ', ' + Color2 + ")";
    document.body.style.background = gradient;
}
function reset(){
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}
function randomTrack(){
    isRandom ? pauseRandom() : playRandom();
}
function playRandom(){
    isRandom = true;
    randomIcon.classList.add('randomActive');
}
function pauseRandom(){
    isRandom = false;
    randomIcon.classList.remove('randomActive');
}
function repeatTrack(){
    let current_index = track_index;
    loadTrack(current_index);
    playTrack();
}
function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
}
function playTrack(){
    curr_track.play();
    isPlaying = true;
    track_art.classList.add('rotate');
    wave.classList.add('loader');
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
    track_art.classList.remove('rotate');
    wave.classList.remove('loader');
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}
function nextTrack(){
    if(track_index < music_list.length - 1 && isRandom === false){
        track_index += 1;
    }else if(track_index < music_list.length - 1 && isRandom === true){
        let random_index = Number.parseInt(Math.random() * music_list.length);
        track_index = random_index;
    }else{
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
}
function prevTrack(){
    if(track_index > 0){
        track_index -= 1;
    }else{
        track_index = music_list.length -1;
    }
    loadTrack(track_index);
    playTrack();
}
function seekTo(){
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}
function setVolume(){
    curr_track.volume = volume_slider.value / 100;
}
function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(curr_track.duration)){
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
        if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}