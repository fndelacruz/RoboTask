(function(root) {
  'use strict';
  // this will probably have a bunch of properties...
  var Jumbotron = ReactBootstrap.Jumbotron;
  root.HomePage = React.createClass({
    render: function() {
      return (
        <div>
          <Jumbotron>
            <h1> Hi {root.CURRENT_USER_EMAIL} </h1>
            <h3> what do you want to do? </h3>
          </Jumbotron>
          <div className="row">
            <div className="col-md-4 homepage-element">
            Create a task
            </div>
            <div className="col-md-4 homepage-element">
            View your tasks
            </div>
            <div className="col-md-4 homepage-element">
            Find some tasks to do
            </div>
          </div>

        </div>
      );
    }
  });
}(this));
