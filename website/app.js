const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&appid=aaabf30d2cec90cf74b825a91149939d&units=metric";
const button = document.getElementById("generate");
button.addEventListener("click", function () {
  const zip = document.getElementById("zip").value;
  getData(baseURL, zip, apiKey)
    .then(function (data) {
      postData("/add", data);
    })
    .then(function () {
      updateUI();
    });
});

const getData = async (baseURL, zip, key) => {
  try {
    const res = await fetch(baseURL + zip + key);
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

const postData = async (url, data) => {
  const Request = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};

const updateUI = async () => {
  const dbServer = "http://localhost:3000/db";
  const feelings = document.getElementById("feelings").value;
  const res = await fetch(dbServer);
  try {
    const result = await res.json();
    document.getElementById("name").innerHTML = result.name;
    document.getElementById("temp").innerHTML = result.main.temp + "&degC";
    document.getElementById("description").innerHTML = result.weather[0].description;
    document.getElementById("content").innerHTML = feelings;
  } catch (error) {
    console.log("error", error);
  }
};
