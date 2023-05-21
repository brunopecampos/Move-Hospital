# Move-Hospital

An application made for helping hospitals make deals of non-emergencial transferences

## Installation

This project uses docker to make developers life easier.
To install docker follow these tutorials:

- Windows: install WSL https://learn.microsoft.com/en-us/windows/wsl/install. After that, proceed with linux installation.
- Linux: install docker by choosing your distribution and following the tutorial in https://docs.docker.com/engine/install/.

## Running

To run all components togheter, run:

```
docker compose up
```

To run only react (frontend), do:

```
docker compose run -p 3000:3000 -v ${PWD}/frontend:/app frontend
```

To run flask + sqlite (backend + database), do:

```
docker compose run -p 5000:5000 -v ${PWD}/backend:/app pbackend
```

In all cases, to access the frontend server open `localhost:3000` in your browser.

Open `localhost:5000` for the backend.

## Contributing

Please, for each feature, create a branch and make a pull request. Avoid pushing changes directly into the main branch.

## Aditional Information

The database schema is descripted in `backend/database/schema.sql`.

It is created by running

```
python3 backend/init_db.py
```

and its contents are located in `backend/database/datasebase.db`

## Authors

This project is part of Digital Entrepreneurship course by University and São Paulo and was made by:

- Bruno Pereira Campos
- ... Add your names ...
