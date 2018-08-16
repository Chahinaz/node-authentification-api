# Authentication-api

Presentation
```bash
This repository was first created to implement an API for a NuxtJs project.
It uses NodeJs, Express and MongoDB to create our RESTful-api.
    
```
Packages and added libs
```bash
body-parser: NodeJs body parsing middleware
jsonwebtoken: JWT implementation
passport: Express-compatible authentication middleware for NodeJs
passport-jwt: passport strategy to authentication with JWT
passport-local: passport strategy for authentication with username and password
crypt-js: JS lib of crypto standars
bcryptjs: as crypt-js, allow us to hash password
morgan: http request logger middleware
nodemon: to start the server
cors: for http access
```

Approach
```bash
    Set folders and npm init
    Install packages:
        npm install body-parser jsonwebtoken passport passport-jwt bcrypt morgan [...] --save 
    config/main.js:
        Setup required packages
    config/passport.js:
        Setup local authentication 
    controllers/authentication.js:
        Setup all authentication functions and structure: register, login, reset password...
    models/user.js:
        Setup an user model, with mongoose schema and methods
    index.js:
        Main backend file, with database connection, cors and body parsing; call the 'router' file.
    router.js:
        Contains all the routes.
```
