# Node.JS & Postgres + React boilerplate

This repository contains the boilerplate for creating a full application using the Javascript Stack. The arhitecture is as following:
- The backend written with `Node.JS` using
    - `Express` as the web framework using an 3-Layer arhitecture
    - `Sequlize` as the ORM for accessing the `Postgress` database
    - `Inversify.JS` for IOC (inversion of control) used for putting all of this together
    - `Puppeteer` & `Cheerio` used for scraping instagram in order to get certain pictures
- The frontend written with `React` which includes
    - Simple authentication & authorization using `React Contexts`
    - Form validation using `react-form-hooks`

# App overview & Features
- There are 2 types of users, `Internal` and `External`
    - `Internal` users are created at sign up
    - `External` users are created by `Internal` users 

- `External` users will have access to a simple notepad where they can write a title and description

- `Internal` users
    - can create `External` users
    - can delete `External` users they created
    - can view the notes of the `External` users they created. The available info is: `username`, `note description`, `note title`, `note last update`

- All the users (either created or registered) will feature an instagram image by finding the first picture that has the hashtag `#username` (if available).

- At login the user has the option for the browser to remember the session or not.

# How to start ?

- run `docker-compose up`. This will start the postgress db, will install deps and start the backend and build the frontend and start an nginx container with it's dist/

- all the env variables can be seen in `docker-compose.yml`, also they can be set using the `.env` files from both be and fe (see `.env.example`)

- in order to actually use the app you will need to run some migrations. So after starting the `db` docker container (by running `docker-compose up`), do `cd backend` and then `npm run migrate:up`. This will esentially execute the necessary migrations. This will work only on the default, exposed `5432` port.
