(function(root) {
  'use strict';
  // this.props.worker
  // this.props.task
  // this.props.chooseWorker
  // this.props.dateTime
  var Button = ReactBootstrap.Button;

  root.FindWorkersFormItem = React.createClass({

    render: function() {
      // NOTE: Was rendering review like below. might change back to it if modal
      // does not work properly  to show review
      // <ReviewIndex worker={this.props.worker} />
      var worker = this.props.worker;
      var task = this.props.task;
      var shortName = worker.fname + " " + worker.lname[0] + ".";
      // NOTE: eventually make this a <ul> containing <li> with profile pic,
      // info (name, bio), and button to choose worker
      return (
        <div className="row" id="find-workers-form-item-container">

          <div className="col-xs-12 col-sm-4" id="find-workers-form-item-pic-name-container">
            <img
              className="worker-profile-pic"
              src={ "https://robohash.org/" + worker.id  + "?bgset=any"} /><br/>
            <div className="text-center" id="worker-profile-shortName">{shortName}</div><br/>
          </div>

          <div className="col-xs-12 col-sm-8" id="about-me-container">
            <div id="find-worker-form-item-about-container">
              <div id="about-header">About me...</div>
              <div id="about-content">{worker.bio}</div>

              <ReviewIndexModal worker={this.props.worker} shortName={shortName} />
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
      );
    }
  });
}(this));
