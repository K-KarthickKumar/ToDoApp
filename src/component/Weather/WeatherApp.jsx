import React, { useState, useEffect } from 'react';
import './Weather.css';
import WindImg from './wind.png';
import HumididtyImg from './humidity.png';
import axios from 'axios';
export default function WeatherApp() {

    const [location, setLocation] = useState("");
    const [temperature, setTemperature] = useState();
    const [imgSrc, setImgSrc] = useState("");
    const [city, setCity] = useState("");
    const [weatherDescription, setWeatherDescription] = useState("");
    const [windSpeed, setWindSpeed] = useState();
    const [humidity, setHumidity] = useState();
    const [err, setErr] = useState("");
    const[display,setDisplay] = useState(false);

    const apiKey = "aa9f05d0ff1d9d44cfc5570e6230ae13"

    function getWeatherData(location) {
        setErr("");
        if(location.length > 0){ 
            axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`)
            .then((res) => {
                setLocation(res.data.name);
                setTemperature(res.data.main.temp - 273.15);
                setImgSrc(res.data.weather[0].icon);
                setWeatherDescription(res.data.weather[0].description)
                setWindSpeed(res.data.wind.speed);
                setDisplay(true);
            })
            .catch(err => {
                setErr(err.response.data.message)})
        }
        else{
            setErr("Please Enter a city");
        }
    }

    async function getWeatherDataUsingLatandLong(lat, lon) {
        const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
        await fetch(api)
        .then((res) => res.json())
        .then((res) => {
            setLocation(res.name);
            setTemperature(res.main.temp - 273.15);
            setImgSrc(res.weather[0].icon);
            setWeatherDescription(res.weather[0].description)
            setWindSpeed(res.wind.speed);
            setHumidity(res.main.humidity);
            setDisplay(true);
        })
            .catch(err => {
                setErr(err.message);
            })
    }



    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            getWeatherDataUsingLatandLong(position.coords.latitude, position.coords.longitude);
        })
        // getWeatherData("Bengaluru");
    }, []);


    return (
        <div className='app-container'>
            <div className='weather-container'>
                <div>
                    <input className='bg-transparent border-2 border-white rounded-lg p-2 outline-none text-white' type='text' value={city} placeholder='Enter a city...' onChange={e => { setCity(e.target.value) }}></input>
                    <button className='border-2 border-white p-2 rounded-lg ml-2 text-white ' onClick={e => { getWeatherData(city) }}>Search</button>
                </div>
                {err.length > 0 ? <div style={{ color: "hsl(0 100% 37% / 1)",fontWeight:"bold" }}>{err} </div> : null}
                {display &&
                <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>

                    <div className='flex justify-center'>
                        <img src={`https://openweathermap.org/img/wn/${imgSrc}@2x.png`} style={{ color: "white" }} loading="lazy"></img>
                    </div>
                    <div style={{ textAlign: "center" }}>
                        {weatherDescription}
                    </div>
                    <div className='mt-4' style={{ textAlign: "center" }}>
                        <h4>{parseFloat(temperature).toFixed(2)}&#176;C</h4>
                    </div>
                    <div className='mt-2' style={{ textAlign: "center" }}>
                        <h3>{location}</h3>
                    </div>
                    <div className='row mt-3' style={{ display: "flex", gap: "10px" }}>

                        <div className='wind-speed col-md-5' style={{ height: "67px", width: "150px", display: "flex", gap: "5px" }}>
                            <img src={WindImg} style={{ mixBlendMode: "color-burn" }}></img>
                            <div>
                                <h6 style={{ textAlign: "center",fontSize:"smaller",fontWeight:"bold" }}>Wind Speed</h6>
                                <p style={{ textAlign: "center" }}>{Number(windSpeed * 3.6).toFixed(2)}km/hr</p>
                            </div>
                        </div>
                        <div className='humidity col-md-5' style={{ height: "67px", width: "150px", display: "flex", gap: "5px" }}>
                            <img src={HumididtyImg} ></img>
                            <div>
                                <h6 style={{ textAlign: "center",fontSize:"smaller",fontWeight:"bold" }}>Humidity</h6>
                                <p style={{ textAlign: "center" }}>{humidity}%</p>
                            </div>
                        </div>
                    </div>
                </div> } 
            </div>
        </div>
    )
}