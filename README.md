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
```

Approach
```bash
    Set folders and npm init
    Install packages:
        npm install body-parser jsonwebtoken passport passport-jwt bcrypt morgan --save
    config/server.js:
        Setup required packages
    config/passport.js:
        Setup local authentication 
```