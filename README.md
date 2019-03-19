## Trello Clone: Front End

This React web app was deisgned to be the responsive front-end for my final project at Flatiron School. It is designed to be my take on the popular web based list making application which gives you a visual representation of a project you are working on. 

## Contents

- [Libraries](#libraries)
- [Installation](#installation)
- [Structure](#structure)
- [Components](#components)
- [User Accounts](#user-accounts)
- [Future Development](#future-development)

## Libraries & Middleware

Trello was built using [create-react-app](https://github.com/facebook/create-react-app) and comes with the dependencies therein. [Redux](https://github.com/reduxjs/redux) is used for state management, and the file structure is arranged accordingly; see below. [React Materialize](https://github.com/react-materialize/react-materialize) manages the display. [Semantic UI](https://github.com/Semantic-Org/Semantic-UI-React) is used to help with functionality when organizing your own boards. [React Router](https://github.com/ReactTraining/react-router) handles component rendering and navigation based on the URL/browse history.

## Installation 

To get started with Trello, fork this repository and clone it to your hard drive. CD into the folder and run ```npm install```. Once the dependencies have been installed, you can run ```npm start``` to get your app running. For more information about how the back-end is structured, visit [this](https://github.com/d-collins2/Trello-Backend) repository.

## Structure

The top-level folder of Trello includes a `public` folder, which holds the `index.html` file where the app is officially rendered by React, an `src` folder which holds the application itself, a `design` folder which holds [Semantic UI's](https://github.com/Semantic-Org/Semantic-UI-React) functionality, and then a few other files: .gitignore, README, and package.json. 

The `src` folder includes five main folders: `redux`, handles the Redux logic responsible for the app's state management, `containers`, which organizes the top-level components which display lower-level components,  `components`, which organizes the bulk of the app's logic and content which needs to be rendered in their specific containers, `forms`, which organizes the different types of form components used in the app, `index.js` handles how the app is mounted into the `index.html` file in the top-level folder. 

## Containers
My app is composed of 7 container components: 

### boardContainer 

This component is used to render the users boards which are created through the component `board.js`.  

### boardPage 

This component is responsible for the main functionality of the app. It is used to render the `list.js` and `task.js` associated with the current `board.js` being displayed. 

### homePageUser 

This component is responsible for the homepage which is seen on login. It renders the users associated `boardContainer.js`. The `rightToolBar.js` renders the teams associated with the user as well as a form to create a new team.

## Redux

