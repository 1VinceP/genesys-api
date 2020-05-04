const isDev = () => window.location.href === 'http://127.0.0.1:8080/';

document.getElementById('search-result').innerText = 'Use the search bar above to get results.';
document.getElementById('input-api').onkeyup = e => {
	document.getElementById('copy-btn').innerText = 'Copy';
	e.keyCode === 13 && search();
}

function copyUrl() {
	const baseUrl = 'https://genesysapi.herokuapp.com/api';
	const category = document.getElementById('select-api').value;
	let search = document.getElementById('input-api').value;
	search = search[0] !== '?' ? '/' + search : search;

	document.getElementById('copy-btn').innerText = 'Copied!';

	const tempInput = document.createElement('input');
	tempInput.value = `${baseUrl}/${category}${search}`.replace(' ', '%20');
	document.body.appendChild(tempInput);
	tempInput.select();
	document.execCommand('copy');
	document.body.removeChild(tempInput);
}

async function search() {
	const baseUrl = isDev() ? 'http://localhost:8080/api' : 'https://genesysapi.herokuapp.com/api';
	const el = document.getElementById('search-result');
	el.innerText = 'Fetching...';

	const showIcons = document.getElementById('search-checkbox').checked;
	const category = document.getElementById('select-api').value;
	let search = document.getElementById('input-api').value;
	search = search[0] !== '?' ? '/' + search : search;

	try {
		const result = await fetch(`${baseUrl}/${category}${search}`, {
         method: 'GET',
         'Content-Type': 'application/json',
      });

      const data = await result.json();
      const dataString = `<pre>${JSON.stringify(data, undefined, 2)}</pre>`;

		el.innerHTML = showIcons ? replaceIcons(dataString) : dataString;
	} catch (err) {
		el.innerText = 'Fetch failed. Either your query was entered incorrectly or the item you searched for does not exist in our collection.';
	}
}

// There's a much better way of doing this, but this works for now
function replaceIcons(dataString) {
	let newData = dataString.slice(0);
	newData = newData.replace(/\[boost\]/g, '<img class="boost" src="./assets/Boost.png">');
	newData = newData.replace(/\[setback\]/g, '<img class="boost" src="./assets/Setback.png">');
	newData = newData.replace(/\[ability\]/g, '<img class="ability" src="./assets/Ability.png">');
	newData = newData.replace(/\[difficulty\]/g, '<img class="ability" src="./assets/Difficulty.png">');
	newData = newData.replace(/\[challenge\]/g, '<img class="proficiency" src="./assets/Challenge.png">');
	newData = newData.replace(/\[proficiency\]/g, '<img class="proficiency" src="./assets/Proficiency.png">');

	newData = newData.replace(/\[success\]/g, '<img class="symbol" src="./assets/Success.png">');
	newData = newData.replace(/\[advantage\]/g, '<img class="symbol" src="./assets/Advantage.png">');
	newData = newData.replace(/\[triumph\]/g, '<img class="symbol" src="./assets/Triumph.png">');
	newData = newData.replace(/\[failure\]/g, '<img class="symbol" src="./assets/Failure.png">');
	newData = newData.replace(/\[threat\]/g, '<img class="symbol" src="./assets/Threat.png">');
	newData = newData.replace(/\[despair\]/g, '<img class="symbol" src="./assets/Despair.png">');

	return newData;
}
