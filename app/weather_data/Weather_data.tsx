"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSun, FaCloudRain, FaSnowflake, FaCloud } from "react-icons/fa";
import Image from "next/image";

interface WeatherData {
  coord: {
    lon: number;
    lat: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

const Weather_data = () => {
  const [country, setCountry] = useState(""); // เก็บชื่อเมืองจาก input
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null); // เก็บข้อมูลสภาพอากาศ
  const [theme, setTheme] = useState(""); // theme เริ่มต้น

  // ค่าพิกัดสำหรับกรุงเทพ
  const lat = 13.7563;
  const lon = 100.5018;

  // ดึงข้อมูลสภาพอากาศ
  const fetchWeatherData = async () => {
    const apikey = process.env.WEATHER_API; // เรียกใช้จาก .env
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}`;

    try {
      // ใช้ <WeatherData> ระบุชนิดข้อมูล
      const response = await axios.get<WeatherData>(url);
      console.log("ข้อมูลสภาพอากาศ:", response.data);

      setWeatherData(response.data); // เก็บข้อมูลใน State
      updateTheme(response.data.weather[0].main); // อัปเดตธีมตามสภาพอากาศ
    } catch (err) {
      console.error("Error fetch:", err);
      alert(`ไม่พบข้อมูล:${country}`);
    }
  };

  // เปลี่ยน theme
  const updateTheme = (weather: string) => {
    // update โดยใช้ switch case เปลี่ยน theme
    switch (weather.toLowerCase()) {
      case "clear":
        setTheme("bg-yellow-200");
        break;
      case "rain":
        setTheme("bg-blue-300");
        break;
      case "snow":
        setTheme("bg-gray-300");
        break;
      case "clouds":
        setTheme("bg-gray-500");
        break;
      default:
        setTheme("bg-blue-300");
    }
  };

  // เช็คข้อมูลโดยไม่ต้องผ่านปุ่มButton Call function แทน
  useEffect(() => {
    fetchWeatherData();
  }, []);

  //   useEffect(() => {
  //     if (weatherData) {
  //       const weatherCondition = weatherData.weather[0].main.toLowerCase();
  //       if (weatherCondition.includes("rain")) {
  //         document.body.style.backgroundColor = "#9ecae1"; // สีสำหรับฝนตก
  //       } else if (weatherCondition.includes("clear")) {
  //         document.body.style.backgroundColor = "#f7e7a9"; // สีสำหรับแดดออก
  //       } else if (weatherCondition.includes("clouds")) {
  //         document.body.style.backgroundColor = "#d3d3d3"; // สีสำหรับเมฆมาก
  //       }
  //     }
  //   }, [weatherData]);
  return (
    // ${theme} ทำให้เปลี่ยนtheme ตามสภาพอากาศ
    <div
      className={`min-h-screen flex flex-col items-center justify-center ${theme} `}
    >
      <h1 className="text-4xl font-extrabold mb-4">Weather App</h1>
      <div className="flex space-x-4 mb-6">
        <input
          type="text"
          placeholder="Enter City"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="rounded-md px-3 py-1 border-none"
        />
        <button
          onClick={fetchWeatherData}
          className="border-2 rounded-md px-3 py-1 bg-blue-200 hover:bg-blue-300"
        >
          Check Weather
        </button>
      </div>
      {weatherData ? (
        <>
          <div key={weatherData.id} className="">
            <div className="space-y-2">
              <h1>
                Location: {weatherData.name} : {weatherData.sys.country}
              </h1>
              <p>Temperature: {weatherData.main.temp} °C</p>
            </div>
            <div className="flex gap-3 items-center mt-2 ">
              <p>Weather: {weatherData.weather[0].main.toLocaleLowerCase()}</p>
              {weatherData.weather[0].main.toLocaleLowerCase() === "clear" && (
                <FaSun className="w-5 h-5 " />
              )}
              {weatherData.weather[0].main.toLowerCase() === "rain" && (
                <FaCloudRain className="w-5 h-5" />
              )}
              {weatherData.weather[0].main.toLowerCase() === "snow" && (
                <FaSnowflake className="w-5 h-5" />
              )}
              {weatherData.weather[0].main.toLowerCase() === "clouds" && (
                <FaCloud className="w-5 h-5" />
              )}
            </div>
          </div>
        </>
      ) : (
        <p>LoadingData.....</p>
      )}
    </div>
  );
};

export default Weather_data;
