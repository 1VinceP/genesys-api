document.getElementById('search-result').innerText = 'Use the searchbar above to get results.';

async function tryIt() {
	const el = document.getElementById('search-result');
	el.innerText = 'Fetching...';

	const category = document.getElementById('select-api').value;
	const search = '/' + document.getElementById('input-api').value;
	console.log(category, search);

	try {
		const result = await fetch(`http://genesysapi.herokuapp.com/api/${category}${search}`, { method: 'GET' });
		const data = await result.json();
		el.innerHTML = `<pre>${JSON.stringify(data, undefined, 2)}</pre>`;
	} catch (err) {
		el.innerText = 'Fetch failed.';
		setTimeout(() => {
			el.innerText = 'Use the searchbar above to get results.';
		}, 2000);
	}
}
