import { defineConfig } from 'vite'
import path from 'path'; 
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'; 
// dotenv.config({path:"../.env"})


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build:{
    outDir:'dist'
  }, 
  
  server:{
    port:3000, 
    proxy:{
      '/api':{
        
        target: process.env.VITE_BE_URL, 
        changeOrigin:true, 
      }
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
