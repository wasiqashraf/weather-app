window.addEventListener('load', ()=> {
     let lat;
     let long;
     let temperature_degree = document.querySelector('#temperature');
     let temperature_summary = document.querySelector('.summary span');
     let time_zone = document.querySelector('#timeZone');
     let current_time = document.querySelector('#time');
     let wind_speed = document.querySelector('#windSpeed');
     let atmosphere_pressure = document.querySelector('#atmospherePressure');
     let ozone_level = document.querySelector('#ozoneLevel');
     let temperature_unit = document.querySelector('#temperatureUnit');
     let temperature_section = document.querySelector('.temperatureSection');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            lat = position.coords.latitude;
            long = position.coords.longitude;

            const proxy = `https://cors-anywhere.herokuapp.com/`;
            const api = `${proxy}https://api.darksky.net/forecast/2b33db5c4c7840c730207e6ef2e98f24/${lat},${long}`;
            
            fetch(api)
                .then(response =>{
                    return response.json()
                })
                .then(data =>{
                    const {temperature, icon, summary, time, windSpeed, pressure, ozone} = data.currently;
                    //Icon
                    setIcons(icon, document.querySelector(".icon"));
                    //Convert Unix timestamp to time
                    currentTime(time);
                    //Temperature formula
                    let celsius = (temperature-32)*5/9;
                    //Temperature conversion 
                    temperature_section.addEventListener('click',()=>{
                        if(temperature_unit.textContent === 'F'){
                            temperature_unit.textContent = 'C';
                            temperature_degree.textContent = Math.floor(celsius);
                        }
                        else{
                            temperature_unit.textContent = 'F';
                            temperature_degree.textContent = temperature;
                        }
                    });
                    //Updating DOM Elements
                    temperature_degree.textContent = temperature;
                    temperature_summary.textContent = summary;
                    time_zone.textContent = data.timezone;
                    wind_speed.textContent = windSpeed;
                    atmosphere_pressure.textContent = pressure;
                    ozone_level.textContent = ozone;
                });
        });
    } 
    
    function setIcons(icon, iconID){
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
    
    function currentTime(time){
        var date = new Date(time*1000);
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        var seconds = "0" + date.getSeconds();
        var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        current_time.textContent = formattedTime;
    }
});