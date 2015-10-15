(function(root) {
  'use strict';
  // this.props.worker
  // this.props.task
  // this.props.chooseWorker
  root.FindWorkersFormItem = React.createClass({
    // chooseWorker: function() {
    //   // NOTE: choose the worker at this.props.worker ! eventually, add a check
    //   // to see if the worker is capable of working at the given TimeSlice (when
    //   // TimeSlice is implemented...)
    //
    //   // NOTE: but how do I get the task id associated with this task? answer:
    //   // it's in the props!
    //   ApiUtil.assignWorkerToTask(this.props.task, this.props.worker);
    // },

    render: function() {
      var worker = this.props.worker;
      var task = this.props.task;
      // NOTE: eventually make this a <ul> containing <li> with profile pic,
      // info (name, bio), and button to choose worker
      return (
        <li id="find-workers-form-index-item" >
          <div className="worker-name">{worker.email}</div><br/>
          About me...<br/>{worker.bio}<br/>
          <div
            className="submit-link"
            onClick={this.props.chooseWorker.bind(null, this.props.task, worker)}>
            choose
          </div>
        </li>
      );
    }
  });
}(this));
