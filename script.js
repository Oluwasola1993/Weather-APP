const apiKey = "426a97b217b4faa96df05b51540b723b"
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.getElementById('inp');
const searchBtn = document.getElementById('search');
let err = document.getElementById('error')
let errNw = document.getElementById('errorNew')

function checkWeather(city){
    let response =  fetch(apiUrl + city + `&appid=${apiKey}`);
    if(searchBox.value == ""){
        err.style.display = "block";
        document.querySelector('.weather').style.display = "none";
        searchBox.value = "";
        setTimeout(()=>{
            err.style.display= "none"
        }, 4000);
    } else{
         response.then(result)
         .then(result => result.json())
         .then(data =>{
             console.log(data);

             if (data.cod == 404) {
                errNw.style.display = "block";
                err.style.display = "none";
                document.getElementById('result').style.display = "none";
                document.querySelector('.weather').style.display = "none";
                setTimeout(()=>{
                    errNw.style.display= "none";
                }, 4000);

                searchBox.value = ""
             } else{
                 document.getElementById("city").innerHTML = data.name;
                 document.getElementById("temp").innerHTML = Math.round(data.main.temp) + "℃";
                 document.getElementById("hum").innerHTML = data.main.humidity + "%";
                 document.getElementById("win").innerHTML = data.wind.speed + " km/h";  
                 document.getElementById("result").innerHTML = data.weather[0].main
                 
                 const iconCode = data.weather[0].icon;
                 displayWeatherIcon(iconCode);
                       
                 searchBox.value = ""
                 
                 document.getElementById('result').style.display ="block";
                 document.querySelector('.weather').style.display = "block";
                 document.querySelector('.error').style.display = "none";
             }
         });
    } 
}
searchBtn.addEventListener("click", () =>{
    checkWeather(searchBox.value)
})

function displayWeatherIcon(iconCode) {
    const iconElement = document.getElementById('weatherIcon');
    const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;
    iconElement.src = iconUrl;
  }
  