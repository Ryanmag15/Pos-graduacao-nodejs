#!/bin/bash

# Navigate to the backend directory
cd back

npm install

npm start &

cd front

npm install

npm start
