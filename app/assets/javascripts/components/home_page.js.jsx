(function(root) {
  'use strict';
  // this will probably have a bunch of properties...

  var Button = ReactBootstrap.Button;
  var Input = ReactBootstrap.Input;

  root.HomePage = React.createClass({
    mixins: [ReactRouter.History],

    getInitialState: function() {
      return({
        recentCreatedTasksUnassigned: [],
        recentCreatedTasksAssigned: [],
        workableTasks: [],
        newTaskTitle: "",
        newTaskTitleStatus: "",
        newTaskTitleStatusMessage: ""
      });
    },

    _updateTasks: function() {
      this.setState({
        recentCreatedTasksUnassigned: CreatedTaskStore.allIncompleteUnassigned(),
        recentCreatedTasksAssigned: CreatedTaskStore.allIncompleteAssigned(),
        workableTasks: []
      });
    },

    componentDidMount: function() {
      root.ApiUtil.fetchCreatedTasks();
      CreatedTaskStore.addChangeListener(this._updateTasks);
    },

    componentWillUnmount: function() {
      CreatedTaskStore.removeChangeListener(this._updateTasks);
    },

    handleChange: function(e) {
      this.setState({
        newTaskTitle: e.target.value,
        newTaskTitleStatus: "",
        newTaskTitleStatusMessage: ""
      });
    },

    handleSubmit: function() {
      var newTaskTitle = this.state.newTaskTitle;
      if (newTaskTitle.length > 0) {
        this.history.pushState(null, "/task/new/" + newTaskTitle );
      } else {
        this.setState({
          newTaskTitleStatus: "error",
          newTaskTitleStatusMessage: "Enter a Task title to continue."
        });
      }
    },

    handleKeyDown: function(e) {
      if (e.keyCode === 13) {
        this.handleSubmit();
      } else {
        this.handleChange(e);
      }
    },

    _header: function() {
      if (Object.keys(CurrentUserStore.all()).length !== 0) {
        var options = CurrentUserStore.all();
        return (
          <div>
            <div className="panel">
              <img
                className="reviewer-profile-pic"
                id="home-current-user-pic"
                src={options.image} />
              <span className="home-header">Welcome to RoboTask, {options.shortName}!</span>
            </div>
            {options.isRobot === false ?
              <div className="panel home-sub-header" id="task-create-welcome">
                Over 9,000 RoboTaskers at your service. How can we help you?<br/>
                <Input
                  type="text"
                  id="home-page-task-input"
                  value={this.state.newTaskTitle}
                  placeholder={"Example: " + RandomTasks.titles[Math.floor(Math.random() * RandomTasks.titles.length)]}
                  onChange={this.handleChange}
                  bsStyle={this.state.newTaskTitleStatus}
                  onKeyDown={this.handleKeyDown}
                  hasFeedback />
                <Button
                  className="home-task-create-button"
                  bsStyle="primary"
                  onClick={this.handleSubmit}>
                  Continue!
                </Button>
                <span className="home-task-create-status">{this.state.newTaskTitleStatusMessage}</span>
              </div>
            :
              <div className="panel home-sub-header" id="task-find-welcome">
                Looking for a job? Please visit your account settings and mark when you are available to work. Then, come back and click here to get started!
              </div>
            }
          </div>

        );
      }
    },

    render: function() {
      console.log(this.state.newTaskTitle);
      var recentCreatedTasksAssigned = this.state.recentCreatedTasksAssigned;
      return (
        <div className="container">
          <div className="row">
            {this._header()}

              <span className="home-sub-header">Upcoming tasks</span>
                {(recentCreatedTasksAssigned === 0) ?
                  <div>No upcoming tasks!</div>
                :
                  <div>
                    {recentCreatedTasksAssigned.map(function(createdTask) {
                      return <CreatedTasksIndexItem key={createdTask.id} createdTask={createdTask} />;
                    })}
                  </div>
                }

            <div className="panel">
              <span className="home-sub-header">Tasks needing assignment</span>
                <div>
                  Here will be 5 tasks that the user created, but don't have workers assigned yet. Aenean eget ex ligula. Nam non malesuada velit. Suspendisse tincidunt odio eu mi sollicitudin condimentum. Proin aliquet ipsum sed urna efficitur aliquam. Nam in eros vel diam bibendum commodo. Sed imperdiet non turpis eget elementum. Nullam nec odio interdum, dignissim dolor et, iaculis erat. Nunc in feugiat quam. In vel velit non arcu tristique maximus elementum quis est. Nam erat arcu, egestas.
                </div>
            </div>

            <div className="panel">
              <span className="home-sub-header">Want to get paid? Here are some tasks that you are qualified for, today! </span>
                <div>
                  Here will be 5 random tasks pending assignment that the user is qualified for (has open time-slots scheduled via Profile). Aliquam non facilisis quam. Proin vel tristique dolor. Proin placerat quam eget eros gravida, in efficitur dolor porttitor. Maecenas ipsum dolor, iaculis id feugiat tincidunt, blandit vitae elit. Sed sollicitudin erat eget semper gravida. Etiam eget magna magna. Integer facilisis, diam eget rhoncus vulputate, arcu elit egestas elit, at condimentum turpis erat at justo. Aenean et euismod dui, et rutrum risus.
                </div>
            </div>
          </div>
        </div>
      );
    }
  });
}(this));
