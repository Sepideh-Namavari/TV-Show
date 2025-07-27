const container = document.getElementById("episodes-container");
const select = document.getElementById("search");

// استخراج showId از URL
const params = new URLSearchParams(window.location.search);
const showId = params.get("showId");
const url = `https://api.tvmaze.com/shows/${showId}/episodes`;

async function fetchEpisodes() {
  try {
    const res = await fetch(url);
    const episodes = await res.json();
    renderEpisodes(episodes);
  } catch (error) {
    container.innerHTML = "<p style='color:red'>خطا در دریافت اپیزودها</p>";
    console.log(error);
  }
}
fetchEpisodes();

function renderEpisodes(episodes) {
  container.innerHTML = "";
  episodes.forEach((ep) => {
    const epCard = document.createElement("div");
    epCard.classList.add("ep-card");
    epCard.setAttribute("data-ep-id", ep.id);

    const epbody = document.createElement("div");
    epbody.className = "ep-body";
    epCard.append(epbody);
    const epimage = document.createElement("img");
    epimage.src = `${ep.image?.medium || ""}`;
    epimage.alt = `${ep.name}`;
    epbody.append(epimage);
    const eptext = document.createElement("div");
    eptext.className = "ep-text";
    epbody.append(eptext);
    const p = document.createElement("p");
    p.textContent = `S${ep.season}-E${ep.number} ${ep.name}`;
    eptext.append(p);
    const btn = document.createElement("button");
    btn.className = "search-btn";
    btn.id = "ep-btn";
    eptext.append(btn);
    const i = document.createElement("i");
    i.className = "fas fa-play";
    btn.append(i);
    const summary = document.createElement("div");
    summary.className = "summary-tooltip";
    summary.textContent = `${
      ep.summary
        ? ep.summary.replace(/<[^>]+>/g, "").slice(0, 250) + "..."
        : "No summary"
    }`;
    eptext.append(summary);

    summary.addEventListener("mouseover", () => {
      summary.style.display = "block";
    });

    summary.addEventListener("mouseleave", () => {
      summary.style.display = "none";
    });
    container.appendChild(epCard);

    function populateDropdown(episodes) {
      console.log(episodes);
      if (!select) return;

      select.innerHTML = `<option disabled selected>All Episodes</option>`;

      episodes.forEach((ep) => {
        const option = document.createElement("option");
        option.value = ep.id;
        option.textContent = `S${ep.season}-E${ep.number} ${ep.name}`;
        select.appendChild(option);
      });

      select.addEventListener("change", (e) => {
        const selectedId = e.target.value;
        const target = document.querySelector(`[data-ep-id="${selectedId}"]`);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "center" });
          target.classList.add("highlight");
          setTimeout(() => target.classList.remove("highlight"), 2000);
        }
      });
    }

  
  });
}
