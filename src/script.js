const isDev = () => window.location.href === 'http://127.0.0.1:8080/';

document.getElementById('search-result').innerText = 'Use the searchbar above to get results.';
document.getElementById('input-api').onkeyup = e => e.keyCode === 13 && search()

function search() {
	isDev() ? searchDev() : searchProd();
}

async function searchProd() {
	const el = document.getElementById('search-result');
	el.innerText = 'Fetching...';

	const category = document.getElementById('select-api').value;
	const search = '/' + document.getElementById('input-api').value;

	try {
		const result = await fetch(`https://genesysapi.herokuapp.com/api/${category}${search}`, { method: 'GET' });
		const data = await result.json();
		el.innerHTML = `<pre>${JSON.stringify(data, undefined, 2)}</pre>`;
	} catch (err) {
		el.innerText = 'Fetch failed.';
		setTimeout(() => {
			el.innerText = 'Use the searchbar above to get results.';
		}, 2000);
	}
}

async function searchDev() {
	const el = document.getElementById('search-result');
	el.innerText = 'Fetching...';

	const category = document.getElementById('select-api').value;
	const search = '/' + document.getElementById('input-api').value;

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
