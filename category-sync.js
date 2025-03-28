
document.addEventListener('DOMContentLoaded', function () {
  const blogURL = "https://www.infinitrixnews.com/feeds/labels/default?alt=json";
  fetch(blogURL)
    .then(res => res.json())
    .then(data => {
      const labels = data.feed.category || [];
      const labelList = document.getElementById('label-list');
      labelList.innerHTML = labels.map(label => 
        `<span>${label.term}</span>`
      ).join('');
    })
    .catch(err => console.error('Label sync failed:', err));
});
