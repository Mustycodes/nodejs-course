console.log("Client Side js");

const getWeatherForecast = (location) => {
  fetch(`http://localhost:3000/weather?address=${location}`)
    .then((response) => response.json())
    .then((data) => data);
};

const weatherForm = document.querySelector("form");
const searchInput = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";
  const location = searchInput.value;

 
  fetch(`http://localhost:3000/weather?address=${location}`)
  .then((response) => response.json())
  .then((data) => {
    if (data.error) {
        messageTwo.textContent = data.error;
    } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
    }
  });
});
