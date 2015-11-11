(function(root) {
  'use strict';
  // this.props.worker
  // this.props.task
  // this.props.chooseWorker
  // this.props.dateTime
  root.FindWorkersFormItem = React.createClass({
    approvalRating: function() {
      if (this.props.worker.stats.total_tasks > 0) {
        return <h4>{this.props.worker.stats.approval_rating}% Approval rating</h4>;
      } else {
        return ("");
      }
    },

    render: function() {
      var worker = this.props.worker;
      var task = this.props.task;
      var shortName = worker.shortName;
      return (
        <div className="row" id="find-workers-form-item-container">

          <div className="col-xs-12 col-sm-4" id="find-workers-form-item-pic-name-container">
            <img
              className="worker-profile-pic"
              src={worker.image} /><br/>
            <div className="text-center" id="worker-profile-shortName">
              {shortName}<br/>
              <ReviewIndexModal worker={this.props.worker} shortName={shortName} />
            </div>
            <div className="text-center">

            </div>
          </div>

          <div className="col-xs-12 col-sm-8" id="about-me-container">
            <div className="find-worker-form-item-about-container">
              <div id="about-header">About me...</div>
              <div id="about-content">{worker.bio}</div>
              <div className="worker-stats">
                <h3>{worker.stats.total_tasks} RoboTasks completed</h3>
                {this.approvalRating()}
                <span className="find-workers-form-item-wage">§{worker.wage}/hr</span>
              </div>
              <div className="find-workers-item-button-holder">
                <ConfirmHireModal
                  handleConfirm={this.props.chooseWorker.bind(null, this.props.task, worker)}
                  task={task}
                  worker={worker}
                  shortName={shortName}
                  dateTime={this.props.dateTime}
                  chooseWorker={this.props.chooseWorker.bind(null, this.props.task, worker)}
                />
              </div>

            </div>
          </div>

        </div>
      );
    }
  });
}(this));
