#!/bin/bash

cd back
npm install
npm install -g nodemon
npx nodemon serverex.js 

sleep 5

cd ../front
npm install
npm start
