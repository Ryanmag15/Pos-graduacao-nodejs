    #!/bin/bash

    # Navigate to the backend directory
    cd back
    npm install
    npx nodemon serverex.js &

    cd front
    npm install
    npm start
