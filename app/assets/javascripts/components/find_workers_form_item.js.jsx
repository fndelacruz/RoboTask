(function(root) {
  'use strict';
  // this.props.worker
  // this.props.task
  // this.props.chooseWorker
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
        <div className="workers-item-container">

          <div className="worker-snippet">
            <img
              className="worker-profile-pic"
              src={ "https://robohash.org/" + worker.id } /><br/>
            <div className="text-center worker-profile-shortName">{shortName}</div><br/>
            Reviews
          </div>
          <div className="worker-bio">
            About me...<br/>{worker.bio}<br/>
          </div>
          <Button
            bsStyle="success"
            bsSize="medium"
            onClick={this.props.chooseWorker.bind(null, this.props.task, worker)}
          >
            Hire me
          </Button>
          <ReviewIndexModal worker={this.props.worker} />

        </div>
      );
    }
  });
}(this));
