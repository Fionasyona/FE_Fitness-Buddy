import React, { useState } from "react";

const WorkoutLogger = () => {
  const [workouts, setWorkouts] = useState([
    {
      id: 1,
      name: "Bench Press",
      notes: "",
      sets: []
    },
    {
      id: 2,
      name: "Overhead Press",
      notes: "",
      sets: []
    },
  ]);

  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");

  
  const [newSet, setNewSet] = useState({ note: "", weight: "", reps: "" });
  const [activeWorkoutId, setActiveWorkoutId] = useState(null);

  // adding, removing, saving and editing workouts

  const handleAddWorkout = () => {
    const newWorkout = {
      id: Date.now(),
      name: "New Workout",
      notes: "",
      sets: [],
    };
    setWorkouts([...workouts, newWorkout]);
  };

  const handleRemoveWorkout = (id) => {
    setWorkouts(workouts.filter((workout) => workout.id !== id));
  };

  const handleEditWorkout = (id, name) => {
    setEditingId(id);
    setEditName(name);
  };

  const handleSaveWorkout = (id) => {
    setWorkouts(
      workouts.map((workout) => (workout.id === id ? { ...workout, name: editName } : workout))
    );
    setEditingId(null);
  };

  //togglesetdone changes done status(true/false)of one specific set workout- without changing anything else
  const handleAddSet = (workoutId) => {
    if (!newSet.label || !newSet.weight || !newSet.reps) return;
    const toggleSetDone = (workoutId, setIndex) => {
  setWorkouts(prevWorkouts =>
    prevWorkouts.map(workout => {
      if (workout.id !== workoutId) {
        return workout; // leave this workout unchanged
      }

      // Update only the targeted set
      const updatedSets = workout.sets.map((set, index) => {
        if (index === setIndex) {
          return { ...set, done: !set.done };
        }
        return set;
      });

      return { ...workout, sets: updatedSets };
    })
  );
};

