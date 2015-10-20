$(function() {
  'use strict';
  if (window.CURRENT_USER_ID) {
    var root = document.getElementById("static-root");
    var Router = ReactRouter.Router;
    var Route = ReactRouter.Route;
    var IndexRoute = ReactRouter.IndexRoute;

    var App = root.App = React.createClass({
      mixins: [ReactRouter.History],

      componentDidMount: function() {
        this.history.pushState(null, "/home");
      },

      render: function() {
        return (
          <div>
            <NavBar /><br/>
              {this.props.children}
          </div>
         );
       }
    });

    var routes = (
      <Route path="/" component={App}>
        <Route path="home" component={HomePage} />
        <Route path="task/new" component={TaskForm} />
        <Route path="task/:storeTaskIdx/findWorker" component={FindWorkersForm} />
        <Route path="TaskViewTest" component={TaskViewTest} />
        <Route path="profile" component={ProfileForm} />
        <Route path="tasks/created" component={CreatedTasksIndex} >
          <Route path=":type" component={TasksIndex} />
        </Route>
      </Route>
    );

    React.render(<Router>{routes}</Router>, root);
  }
});
