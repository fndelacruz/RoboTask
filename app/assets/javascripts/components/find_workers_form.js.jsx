(function(root) {
  'use strict';

  root.FindWorkersForm = React.createClass({
    mixins: [ReactRouter.History],

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

    _assignWorkerOK: function() {
      // NOTE: Not sure what to do at this point (after worker is assigned OK),
      // For now, will just redirect to root... Ideally, want to display message
      // indicating that the task was assigned to a worker OK...

      this.history.pushState(null, "/");

    },

    componentDidMount: function() {
      // NOTE: add timeslice qualifiers after get timeslice working. Currently,
      // I consider all workers "valid". eventually, pass the task timeslice
      // to the below fetchValidWorkers...
      root.ApiUtil.fetchValidWorkers();
      root.WorkerUserStore.addChangeListener(this._updateValidWorkers);
      root.CreatedTaskStore.addAssignTaskWorkerOKListener(this._assignWorkerOK);
    },

    componentWillUnmount: function() {
      root.WorkerUserStore.removeChangeListener(this._updateValidWorkers);
      root.CreatedTaskStore.removeAssignTaskWorkerOKListener(this._assignWorkerOK);
    },

    render: function() {
      var workers = this.state.validWorkers;
      var task = root.CreatedTaskStore.all()[this.props.params.storeTaskIdx];
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
                  <FindWorkersFormItem
                    worker={worker}
                    task={task}
                    key={worker.id}/>
                );
              })
            }
            </ul>
        </div>
      );
    }
  });

}(this));
