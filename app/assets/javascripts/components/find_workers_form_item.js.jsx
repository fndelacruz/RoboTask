(function(root) {
  'use strict';
  // this.props.worker
  root.FindWorkersFormItem = React.createClass({
    chooseWorker: function() {
      // NOTE: choose the worker at this.props.worker!!!

    },

    render: function() {
      var worker = this.props.worker;
      // NOTE: eventually make this a <ul> containing <li> with profile pic,
      // info (name, bio), and button to choose worker
      return (
        <li id="find-workers-form-index-item" >
          <div className="worker-name">{worker.email}</div><br/>
          About me...<br/>{worker.bio}<br/>
          <div
            className="submit-link"
            onClick={this.chooseWorker}>
            choose
          </div>
        </li>
      );
    }
  });
}(this));
