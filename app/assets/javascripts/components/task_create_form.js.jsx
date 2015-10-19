(function(root) {
  'use strict';

  var Button = ReactBootstrap.Button;

  var Glyphicon =ReactBootstrap.Glyphicon;

  root.TaskForm = React.createClass({
    mixins: [ReactRouter.History],

    getInitialState: function() {
      return ({
        entryTitle: "",
        title: "",
        titleStatus: "",
        titleStatusMessage: "",
        location: "",
        description: ""
      });
    },

    // NOTE: Make this more DRY when I can
    handleChange: function(e) {
      switch (e.target.id) {
        case "title-entry":
          this.setState({ entryTitle: e.target.value });
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

    handleAddressChange: function(address) {
      this.setState({ location: address });
    },

    _saveTitle: function() {
      if (this.state.entryTitle !== "") {
        this.setState({
          title: this.state.entryTitle,
          titleStatus: "OK",
          titleStatusMessage: "valid title entered."
        });
      } else {
        this.setState({
          titleStatus: "BAD",
          titleStatusMessage: "Please enter a task title."
        });

      }
      console.log("_saveTitle run");
    },

    _checkTitleStatus: function() {
      if (this.state.titleStatus === "OK") {
        return (
          <Glyphicon
            glyph="ok"
            className="task-status-icon"
            id="task-status-icon-ok" />
        );
      } else if (this.state.titleStatus === "BAD") {
        return (
          <Glyphicon
            glyph="remove"
            className="task-status-icon"
            id="task-status-icon-bad" />
        );
      } else {
        return (
          <Glyphicon
            glyph="pencil"
            className="task-status-icon" />
        );
      }
    },

    // NOTE: unsure if I should wrap each div form-group with another div
    // panel . seems redundant. panel will check if that panel is focused. if
    // focused, then it is expanded. otherwise it will minimize.

    // IDEA: add green indicator in top right corner (green check mark /red x)
    // if input is saved OK.

    // IDEA: add capability for user to "save". add additional states to keep
    // track of what the user has Saved. this will be what gets sent when do
    render: function() {
      var statusTitleGlyph = this._checkTitleStatus();

      return (
        <div className="component-container" id="task-form">
          <div className="component-container-heading" id="task-form-heading">Create new task</div><br/>

          <div className="panel">
            <div className="form-group">
              {statusTitleGlyph}
              <label htmlFor="title-entry">Title</label><br/>
              <input
                type="text"
                placeholder="default title"
                className="form-control"
                value={this.state.entryTitle}
                onChange={this.handleChange}
                id="title-entry"
              /><br/>
            </div>
            <Button
              bsStyle="success"
              bsSize="medium"
              onClick={this._saveTitle}>
              Continue
            </Button>
            <div className="task-status-message">
              {this.state.titleStatusMessage}
            </div>
          </div>

          <div className="panel">
            <div className="form-group">
              <label htmlFor="location-entry">Location</label><br/>
              <LocationEntry adressEntryListener={this.handleAddressChange} id="location-entry"/>
            </div>
          </div>

          <div className="panel">
            <div className="form-group">
              <label htmlFor="description-entry">Description</label><br/>
              <textarea
                placeholder="default description"
                className="form-control"
                value={this.state.description}
                onChange={this.handleChange}
                id="description-entry"
              /><br/>
            </div>
          </div>

          <button
            className="btn btn-default"
            type="submit"
            value="Signup"
            onClick={this.handleSubmission}>
            Choose Date and Find RoboTaskers
          </button>
        </div>
      );
    }
  });
}(this));
