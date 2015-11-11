$(function() {
  'use strict';
  if (window.IS_CURRENT_USER_LOGGED_IN) {
    var root = document.getElementById("static-root");
    var Router = ReactRouter.Router;
    var Route = ReactRouter.Route;
    var IndexRoute = ReactRouter.IndexRoute;

    var App = root.App = React.createClass({
      mixins: [ReactRouter.History],
      componentDidMount: function() {
        ApiUtil.fetchCurrentUserSetup();
        CurrentUserStore.addChangeListener(this.updateUserDetails);
      },

      componentWillUnmount: function() {
        CurrentUserStore.removeChangeListener(this.updateUserDetails);
      },

      updateUserDetails: function() {
        this.setState({ currentUserSettings: CurrentUserStore.all() });
      },

      render: function() {
        return (
          <div>
            {this.state ?
              <div>
                <NavBar />
                {this.props.children}
              </div>
            :
              ""}
          </div>
         );
       }
    });

    var routes = (
      <Route path="/" component={App}>
        <IndexRoute component={HomePage} />
        <Route path="findtasks" component={FindTasksIndex} />
        <Route path="task/new(/:title)" component={TaskForm} />
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
