const path = require("path");
const express = require("express");
const hbs = require("hbs");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;


const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(path.join(__dirname, "../public")));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    firstName: "Mustapha",
    lastName: "Oyenuga",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    firstName: "Mustapha",
    lastName: "Oyenuga",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    helpText: "This is all the help you will be getting",
    firstName: "Mustapha",
    lastName: "Oyenuga",
  });
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You need to provide an address",
    });
  }

  forecast(req.query.address, (error, data) => {
    if (error) {
      return res.send({
        error: error,
      });
    }
    const {
      weather_descriptions,
      temperature,
      name,
      region,
      country,
      feelslike,
    } = data;
    res.send({
      forecast: `The weather is ${weather_descriptions[0]}. It is currently ${temperature} degrees but it feels like ${feelslike} degrees out`,
      location: `${name}, ${region}, ${country}`,
      address: req.query.address,
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "OOPS!!!",
    errorMessage: "Help Page not found",
    firstName: "Mustapha",
    lastName: "Oyenuga",
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    title: "OOPS!!! 404",
    errorMessage: "Page not found",
    firstName: "Mustapha",
    lastName: "Oyenuga",
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
