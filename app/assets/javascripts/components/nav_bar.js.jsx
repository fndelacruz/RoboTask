(function(root) {
  'use strict';

  root.NavBar = React.createClass({
    mixins: [ReactRouter.History],

    handleCreateTaskClick: function() {
      debugger;
    },

    render: function() {
      return (
        <div>
          <div onClick={this.handleCreateTaskClick}>Create Task</div>
        </div>
      );
    }
  });
}(this));
