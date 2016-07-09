// server.js:
//  * configures application
//  * connects to db
//  * creates mongoose models
//  * defines routes for restful api
//  * defines routes for frontend angular application
//  * set app to listen on port so can view in browser

  // set up ==========
  var express     = require('express');
  var app         = express();              // create app w/express
  var mongoose    = require('mongoose');    // mongoose for mongodb
  var morgan      = require('morgan');      // logs requests to console (express4)
  var bodyParser  = require('body-parser'); // pull info from HTML POST (express4)
  var methodOverride  = require('method-override'); // simulate DELETE and PUT (express4)

  // config ==========
  mongoose.connect('mongodb://admin:admin@jello.modulusmongo.net:27017/mujEr9ub'); // connect to mongodb database on modulus

  app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for us
  app.use(morgan('dev'));                         // log every request to the console
  app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
  app.use(bodyParser.json());                                     // parse application/json
  app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
  app.use(methodOverride());

  // define model ==========
  var Todo = mongoose.model('Todo', {
    text : String
  });

  // routes ==========

    // api ----------

    /*
    HTTP Verb = GET
    URL = '/api/todos'
    Description = Get all of the todos.
    */
    app.get('/api/todos', function(req, res) {

      // use mongoose to get all todos in the database
      Todo.find(function(err, todos) {

        // if there is an error retrieving, send the error. nothing after res.send will execute
        if (err) {
          res.send(err);
        }

        res.json(todos);  // return all todos in a json format
      });
    });

    /*
    HTTP Verb = POST
    URL = '/api/todos'
    Description  = Create a single todo.
    */
    app.post('/api/todos', function(req, res) {

      // create a todo, info comes from AJAX request from angular
      Todo.create({
        text : req.body.text,
        done : false
      }, function(err, todo) {
        if (err) {
          res.send(err);
        }

        // get and return all the todos after you create another
        Todo.find(function(err, todos) {
          if (err) {
            res.send(err);
          }
          res.json(todos);
        });
      });

    });

    /*
    HTTP Verb = DELETE
    URL = '/api/todos/:todo_id'
    Description = Delete a single todo.
    */
    app.delete('/api/todos/:todo_id', function(req, res) {
      Todo.remove({
        _id : req.params.todo_id
      }, function(err, todo) {
        if (err) {
          res.send(err);
        }

        // get and return all the todos after you create another
        Todo.find(function(err, todos) {
          if (err) {
            res.send(err);
          }
          res.json(todos);
        });
      });
    });

    // application ----------
    app.get('*', function(req, res) {
      res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });

  // listen (start app with node server.js) ======================================
  app.listen(8080);
  console.log("App listening on port 8080");
