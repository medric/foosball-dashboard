# Foosball dashboard
This project is a dashboard which allow the users to save and manage foosball matches results.
It was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app) and 
uses [MobX](https://mobx.js.org/) under the hood to handle state management, scalability and data reactivity through
the application.

## Functionalities
- Add participants
- Add a match result
- View the list of participants with their statistics
- View the list of matches results

## Usage & Installation 

The application is live: [https://terem-foosball.herokuapp.com/](https://terem-foosball.herokuapp.com/)

To run it locally, run:
```
  npm i
  npm run start-local
```

Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

## Test

Run ```npm test```

Launches the test runner in the interactive watch mode.<br>

## Folder Structure

The project should look like this:

```
my-app/
  README.md
  node_modules/
  package.json
  public/
    index.html
    favicon.ico
  src/
    components/
    stores/
    style/
    tests/
```