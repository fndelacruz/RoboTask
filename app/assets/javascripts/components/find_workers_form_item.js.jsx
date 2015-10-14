(function(root) {
  'use strict';
  // this.props.worker
  root.FindWorkersFormItem = React.createClass({
    render: function() {
      var worker = this.props.worker;
      return (
        <li id="find-workers-form-index-item">
          <div className="worker-name">{worker.email}</div><br/>
          About me...<br/>{worker.bio}
        </li>
      );
    }
  });
}(this));
