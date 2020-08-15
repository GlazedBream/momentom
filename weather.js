const weather = document.querySelector(".js-weather");

const API_KEY = "2fffbe078bb72c78bcad3e5efc75a328";
const COORDS = "coords";

function getWeather(latitude, longitude) {
	fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}
		&appid=${API_KEY}&units=metric`)
	.then(function(response){
			return response.json()
		}).then(function(json){
			const temperature = json.main.temp;
			const place = json.name;
			weather.innerText = `${temperature} °C @ ${place}`;
		});
}

function saveCoords(coordsObj){
	localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
	const latitude = position.coords.latitude;
	const longitude = position.coords.longitude;
	const coordsObj = {
		latitude,
		longitude
	};
	saveCoords(coordsObj);
	getWeather(latitude, longitude);
}

function handleGeoError(){
	console.log("Can't access geo location");
}

function askForCoords(){
	navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords(){
	const loadedCoords = localStorage.getItem(COORDS);
	if(loadedCoords === null){
		askForCoords();
	} else {
		const parseCoords = JSON.parse(loadedCoords);
		getWeather(parseCoords.latitude, parseCoords.longitude);
	}
}

function init(){
	loadCoords();
}

init();