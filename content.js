const cache = {};
let tip = null;
let currentLink = null;

function makeTip() {
  tip = document.createElement("div");
  Object.assign(tip.style, {
    position: "fixed",
    zIndex: 2147483647,
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
  try {
    const res = await fetch(url, { credentials: "omit" });
    const html = await res.text();
    const m = html.match(/"uploadDate":"([^"]+)"/) ||
              html.match(/"publishDate":"([^"]+)"/) ||
              html.match(/itemprop="datePublished" content="([^"]+)"/);
    if (!m) return "Date not found";
    const d = new Date(m[1]);
    cache[url] = d.toLocaleString(undefined, {
      year: "numeric", month: "long", day: "numeric",
      hour: "2-digit", minute: "2-digit"
    });
    return cache[url];
  } catch (err) {
    return "Error loading date";
  }
}

function showTip(link, text) {
  const rect = link.getBoundingClientRect();
  tip.style.left = Math.max(rect.left, 4) + "px";
  tip.style.top = Math.max(rect.top + 6, 4) + "px";
  tip.textContent = text;
  tip.style.display = "block";
}

document.addEventListener("mouseover", async (e) => {
  if (!tip) makeTip();

  const link = e.target.closest('a[href*="/watch"]');
  const inPreview = e.target.closest("ytd-video-preview");

  if (link) {
    if (link === currentLink) return;
    currentLink = link;
    showTip(link, "Loading...");
    const date = await getDate(link.href);
    if (currentLink === link) showTip(link, date);
  } else if (inPreview && currentLink) {
    // mouse is on the preview player: keep tooltip as is
    return;
  } else {
    currentLink = null;
    tip.style.display = "none";
  }
});