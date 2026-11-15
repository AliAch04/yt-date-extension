const cache = {};
let tip = null;

function makeTip() {
  tip = document.createElement("div");
  Object.assign(tip.style, {
    position: "fixed",
    zIndex: 999999,
    background: "#111",
    color: "#fff",
    padding: "6px 10px",
    borderRadius: "6px",
    fontSize: "13px",
    pointerEvents: "none",
    display: "none",
    boxShadow: "0 2px 8px rgba(0,0,0,.5)"
  });
  document.body.appendChild(tip);
}

async function getDate(url) {
  if (cache[url]) return cache[url];
  const res = await fetch(url, { credentials: "omit" });
  const html = await res.text();
  const m = html.match(/"uploadDate":"([^"]+)"/) ||
            html.match(/itemprop="datePublished" content="([^"]+)"/);
  if (!m) return "Date not found";
  const d = new Date(m[1]);
  cache[url] = d.toLocaleString(undefined, {
    year: "numeric", month: "long", day: "numeric",
    hour: "2-digit", minute: "2-digit"
  });
  return cache[url];
}

let current = null;

document.addEventListener("mouseover", async (e) => {
  const link = e.target.closest("a#thumbnail, a#video-title-link, a.yt-lockup-view-model-wiz__content-image");
  if (!link || !link.href.includes("/watch")) return;
  if (!tip) makeTip();

  current = link.href;
  const rect = link.getBoundingClientRect();
  tip.style.left = rect.left + "px";
  tip.style.top = Math.max(rect.top - 34, 4) + "px";
  tip.textContent = "Loading...";
  tip.style.display = "block";

  const date = await getDate(link.href);
  if (current === link.href) tip.textContent = date;
});

document.addEventListener("mouseout", (e) => {
  if (e.target.closest("a#thumbnail, a#video-title-link, a.yt-lockup-view-model-wiz__content-image") && tip) {
    tip.style.display = "none";
    current = null;
  }
});