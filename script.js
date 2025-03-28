
document.getElementById('dark-toggle').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

function fetchFeed() {
  fetch('https://www.infinitrixnews.com/feeds/posts/default/-/News?alt=json')
    .then(res => res.json())
    .then(data => {
      const feed = document.getElementById('news-feed');
      feed.innerHTML = '';
      data.feed.entry.slice(0, 10).forEach(entry => {
        const title = entry.title.$t;
        const link = entry.link.find(l => l.rel === 'alternate').href;
        const item = document.createElement('div');
        item.innerHTML = `<a href="${link}" target="_blank">${title}</a>`;
        feed.appendChild(item);
      });
    });
}

function fetchCategories() {
  fetch('https://www.infinitrixnews.com/feeds/posts/default?alt=json')
    .then(res => res.json())
    .then(data => {
      const cloud = document.getElementById('category-cloud');
      const labels = new Set();
      data.feed.entry.forEach(entry => {
        if (entry.category) {
          entry.category.forEach(cat => labels.add(cat.term));
        }
      });
      cloud.innerHTML = '';
      labels.forEach(label => {
        const tag = document.createElement('span');
        tag.textContent = label;
        tag.onclick = () => {
          window.location.href = `https://www.infinitrixnews.com/search/label/${encodeURIComponent(label)}`;
        };
        cloud.appendChild(tag);
      });
    });
}

fetchFeed();
fetchCategories();
setInterval(fetchFeed, 300000); // 5 minutes refresh


// Global error handler for debugging fetch/script errors
window.addEventListener('error', function(e) {
    console.error('Fetch or script error:', e);
});
