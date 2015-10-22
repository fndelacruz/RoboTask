(function(root) {
  'use strict';

  root.FindTasksIndex = React.createClass({
    getInitialState: function() {
      return ({
        qualifyingTasks: []
      });
    },

    componentDidMount: function() {
      ApiUtil.fetchQualifyingTasks();
      WorkableTaskStore.addChangeListener(this._receiveQualifyingTasks);
    },

    componentWillUnmount: function() {
      WorkableTaskStore.removeChangeListener(this._receiveQualifyingTasks);
    },

    _receiveQualifyingTasks: function() {
      this.setState({
        qualifyingTasks: WorkableTaskStore.all()
      });
    },

    render: function() {
      return (
        <div>
          FindTasksIndex Placeholder
          {this.state.qualifyingTasks.map(function(task) {
            return (
              <div>
                {task}
              </div>
            );
          })}
        </div>
      );
    }
  });
}(this));
