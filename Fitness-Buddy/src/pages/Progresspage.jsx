import React, { useState, useEffect, useRef } from "react";
import "../styles/Progresspage.css";
import {Chart as ChartJS,  LineController,
  LineElement,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineController,
  LineElement,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const sampleWorkouts = [
  {
    id: 1,
    date: "2023-06-01",
    duration: "45 min",
    exercises: [
      { name: "Bench Press", sets: 3, reps: 10, weight: "135 lbs" },
      { name: "Squats", sets: 4, reps: 8, weight: "185 lbs" },
      { name: "Pull-ups", sets: 3, reps: 12, weight: "Bodyweight" },
    ],
    calories: 420,
    type: "Strength",
  },
  {
    id: 2,
    date: "2023-06-03",
    duration: "30 min",
    exercises: [
      { name: "Running", distance: "3.5 miles", pace: "8:30 min/mile" },
      { name: "Plank", duration: "3 min" },
    ],
    calories: 380,
    type: "Cardio",
  },
];

const sampleWeightData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  data: [180, 176, 174, 172, 170, 168],
};

const sampleCalorieData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  burned: [420, 380, 450, 400, 480, 350, 500],
  consumed: [2200, 2100, 2300, 2400, 2100, 2500, 2000],
};

const sampleWorkoutFrequency = {
  labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
  data: [3, 4, 5, 6],
};

const sampleBodyComposition = {
  muscleGain: 3.2,
  fatLoss: 2.8,
};

