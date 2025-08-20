# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Fitness Tracker App

A simple React-based fitness tracker that helps users log workouts, manage exercise sets, and track progress. The app includes a welcoming landing page, a secure login page, and a workout logging interface.

---

## Project Structure
## Pages

### 1. Welcome Page
- Acts as the landing page for the application.
- Features a visually appealing background image and introduction text.
- Contains navigation buttons/links to **Login Page** or **Sign Up** (if implemented).

### 2. Login Page
- Allows users to log into their accounts.
- Background image covers the entire page for a modern UI.
- Icons stored in `src/assets/icons` for input fields.
- Successful login redirects to **LogWorkoutPage**.

### 3. LogWorkoutPage
- Users can **add workouts** with details like exercise name, sets, and reps.
- Ability to **toggle set status** between `warmup`, `completed`, and `failed`.
- Option to **remove sets** or entire workouts.
- Styled with a transparent navbar to integrate with the background image.

### 4. ProfilePage
- View and edit personal details (weight, height, BMI, target weight).
- Toggle visibility of details.
- Account, community, and support options.

### 5. ProgressPage
- Visualize workout history and progress.
- Cards display metrics, exercises, and performance.
- Styled for readability and mobile responsiveness.

### 6. SearchPage
- Allows users to search exercises or workouts.
- Responsive layout and interactive search results.


