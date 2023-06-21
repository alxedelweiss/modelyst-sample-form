# Modelyst Sample Form
#### UI Developer Interview Challenge - Scientific Sample Registration Form with Optional Python API

## <img src="https://media2.giphy.com/media/QssGEmpkyEOhBCb7e1/giphy.gif?cid=ecf05e47a0n3gi1bfqntqmob8g9aid1oyj2wr3ds3mg700bl&rid=giphy.gif" width ="25"> Tech Stack & Dependencies
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)
![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)

Dear Brian and Michael,

This repository contains my work on the coding challenge. It is a monorepo - you can navigate to the frontend application in the `client` folder and the backend application in the `server` folder. The `SQLite` database is living in the `root` folder.

### My goal was to implement your preferred tech stack:

❖ The frontend application is built with `NextJS` and `TypeScript`

❖ I utilized `MaterialUI` components for every aspect of the user interface

❖ I attempted to incorporate `React Query` and had success with fetching, but ultimately decided to revert to a solution with `useEffect`

❖ The backend application is built with `FastAPI`

❖ Data is persisted in a `SQLite` db instance

❖ Models were built with `SQLAlchemy`

❖ Additionally, I related the `samples` to a `user`. When a user is fetched, a collection of all samples belonging to the user are included in an array.

### Result:
![scientific_sample_registration_form](https://github.com/agalev/modelyst-sample-form/assets/17399666/201aef30-558b-48e5-8314-ba0efc086565)


## <img src="https://media2.giphy.com/media/QssGEmpkyEOhBCb7e1/giphy.gif?cid=ecf05e47a0n3gi1bfqntqmob8g9aid1oyj2wr3ds3mg700bl&rid=giphy.gif" width ="25"> Features

### On the `client`:

❖ Responsive and accessible design

❖ Correct types implemented for every aspect of data

❖ Tooltips displayed when a component is focused or hovered over

❖ Validations on every field, covering types and logic, along with error feedback indicating the problem

❖ Form submission function that prevents POST-ing of invalid or incomplete data

❖ Light/Dark theme switch

❖ Toast notifications outputting error or success messages

### On the `server`:

❖ Created `users` and `samples` tables

❖ Created the following API routes:

![API routes](https://github.com/agalev/modelyst-sample-form/assets/17399666/fb8d74d1-66ab-41c9-bce6-6b552553b97b)

❖ Implemented backend validation logic allowing only entries with unique `sample_label` and appropriate inner/outer diameter values

❖ Errors are handled with an appropriate HTTP response code and a message is returned to the `client`, then displayed in a toast

## <img src="https://media2.giphy.com/media/QssGEmpkyEOhBCb7e1/giphy.gif?cid=ecf05e47a0n3gi1bfqntqmob8g9aid1oyj2wr3ds3mg700bl&rid=giphy.gif" width ="25"> Instructions

First, clone the repo on your machine with `git clone https://github.com/agalev/modelyst-sample-form.git` or if you have the GitHub CLI installed - `gh repo clone agalev/modelyst-sample-form`

For `client`:
1. Navigate to the client folder `cd client`
2. Install the dependencies with `npm install`
3. Run the development environment with `npm run dev`
4. Navigate to [http://localhost:3000](http://localhost:3000) in your browser to see the result

*Note that users won't be fetched until we boot the server*

For `server`:
1. Navigate to the root folder where `/server` is
2. Install the dependencies manually with `pip` -> `pip install fastapi` `pip install "uvicorn[standard]"` `pip install sqlalchemy`

3. Make sure you are still in the `root` folder. Run command `uvicorn server.main:app --reload` to start the server
   
4. Navigate back to your browser at [http://localhost:3000](http://localhost:3000) and refresh the page. The fetched users will correctly load in the dropdown menu and the form will be submittable

*Note that the `pip install` command installs the modules globally. You might already have the packages*
