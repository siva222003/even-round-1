const main = document.querySelector('.main');
let lastDiv;
let url = 'https://rickandmortyapi.com/api/character';
let nextUrl = '';
let isPending = false;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const fetchData = async (url) => {
  console.log({ isPending });

  if (isPending) return;

  try {
    console.log('FETCHING', url);
    isPending = true;
    const res = await fetch(url);
    const data = await res.json();

    nextUrl = data.info.next;
    setData(data.results);
  } catch (error) {
    console.log(error);
  } finally {
    isPending = false;
  }
};

fetchData(url);

const renderCard = (data) => {
  return `
     <div class="main-container">
        <img
          src=${data.image}
          alt="profile"
          class="profile"
        />
        <div class="content">
          <h1>${data.id}</h1>
          <h1>${data.name}</h1>
          <p>${data.gender}</p>
          <p>${data.location.name}</p>
          <p>${data?.origin?.name || 'unavailable'}</p>
        </div>
      </div>`;
};

const setLastDiv = () => {
  main.innerHTML += '<div id="last"></div>';
  lastDiv = document.getElementById('last');
};

const setData = (data) => {
  if (lastDiv) lastDiv.remove();

  main.innerHTML += data.map(renderCard).join('');
  setLastDiv();
};

main.addEventListener('scroll', () => {
  const rect = last.getBoundingClientRect();

  if (rect.left - window.innerWidth <= 0) {
    if (nextUrl) fetchData(nextUrl);
  }
});
