
document.getElementById('dark-toggle').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});


function fetchFeed() {
  const url = 'https://www.infinitrixnews.com/feeds/posts/default/-/News?alt=json';
  fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`)
    .then(res => res.json())
    .then(data => {
      const parsed = JSON.parse(data.contents);
      const feed = document.getElementById('news-feed');
      feed.innerHTML = '';
      parsed.feed.entry.slice(0, 10).forEach(entry => {
        const title = entry.title.$t;
        const link = entry.link.find(l => l.rel === 'alternate').href;
        const item = document.createElement('div');
        item.innerHTML = `<a href="${link}" target="_blank">${title}</a>`;
        feed.appendChild(item);
      });
    })
    .catch(err => {
      document.getElementById('news-feed').innerHTML = 'Failed to load news feed.';
      console.error('Feed error:', err);
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
