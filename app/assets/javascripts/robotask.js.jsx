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
        ApiUtil.fetchCurrentUserSetup();
        // this.history.pushState(null, "/home");
      },

      updateUserDetails: function() {
        this.setState({
          currentUserSettings: CurrentUserStore.all()
        });
      },

      render: function() {

        return (
          <div>
            <NavBar />
            {this.props.children}
          </div>
         );
       }
    });

    var routes = (
      <Route path="/" component={App}>
        <IndexRoute component={HomePage} />
        <Route path="messages" component={UserMessages} />
        <Route path="findtasks" component={FindTasksIndex} />
        <Route path="task/new(/:title)" component={TaskForm} />
        <Route path="taskmap" component={TaskMap} />
        <Route path="findWorker" component={FindWorkersForm} />
        <Route path="profile" component={ProfileForm}>
          <Route path="work_settings" component={ProfileFormWork} />
          <Route path="general_settings" component={ProfileFormGeneral} />
        </Route>
        <Route path="tasks/created" component={CreatedTasksIndex} >
          <Route path=":type" component={TasksIndex} />
        </Route>
      </Route>
    );

    React.render(<Router>{routes}</Router>, root);
  }
});
