# App overview
- There are 2 types of users, `Internal` and `External`
    - `Internal` users are created at sign up
    - `External` users are created by `Internal` users 

- `External` users will have access to a simple notepad where they can write a title and description

- `Internal` users
    - can create `External` users
    - can delete `External` users they created
    - can view the notes of the `External` users they created

- All the users (either created or registered) will feature an instagram image by finding the first picture that has the hashtag `#username` (if available).

# How to start ?

- run `docker-compose up`. This will start the postgress db, will install deps and start the backend and build the frontend and start an nginx container with it's dist/

- all the env variables can be seen in `docker-compose.yml`, also they can be set using the `.env` files from both be and fe (see `.env.example`)

- in order to actually use the app you will need to run some migrations. So after starting the `db` docker container (by running `docker-compose up`), do `cd backend` and then `npm run migrate:up`. This will esentially execute the necessary migrations. This will work only on the default, exposed `5432` port.
