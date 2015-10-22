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
          FindTasksIndex Placeholder<br/><br/>
          task map below
          <div className="container-fluid">
            <div className="row">
              <div classname="col-xs-12 col-sm-9">
                <TaskMap />

                task map above
              </div>
              <div classname="col-xs-12 col-sm-3">
                {this.state.qualifyingTasks.map(function(task) {
                  return (
                    <div>
                      {task}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      );
    }
  });
}(this));
