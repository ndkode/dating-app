## Dating App

The service is built using a structure:

Models: the model determines how a database is structured, defining a section of the application that interacts with the database.

Controllers: interacts with the model and serves the response and functionality to the view. When an end user makes a request, it’s sent to the controller, which interacts with the database.

Services: a separate layer between the controllers and models. They encapsulate business logic that is independent of the presentation layer (views) and provide a cleaner separation of concerns.

Repositories: Specifically, repositories are often used within the service layer to handle data access and persistence. They provide an abstraction layer for interacting with the database or other data sources.

## Installation
Prerequisites:

Node.js and npm (or yarn) installed on your system.

Installation using yarn:
```bash
  yarn install
```


    
## Run Locally


Start the server

```bash
  yarn start
```


## Documentation

![App Screenshot](https://raw.githubusercontent.com/ndkode/dating-app/main/docs/ERD.png)

[Documentation](https://linktodocumentation)


## Tech Stack

**Server:** Node, Express, Typescript, Inversify, mongoDB, jwt
