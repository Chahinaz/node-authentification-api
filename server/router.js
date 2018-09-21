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

    // Logout route
    app.post('/logout', function(req, res){
        AuthenticationController.login(req, res)
    });

    //All Users route
    app.get('/users', UserController.allUsers);

    //User's profile
    app.get('/profile', function(req, res) {
        UserController.profile(req, res)
    });

    //Update user route
    app.put('/profile', function(req, res){
        UserController.updateUser(req, res)
    });

    //Remove user route
//    app.delete('/', UserController.removeUser(req, res));

    //route for status(404)
    app.use(function(req, res) {
        res.status(404).send({error: 'URL not found.\n'})
    });
};

