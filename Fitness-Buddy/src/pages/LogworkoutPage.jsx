import React, { useState, useEffect } from "react";
import "../styles/LogWorkout.css";

function LogWorkoutPage() {
  const [workoutList, setWorkoutList] = useState([]);
  const [newWorkoutName, setNewWorkoutName] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  // ✅ Load existing workouts from localStorage
  useEffect(() => {
    const savedWorkouts = JSON.parse(localStorage.getItem("workoutList")) || [];
    setWorkoutList(savedWorkouts);
  }, []);

  // ✅ Save workouts & summary to localStorage
  useEffect(() => {
    if (workoutList.length === 0) return;
    
    localStorage.setItem("workoutList", JSON.stringify(workoutList));

    const totalWorkouts = workoutList.reduce(
      (count, w) => count + w.exercises.length,
      0
    );
    const totalCalories = workoutList.reduce(
      (sum, w) =>
        sum +
        w.exercises.reduce(
          (exSum, ex) =>
            exSum +
            ex.sets.reduce((s, set) => s + set.reps * set.weight * 0.1, 0),
          0
        ),
      0
    );

    let progressData = JSON.parse(localStorage.getItem("workoutData")) || [];
    if (progressData.length === 0) {
      progressData.push({ totalWorkouts, totalCalories });
    } else {
      progressData[progressData.length - 1] = { totalWorkouts, totalCalories };
    }
    localStorage.setItem("workoutData", JSON.stringify(progressData));
  }, [workoutList]);

  // ✅ Add Workout
  function addWorkout() {
    if (!newWorkoutName.trim()) return;
    const newWorkout = {
      id: Date.now(),
      name: newWorkoutName.trim(),
      exercises: [],
    };
    setWorkoutList([...workoutList, newWorkout]);
    setNewWorkoutName("");
  }

  // ✅ Delete Workout
  function deleteWorkout(id) {
    setWorkoutList(workoutList.filter((w) => w.id !== id));
  }

  // ✅ Add Exercise to a Workout
  function addExercise(workoutId, exerciseName, weight, reps, sets) {
    setWorkoutList(
      workoutList.map((w) =>
        w.id === workoutId
          ? {
              ...w,
              exercises: [
                ...w.exercises,
                {
                  id: Date.now(),
                  name: exerciseName,
                  sets: Array.from({ length: sets }, (_, i) => ({
                    id: Date.now() + i,
                    weight: Number(weight),
                    reps: Number(reps),
                  })),
                },
              ],
            }
          : w
      )
    );
  }

  return (
    <div className="workout-logger">
      {/* ✅ NAVBAR */}
      <nav className="navbar log-workout-navbar">
        <div className="logo">🏋️ MyFitnessApp</div>
        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>
        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/LoginPage">Login</a>
          </li>
          <li>
            <a href="/LogWorkoutPage">Log Workout</a>
          </li>
          <li>
            <a href="/Searchpage">Search</a>
          </li>
          <li>
            <a href="/ProgressPage">Progress</a>
          </li>
          <li>
            <a href="/ProfilePage">Profile</a>
          </li>
        </ul>
      </nav>

      <h1>Workout Logger</h1>

      {/* ✅ Add Workout */}
      <div className="add-workout-form">
        <input
          type="text"
          placeholder="Enter workout name (e.g. Chest Day)..."
          value={newWorkoutName}
          onChange={(e) => setNewWorkoutName(e.target.value)}
        />
        <button className="add-workout-btn" onClick={addWorkout}>
          ➕ Add Workout
        </button>
      </div>

      {/* ✅ Workout List */}
      {workoutList.map((workout) => (
        <div key={workout.id} className="workout-block">
          <div className="workout-header">
            <h2>{workout.name}</h2>
            <button
              className="delete-btn"
              onClick={() => deleteWorkout(workout.id)}
            >
              ❌
            </button>
          </div>

          {/* ✅ Exercises */}
          {workout.exercises.map((exercise) => (
            <div key={exercise.id} className="exercise-block">
              <h3>🏋️ {exercise.name}</h3>
              {exercise.sets.map((set) => (
                <div key={set.id} className="set-row">
                  <div>{set.weight} kg</div>
                  <div>{set.reps} reps</div>
                </div>
              ))}
            </div>
          ))}

          {/* ✅ Add Exercise Form */}
          <AddExerciseForm
            onAdd={(n, w, r, s) => addExercise(workout.id, n, w, r, s)}
          />
        </div>
      ))}
    </div>
  );
}

// ✅ Sub-component: Add Exercise Form
function AddExerciseForm({ onAdd }) {
  const [exerciseName, setExerciseName] = useState("");
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [sets, setSets] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!exerciseName || !weight || !reps || !sets) return;
    onAdd(exerciseName, weight, reps, sets);
    setExerciseName("");
    setWeight("");
    setReps("");
    setSets("");
  }

  return (
    <form className="add-exercise-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Exercise Name"
        value={exerciseName}
        onChange={(e) => setExerciseName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Weight (kg)"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
      />
      <input
        type="number"
        placeholder="Reps"
        value={reps}
        onChange={(e) => setReps(e.target.value)}
      />
      <input
        type="number"
        placeholder="Sets"
        value={sets}
        onChange={(e) => setSets(e.target.value)}
      />
      <button type="submit">Add Exercise</button>
    </form>
  );
}

export default LogWorkoutPage;
