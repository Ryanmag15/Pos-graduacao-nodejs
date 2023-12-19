#!/bin/bash

# Navigate to the backend directory
cd back
npm install
npx nodemon serverex.js &
# Sleep for a while to ensure backend is up before starting the frontend
sleep 10

# Navigate to the frontend directory
cd ../front
npm install
npm start
