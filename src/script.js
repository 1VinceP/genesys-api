document.getElementById('search-result').innerText = 'Use the searchbar above to get results.';

async function tryIt() {
	// http://swapi.dev/api/planets/1/
	// fetch('http://genesysapi.herokuapp.com/api/talents', { method: 'GET' })
	//   .then(res => console.log(res));
	const el = document.getElementById('search-result');
	el.innerText = 'Fetching...';

	const category = document.getElementById('select-api').value;
	const search = '/' + document.getElementById('input-api').value;
	console.log(category, search);

	try {
		const result = await fetch(`http://localhost:8080/api/${category}${search}`, { method: 'GET' });
		const data = await result.json();
		el.innerHTML = `<pre>${JSON.stringify(data, undefined, 2)}</pre>`;
	} catch (err) {
		el.innerText = 'Fetch failed.';
		setTimeout(() => {
			el.innerText = 'Use the searchbar above to get results.';
		}, 2000);
	}
}
