(function(root) {
  'use strict';

  var _taskid = "";

  root.FindWorkersForm = React.createClass({
    getInitialState: function() {
      return ({
        validWorkers: root.WorkerUserStore.all()
      });
    },

    _updateValidWorkers: function() {
      this.setState({
        validWorkers: root.WorkerUserStore.all()
      });
    },

    componentDidMount: function() {
      _taskid = this.props.params.storeTaskIdx;

      // NOTE: add timeslice qualifiers after get timeslice working. Currently,
      // I consider all workers "valid". eventually, pass the task timeslice
      // to the below fetchValidWorkers...
      root.ApiUtil.fetchValidWorkers();
      root.WorkerUserStore.addChangeListener(this._updateValidWorkers);
    },

    componentWillUnmount: function() {
      root.WorkerUserStore.removeChangeListener(this._updateValidWorkers);
    },

    render: function() {
      var workers = this.state.validWorkers;
      return (
        <div className="component-container" id="find-workers-form">
          <div
            className="component-container-heading"
            id="find-workers-form-heading">
          FindWorkersForm placeholder
          </div>
            <ul>
            {
              workers.map(function(worker) {
                return (
                  <FindWorkersFormItem worker={worker} key={worker.id}/>
                );
              })
            }
            </ul>
        </div>
      );
    }
  });

}(this));
