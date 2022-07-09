import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import Weathercard from "./weathercard";
import './style.css';
// a075d5dfdaa2ae37c07b2b369e987d23
// 9251425ce277f04a5dbfe4ac2f80b617  (extra api upto 100000 class free)




const Temp = () =>{
    const [searchValue, setSearchValue] = useState("New Delhi");
    const [tempInfo, setTempInfo] = useState({});

    const getWeatherInfo = async () => {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=a075d5dfdaa2ae37c07b2b369e987d23`;

            const res = await fetch(url);
            const data = await res.json();
            
            // console.log(data);
            // object destructuring

            const {temp, humidity, pressure} = data.main;
            const {main: weatherlike} = data.weather[0];
            const {name} = data;
            const {speed} = data.wind;
            const {country, sunset} = data.sys;
            // console.log(temp);

            const myNewWeatherInfo = {
                temp, 
                humidity, 
                pressure,
                weatherlike,
                name,
                speed,
                country,
                sunset,
            };

            setTempInfo(myNewWeatherInfo);

        } catch (error) {
            console.log(error);
        }
    }; 

    useEffect(() => {getWeatherInfo();}, []);

    return(
        <div className="Weather-CardFirst">
        <div className="wrap">
            <div className="search">
                <input type="search" 
                    placeholder="search..."
                    autoFocus
                    id="search" 
                    className="searchTerm"  
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}            
                />
                <button className="searchButton" type="button" 
                onClick={getWeatherInfo}>
                    Search
                </button>
            </div>
        </div>
        {/* creating the card */}
        <Weathercard tempInfo={tempInfo} />
        
        </div>
    );
};

export default Temp;
