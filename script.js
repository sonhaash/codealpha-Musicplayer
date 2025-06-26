const songs = [
  {
    title: "Ocean Breeze",
    artist: "Wave Sounds",
    file: "music/ocean.mp3",
    duration: "2:58",
    thumb: "thumbnails/ocean.jpg"
  },
  {
    title: "Road Trip",
    artist: "The Travellers",
    file: "music/roadtrip.mp3",
    duration: "3:35",
    thumb: "thumbnails/roadtrip.jpg"
  },
  {
    title: "Sunny Vibes",
    artist: "DJ Sun",
    file: "music/sunny.mp3",
    duration: "2:45",
    thumb: "thumbnails/sunny.jpg"
  },
  {
    title: "Moonlight Jazz",
    artist: "Night Band",
    file: "music/moonlight.mp3",
    duration: "3:10",
    thumb: "thumbnails/moonlight.jpg"
  }
];

const playlist = document.getElementById("playlist");
const audio = document.getElementById("audio");
const currentTitle = document.getElementById("current-title");
const currentArtist = document.getElementById("current-artist");
const currentThumb = document.getElementById("current-thumb");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentSongIndex = -1;

// Load saved index
const savedIndex = localStorage.getItem("lastPlayedIndex");
if (savedIndex !== null) {
  playSong(parseInt(savedIndex), false); // load but don't autoplay
}

songs.forEach((song, index) => {
  const li = document.createElement("li");

  li.innerHTML = `
    <img src="${song.thumb}" alt="Thumbnail">
    <div class="song-info">
      <h3>${song.title}</h3>
      <p>${song.artist}</p>
    </div>
    <div class="duration">${song.duration}</div>
  `;

  li.addEventListener("click", () => {
    playSong(index, true); // autoplay
  });

  playlist.appendChild(li);
});

function playSong(index, autoPlay = true) {
  const song = songs[index];
  currentSongIndex = index;
  audio.src = song.file;
  currentTitle.textContent = song.title;
  currentArtist.textContent = song.artist;
  currentThumb.src = song.thumb;
  localStorage.setItem("lastPlayedIndex", index); // save to localStorage

  if (autoPlay) {
    audio.play();
  }
}

nextBtn.addEventListener("click", () => {
  if (currentSongIndex === -1) return;
  const nextIndex = (currentSongIndex + 1) % songs.length;
  playSong(nextIndex);
});

prevBtn.addEventListener("click", () => {
  if (currentSongIndex === -1) return;
  const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  playSong(prevIndex);
});
