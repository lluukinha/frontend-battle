# Welcome to Frontend-Battle!

Hi! Recently i was needing to study **C#** in order to create a simple backend api using **Sql Server** on the database side. After finishing it, i was thinking... What would be the best frontend framework to do this project?
As I am doing this **C#** project to study, I decided to create the frontend in the three most popular frameworks, so its made on **Angular 11**, **React** and **Vue**.
To test it locally, I think the frontend part would be easy. But the backend would need some work to do.

# Backend

The backend was made with **.NET Core Web Api & SQL Server** .
You will need to install **VS Studio 2019**, **Sql Server** and **SSMS (Sql Server Management Studio)** .
After everything being installed, open the **Sql Server** and run the **.sql** file attached on this repository to create the database and necessary tables.
After that just open the **VS Studio** project and start the debug will be enough to run.

# Frontend

As i am a professional **VueJs** developer, i assume **React** and **Angular** projects would need some refactor from most experienced developers, but for this project i thought was simple enough to use the particulatities from each framework.
I was able to use Props, Emits, run initial method (mounted, ngInit, componentDidMount) and I used Axios on React and Vue to do HTTP Requests, in Angular, it was not needed because the framework delivers a very good HTTP service inside it.

##### Dont forget to do `npm install` in each one of them.

## Angular

This project was generated with  [Angular CLI](https://github.com/angular/angular-cli)  version 11.2.1.

#### - Development server

Run  `ng serve`  for a dev server. Navigate to  `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

#### - Build

Run  `ng build`  to build the project. The build artifacts will be stored in the  `dist/`  directory. Use the  `--prod`  flag for a production build.

## React

This project was bootstrapped with  [Create React App](https://github.com/facebook/create-react-app).

#### -Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.  
Open  [http://localhost:3000](http://localhost:3000/)  to view it in the browser.

The page will reload if you make edits.  
You will also see any lint errors in the console.

#### `npm run build`

Builds the app for production to the  `build`  folder.  
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.  
Your app is ready to be deployed!

## Vue

#### - Compiles and hot-reloads for development
```npm run serve```
#### - Compiles and minifies for production
```npm run build```