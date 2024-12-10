"use client";
import React, { useState } from "react";
import axios from "axios";
import { FaSun, FaCloudRain, FaSnowflake, FaCloud } from "react-icons/fa";

const Weather_data = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-extrabold mb-4">Weather App</h1>
      <div className="flex space-x-4 mb-6">
        <input type="text" placeholder="Enter City" />
        <button>Check Weather</button>
      </div>
    </div>
  );
};

export default Weather_data;
