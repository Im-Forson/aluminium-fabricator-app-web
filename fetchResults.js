const res = await fetch('https://console.firebase.google.com/project/aluminium-fabricator-mate/overview', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ width: 4, height: 5 }),
});

const data = await res.json();
console.log(data.results);