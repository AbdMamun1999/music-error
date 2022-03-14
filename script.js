const elementById = (id) => {
  return document.getElementById(id);
};

const handleSearch = () => {
  const keyword = elementById("keyword");
  const url = `https://theaudiodb.com/api/v1/json/2/search.php?s=${keyword.value}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showArtists(data));
};

const showArtists = (data) => {
  console.log(data)
  const artistContainer = elementById("artist");
  data?.artists?.forEach((artist) => {
    const div = document.createElement("div");
    div.classList.add("artist-card");
    div.innerHTML = `
    <div class="image-container">
      <div class="image-container-inner">
        <img src="${artist.strArtistThumb?artist.strArtistThumb : 'https://www.seekpng.com/png/detail/966-9665317_placeholder-image-person-jpg.png'}" alt=""/>
      </div>
    </div>
    <div class="info-container">
      <h1>${artist.strArtist}</h1>
      <p>Country: ${artist.strCountry}</p>
      <p>Style: ${artist.strGenre}</p>
    </div>
    <button class="album-button">
      <i class="fa-solid fa-compact-disc"></i>
      <p onclick="fetchAlbums(${artist.idArtist})" class="button-title">Albums</p>
    </button>`;
    artistContainer.appendChild(div);
  });
};

const fetchAlbums = (id) => {
  console.log(id)
  const url = `https://theaudiodb.com/api/v1/json/2/album.php?i=${id}`;
  console.log(url)
  fetch(url)
    .then((res) => res.json())
    .then((data) => showAlbum(data));
  const artistContainer = elementById("artist");
  artistContainer.innerHTML = "";
};

const showAlbum = ({album}) => {
  console.log(album)
  const albumContainer = elementById("albums");
  album.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("album");
    div.innerHTML = `
        <div class="album-image-container">
          <img
            src="${item.strAlbumThumb}"
            alt=""
          />
        </div>
        <div class="album-name">
          <h3>${item.strAlbum}</h3>
        </div>
      `;

    albumContainer.appendChild(div);
  });
};
