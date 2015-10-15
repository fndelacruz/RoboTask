(function(root) {
  'use strict';

  root.TaskForm = React.createClass({
    mixins: [ReactRouter.History],

    getInitialState: function() {
      return ({
        title: "",
        location: "",
        description: ""
      });
    },

    // NOTE: Make this more DRY when I can
    handleChange: function(e) {
      switch (e.target.id) {
        case "title-entry":
          this.setState({ title: e.target.value });
          break;
        case "location-entry":
          this.setState({ location: e.target.value });
          break;
        case "description-entry":
          this.setState({ description: e.target.value });
          break;
      }
    },

    handleSubmission: function(e) {
      // NOTE: Will add start dates later, just getting Ajax working first.
      var newTask = {
        title: this.state.title,
        location: this.state.location,
        description: this.state.description,
      };
      root.ApiUtil.createTask(newTask);
    },

    _findValidWorkers: function() {
      var idx = root.CreatedTaskStore.all().length - 1;
      this.history.pushState(null, "/task/" + idx + "/findWorker");
    },

    componentDidMount: function() {
      root.CreatedTaskStore.addCreateTaskOKListener(this._findValidWorkers);
    },

    componentWillUnmount: function() {
      root.CreatedTaskStore.removeCreateTaskOKListener(this._findValidWorkers);
    },

    render: function() {
      return (
        <div className="component-container" id="task-form">
          <div className="component-container-heading" id="task-form-heading">Create new task</div><br/>

          Title<br/>
          <input
            type="text"
            placeholder="default title"
            value={this.state.title}
            onChange={this.handleChange}
            id="title-entry"
          /><br/><br/>

          Location<br/>
          <input
            type="text"
            placeholder="default location"
            value={this.state.location}
            onChange={this.handleChange}
            id="location-entry"
          /><br/><br/>

          Description<br/>
          <textarea
            placeholder="default description"
            value={this.state.description}
            onChange={this.handleChange}
            id="description-entry"
          /><br/><br/>

          <div
            className="submit-link"
            onClick={this.handleSubmission}>
          getFreeRobots
          </div>
        </div>
      );
    }
  });
}(this));
