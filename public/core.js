/*
    Description:
    ~
  - Create a module
  - Create a controller
  - Define functions to handle todos
  - Apply to view
*/

// Our angular module is called "scotchToDo".
var scotchToDo = angular.module('scotchToDo', []);

// Our controller is called "mainController".
function mainController($scope, $http) {
  $scope.formData = {};

  // $http - a core Angular service that communicates with remote HTTP servers
  // it uses either:
  //  * the browser's XMLHttpRequest object, or
  //  * JSONP
  // to do so.

  // format: $http.get('/someUrl', config).then(successCallback, errorCallback);
  // legacy promise methods "success" and "error" have been deprecated. Use the standard "then" method instead.
  // shortcut to perform GET request: "get(url, [config]);"
  // returns "HttpPromise" Future object

  /*
   * GET ALL TO DOS
   */
  // When landing on the page, get all todos and show them.
  $http.get('api/todos')
    .success(function(data) { // will be called asynchronously when the response is available
      // This is a response object, has properties: data {string|Object}; status {number}; headers {function([headerName])}; config {Object}; statusText {string}.
      $scope.todos = data;
      console.log(data);
    })
    .error(function(data) { // called asynchronously if an error occurs, or server returns response with an error status.
      console.log('Error: ' + data);
    });

  /*
   * CREATE A TO DO
   */

    // Method: post(url, data, [config]);
    // Description: shortcut method to perform POST request
    // Parameters:
    // Param              Type    Details
    // url                String  Relative or absolute URL specifying the destination of the request
    // data               *       Request content
    // config (optional)  object  Optional configuration object
    $scope.createToDo = function() {
      $http.post('/api/todos', $scope.formData)
        .success(function(data) {
          $scope.formData = {}; // clear form so our user is ready to enter another
          $scope.todos = data;
          console.log(data);
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    };

  /*
   * DELETE A TO DO
   */

    // Delete a todo after checking it.
    $scope.deleteTodo = function(id) {
      $http.delete('/api/todos/' + id)
        .success(function(data) {
          $scope.todos = data;
          console.log(data);
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    };
}
