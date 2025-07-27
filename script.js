const showsContainer = document.getElementById("showsContainer");
const searchInput = document.getElementById("search");
// const moreText = document.getElementById("moreText");

let allShows = [];
let currentShowCount = 12;
// ---------  index page ------------

async function fetchShows() {
  try {
    const res = await fetch("https://api.tvmaze.com/shows");
    const data = await res.json();
    allShows = data;

    renderShows(allShows.slice(0, currentShowCount));
  } catch (error) {
    showsContainer.innerHTML =
      "<p style='color:red'>خطا در دریافت اطلاعات از TVMaze</p>";
  }
}

function renderShows(shows) {
  showsContainer.innerHTML = "";

  shows.forEach((show) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${show.image?.medium || ""}" alt="${show.name}" />
        <div class="card-body">
        <h4>${show.name}</h4>
        <p> ${show.genres.join(" | ")}</p>
        <p> ${show.rating.average}</p>
        </div>
    `;
    card.addEventListener("click", () => {
      window.location.href = `episode.html?showId=${show.id}`;
    });
    showsContainer.appendChild(card);
  });

  if (currentShowCount < allShows.length) {
    const moreText = document.createElement("p");
    moreText.classList = "load-more";
    moreText.textContent = "more...";
    moreText.style.color = "white";
    moreText.style.textAlign = "center";
    moreText.style.marginTop = "1rem";
    moreText.style.cursor = "pointer";
    moreText.addEventListener("click", () => {
      currentShowCount += 12;
      renderShows(allShows.slice(0, currentShowCount));
    });

    showsContainer.appendChild(moreText);
  }
  if (shows.length <= 3) {
    showsContainer.style.justifyContent = "center";
  } else {
    showsContainer.style.justifyContent = "flex-start";
  }
}

// function showMoreLink() {
//     if (moreText) {
//       moreText.style.display = "block";
//       moreText.addEventListener("click", () => {
//         showsDisplayed += 12;
//         renderShows(allShows.slice(0, showsDisplayed));

// if (showsDisplayed >= allShows.length) {
//   moreText.style.display = "none";
// }
//     });
//   }
// }

searchInput.addEventListener("input", () => {
  const term = searchInput.value.toLowerCase();
  const filtered = allShows.filter((show) =>
    show.name.toLowerCase().includes(term)
  );
  // searchInput.style.color = "white";
  renderShows(filtered);

  // const moreLink = document.querySelector(".load-more");
  if (moreText) moreText.style.display = "none";
});

fetchShows();

//------------------------------------------------

// const container = document.getElementById("episodes-container");

// const params = new URLSearchParams(window.location.search);
// const showId = params.get("showId");
// // Fetch episodes from TVMaze
// async function fetchEpisodes() {
//   try {

//     const response = await fetch(
//       `https://api.tvmaze.com/shows/${showId}/episodes`
//     );
//     const episodes = await response.json();
//     displayEpisodes(episodes)

//   } catch (error) {
//     console.error("Error fetching episodes:", error);
//   }
// }

// // Display episodes on page
// function displayEpisodes(episodes) {
//   container.innerHTML = "";
//   episodes.forEach((ep) => {
//     const episodeCard = document.createElement("div");
//     episodeCard.classList.add("episode-card");

//     episodeCard.innerHTML = `
//       <img src="${ep.image?.medium || ""}" alt="${ep.name}" />
//       <div class="episode-body">
//       <h4>${ep.name}</h4>
//             <p>Season ${ep.season} | Episode ${ep.number}</p>

//       </div>
//     `;
// //     line 114
// //     <p>${
//   //       ep.summary ? ep.summary.replace(/<[^>]+>/g, "") : "No summary available"
//   //     }</p>
//     container.appendChild(episodeCard);
//   });

// }
// fetchEpisodes();

//  const container = document.getElementById("episodes-container");

//--------- spisodes page -------------

// searchInput.addEventListener("input", () => {
//   const query = searchInput.value.toLowerCase();
//   const filtered = allEpisodes.filter(
//     (ep) =>
//       ep.name.toLowerCase().includes(query) ||
//       ep.summary?.toLowerCase().includes(query)
//   );
//   displayEpisodes(filtered);
// });

// fetchEpisodes();
