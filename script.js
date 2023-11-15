const apiKey = 'd3c39f57206d5904890771c822ffaac3';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

// captura del evento click
const boton = document.querySelector("button");
boton.addEventListener("click",()=> capturarclik());

function capturarclik(){
    const ciudad_in = document.querySelector('input').value;
    const url = apiUrl + ciudad_in + "&appid=" + apiKey;
    const respuesta = ApiWithAxios(url);
    DatosApi(respuesta);
}

async function ApiWithAxios(url){

    //esconder error 
    const errorElement = document.querySelector(".error");
    errorElement.style.display = "none";

    try{
        const resp = await axios.get(url);
        console.log(`se completó correctamente: ${resp.status}`);
        return await resp.data;
    }
    catch(error){
        console.log(`Falló : ${error.message}`);
        document.querySelector('.weather').style.display = 'none';
        const errorElement = document.querySelector(".error");
        errorElement.style.display = "block";
    }
}

async function DatosApi(resp){
    const resApi = await resp;
    const clima = resApi.weather[0].main;

    const temperatura = resApi.main.temp;
    const humedad = resApi.main.humidity;
    const viento = resApi.wind.speed;
    const City = resApi.name;

    document.querySelector('.weather').style.display = 'block';
    
    document.querySelector('.temp').textContent =`${temperatura}°C`;
    document.querySelector('.city').textContent = City;
    document.querySelector('.humidity').textContent = `${humedad}%`;
    document.querySelector('.wind').textContent = `${viento}km/h`;

    // Despliegue del Icono adecuado
    var weatherIcon = document.querySelector('.weather-icon');
    
    switch (clima) {
        case "Clouds":
            weatherIcon.src = 'images/clouds.png';
          break;
        case "Clear":
            weatherIcon.src = 'images/clear.png';
          break;
        case "Rain":
            weatherIcon.src = 'images/rain.png';
            break;
        case "Drizzle":
            weatherIcon.src = 'images/drizzle.png';
            break;
        case "Mist":
            weatherIcon.src = 'images/mist.png';
            break;
        default:
            weatherIcon.src = 'images/rain.png';
      }
}