import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "./", // ✅ ensures assets load correctly on Netlify
});
// This configuration file sets up Vite with React and Tailwind CSS for the Fitness Buddy project.
// The base option is set to "./" to ensure that assets load correctly when deployed on platforms like Netlify.
// The react plugin enables React support, while the tailwindcss plugin integrates Tailwind CSS for styling.
// This setup allows for a modern development experience with fast builds and hot module replacement.
// The configuration is optimized for production builds and ensures compatibility with various deployment environments.
// The use of defineConfig helps in providing type safety and better IntelliSense support in IDEs