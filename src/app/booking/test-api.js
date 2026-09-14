fetch('https://0201243d-ed25-4b62-8a3e-c376d4eef70a.mock.pstmn.io')
  .then(res => res.json())
  .then(data => console.log("NODES PAYLOAD:", data))
  .catch(err => console.error(err));

fetch('https://0201243d-ed25-4b62-8a3e-c376d4eef70a.mock.pstmn.io')
  .then(res => res.json())
  .then(data => console.log("DEPARTURES PAYLOAD:", data))
  .catch(err => console.error(err));
