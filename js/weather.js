
// for icons https://github.com/darkskyapp/skycons
// for weather api https://darksky.net/dev/docs



let longitude;
let latitude;
let temperatureDescription = document.querySelector(".description");
let temperatureClass = document.querySelector(".temperature");
let temperatureIcon = document.querySelector(".icon");
let temperatureIconId = document.querySelector("#icon");
let temperatureTimezone = document.querySelector(".timezone");
// let appears_temperature = document.querySelector(".appears_temperature");

if(navigator.geolocation) {
	navigator.geolocation.getCurrentPosition((position)=>{

		console.log(position);

		latitude = position.coords.latitude;
		longitude = position.coords.longitude;

		const proxy = "https://cors-anywhere.herokuapp.com/";
		const apiUrl = `${proxy}https://api.darksky.net/forecast/4f86864178241fdd759651801b0efa35/${latitude},${longitude}`;

		fetch(apiUrl)
			.then(response=>{
				return response.json();
				// console.log(response.json());
			})
			.then(data=> {
				console.log(data);
				temperatureTimezone.textContent = data.timezone;
				const {temperature, apparentTemperature, humidity, summary, icon,} = data.currently;

				temperatureClass.textContent = temperature;
				setIcons(icon, temperatureIconId);
				// appears_temperature.textContent = "Appears "+apparentTemperature;
				temperatureDescription.textContent = summary;
			})


	});
}


function setIcons(icon, iconId){
	const skycons = new Skycons({color: 'white'});
	let currentIcon = icon.replace(/-/g, '_').toUpperCase();
	skycons.play();
	return skycons.set(iconId, Skycons[currentIcon]);
}


