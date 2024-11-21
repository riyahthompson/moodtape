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
        img : 'images/breakindishes.jpg',
        name : 'Breakin Dishes',
        artist : 'Rihanna',
        music : 'music/angry/Breakin Dishes - rihanna.mp3'
    },
    {
        img : 'images/caught.png',
        name : 'Caught Out There',
        artist : 'Kelis',
        music : 'music/angry/Caught Out There - kelis.mp3' 
    },
    {
        img : 'images/complicated.jpg',
        name : 'Complicated',
        artist : 'Avril Lavigne',
        music : 'music/angry/Complicated - Avril Lavigne.mp3'
    },
    {
        img : 'images/crazy.jpg',
        name : 'Crazy',
        artist : 'Doechii',
        music : 'music/angry/Crazy - doechii.mp3'
    },
	{
        img : 'images/dtw.jpg',
        name : 'Drop the World',
        artist : 'Lil Wayne',
        music : 'music/angry/Drop The World - lil wayne.mp3'
    },
	{
        img : 'images/dfkwy.jpg',
        name : "I Don't Fk With You",
        artist : 'Big Sean',
        music : "music/angry/I Don't Fk With You - big sean.mp3"
    },
	{
        img : 'images/hate.jpg',
        name : 'I Hate Everything About You',
        artist : 'Three Days Grace',
        music : 'music/angry/I Hate Everything About You - three days grace.mp3'
    },
	{
        img : 'images/endd.jpg',
        name : 'In the End',
        artist : 'Linkin Park',
        music : 'music/angry/In the End - linkin park.mp3'
    },
	{
        img : 'images/knuck.jpg',
        name : 'Knuck If You Buck',
        artist : 'Crime Mob',
        music : 'music/angry/Knuck If You Buck - crime mob.mp3'
    },
	{
        img : 'images/partyup.jpg',
        name : 'Party Up',
        artist : 'DMX',
        music : 'music/angry/Party Up - DMX.mp3'
    },
	{
        img : 'images/rage.jpg',
        name : 'Rage',
        artist : 'Rico Nasty',
        music : 'music/angry/Rage - rico nasty.mp3'
    },
	{
        img : 'images/smack.jpg',
        name : 'Smack a B!tch',
        artist : 'Rico Nasty',
        music : 'music/angry/Smack a Bitch - rico nasty.mp3'
    },
	{
        img : 'images/stfu.jpg',
        name : 'STFU!',
        artist : 'Rina Sawayama',
        music : 'music/angry/STFU! - rina sawayama.mp3'
    },
	{
        img : 'images/wayiam.jpg',
        name : 'The Way I Am',
        artist : 'Eminem',
        music : 'music/angry/The Way I Am - Eminem.mp3'
    },
	{
        img : 'images/worst.jpg',
        name : 'Worst Behavior',
        artist : 'Drake',
        music : 'music/angry/Worst Behavior - drake.mp3'
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