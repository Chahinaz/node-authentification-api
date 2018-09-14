const AuthenticationController = require('./controllers/authentication');
const UserController = require('./controllers/user');

//Set up routes
module.exports = function(app) {
    //Home route
    app.get('/', function(req, res){
        res.send("Welcome to Chahinaz's API ~ ")
    });

    // Registration route
    app.post('/register', function(req, res){
        AuthenticationController.register(req, res)
    });

    // Login route
    app.post('/login', function(req, res){
        AuthenticationController.login(req, res)
    });

    // Login route
    app.post('/logout', function(req, res){
        AuthenticationController.login(req, res)
    });

    //All Users route
    app.get('/users', UserController.allUsers);

    //User's profile
    app.get('/profile', function(req, res) {
        console.log("req.data === ", req.data);
        console.log("res.data === ", res.data);
        UserController.profile(req, res)
    });

    //Update user route
    app.put('/users/:_id', function(req, res){
        UserController.updateUser(req, res)
    });

    //Remove user route
    app.post('/removeUser', function(req, res){
        UserController.removeUser(req, res)
    });

    //route for status(404)
    app.use(function(req, res) {
        res.status(404).send({error: 'URL not found.\n'})
    });
};

