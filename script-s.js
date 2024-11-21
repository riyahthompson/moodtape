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
        img : 'images/shesaid.jpg',
        name : 'All The Things She Said',
        artist : 't.A.T.u.',
        music : 'music/sad/All The Things She Said - tatu.mp3'
    },
    {
        img : 'images/cbaby.jpg',
        name : 'Crack Baby',
        artist : 'Mitski',
        music : 'music/sad/Crack Baby - mitski.mp3' 
    },
    {
        img : 'images/boa.jpg',
        name : 'Duvet',
        artist : 'Boa',
        music : 'music/sad/Duvet - boa.mp3'
    },
    {
        img : 'images/echoes.jpg',
        name : 'Echoes Of Silence',
        artist : 'The Weeknd',
        music : 'music/sad/Echoes Of Silence - The Weeknd.mp3'
    },
	{
        img : 'images/wanted.jpg',
        name : 'everything i wanted',
        artist : 'Billie Eilish',
        music : 'music/sad/everything i wanted - billie eilish.mp3'
    },
	{
        img : 'images/hatereal.jpg',
        name : 'HATE THE REAL ME',
        artist : 'Future',
        music : 'music/sad/HATE THE REAL ME - Future.mp3'
    },
	{
        img : 'images/tired.jpg',
        name : 'Im Tired',
        artist : 'Labrinth, Zendaya',
        music : 'music/sad/Im Tired -  labrinth.mp3'
    },
	{
        img : 'images/downtown.jpg',
        name : 'Downtown',
        artist : 'Lil Peep',
        music : 'music/sad/Lil Peep - Downtown (prod lederrick).mp3'
    },
	{
        img : 'images/timeintro.jpg',
        name : 'Long time (Intro)',
        artist : 'Playboi Carti',
        music : 'music/sad/Long time (Intro) - playboi carti.mp3'
    },
	{
        img : 'images/bodyno.jpg',
        name : 'Nobody',
        artist : 'Mitski',
        music : 'music/sad/Nobody - mitski.mp3'
    },
	{
        img : 'images/pursuit.jpg',
        name : 'Pursuit Of Happiness',
        artist : 'Kid Cudi',
        music : 'music/sad/Pursuit Of Happiness - kid cudi.mp3'
    },
	{
        img : 'images/softcore.jpg',
        name : 'Softcore',
        artist : 'The Neighbourhood',
        music : 'music/sad/Softcore - The Neighbourhood.mp3'
    },
	{
        img : 'images/waylifegoes.jpg',
        name : 'The Way Life Goes',
        artist : 'Lil Uzi',
        music : 'music/sad/The Way Life Goes - lil uzi (feat. Oh Wonder).mp3'
    },
	{
        img : 'images/treatme.jpg',
        name : 'Treat Me Like Somebody',
        artist : 'Tink',
        music : 'music/sad/Treat Me Like Somebody - tink.mp3'
    },
	{
        img : 'images/uheard.jpg',
        name : 'What You Heard',
        artist : 'Sonder',
        music : 'music/sad/What You Heard - Sonder.mp3'
    },
	{
        img : 'images/yandb.jpg',
        name : 'Young and Beautiful',
        artist : 'Lana Del Rey',
        music : 'music/sad/Young and Beautiful - Lana Del Rey.mp3'
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