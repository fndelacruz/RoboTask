(function(root) {
  'use strict';
  var Button = ReactBootstrap.Button;
  var Input = ReactBootstrap.Input;

  root.HomePage = React.createClass({
    mixins: [ReactRouter.History],

    getInitialState: function() {
      return({
        recentCreatedTasksUnassigned: [],
        upcomingTasks: [],
        newTaskTitle: "",
        newTaskTitleStatus: "",
        newTaskTitleStatusMessage: ""
      });
    },

    _updateTasks: function() {
      this.setState({
        recentCreatedTasksUnassigned: CreatedTaskStore.allIncompleteUnassigned(),
        upcomingTasks: CreatedTaskStore.allIncompleteAssigned(),
      });
    },

    componentDidMount: function() {
      ApiUtil.fetchCreatedTasks();
      CreatedTaskStore.addChangeListener(this._updateTasks);
      ApiUtil.fetchCurrentUserSetup();
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

    handleUpcomingTasks: function() {
      var tasks = this.state.upcomingTasks;
      var userIsRobot = CurrentUserStore.all().isRobot;
      return ((tasks.length === 0) ?
        <div className="panel center-block home-sub-header">You have no upcoming tasks.</div>
      :
        <div>
          <div className="panel center-block home-sub-header">My Upcoming Tasks</div>
          {tasks.map(function(createdTask) {
            return (
              <CreatedTasksIndexItem
                userIsRobot={userIsRobot}
                key={createdTask.id}
                createdTask={createdTask}/>
            );
          })}
        </div>
      );
    },

    handleInput: function() {
      return (
        <Input
          type="text"
          id="home-page-task-input"
          value={this.state.newTaskTitle}
          placeholder={"Example: " + RandomTasks.titles[Math.floor(Math.random() * RandomTasks.titles.length)]}
          onChange={this.handleChange}
          bsStyle={this.state.newTaskTitleStatus}
          onKeyDown={this.handleKeyDown}
          hasFeedback />
      );
    },

    _header: function() {
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
              How can we help you?<br/>
              {this.handleInput()}
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
              Hello! Looking for a job? Try the Open Task Search. Don't forget to set your work availability in your account settings.
            </div>
          }
        </div>
      );
    },

    render: function() {
      return (
        <div className="container">
          <div className="row">
            {this._header()}
            {this.handleUpcomingTasks()}
          </div>
        </div>
      );
    }
  });
}(this));
