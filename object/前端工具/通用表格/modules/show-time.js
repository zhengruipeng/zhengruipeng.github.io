document.addEventListener("DOMContentLoaded", function main() {
	const dateTimeDisplay = document.getElementById("datetime-display");
	setInterval(function() {
		dateTimeDisplay.innerText = new Date().toLocaleTimeString();
	}, 1000);
})