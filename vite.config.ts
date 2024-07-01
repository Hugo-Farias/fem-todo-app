import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Set to 'true' or your local network IP address
    port: 5173, // Default port or specify another port
  },
});
