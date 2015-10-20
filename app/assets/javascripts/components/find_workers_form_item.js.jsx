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
        <div className="row temp-borders-2">

          <div className="temp-borders col-xs-12 col-sm-3">
            <img
              className="worker-profile-pic"  
              src={ "https://robohash.org/" + worker.id } /><br/>
            <div className="text-center worker-profile-shortName">{shortName}</div><br/>
            <ReviewIndexModal worker={this.props.worker} />
            <Button
              bsStyle="success"
              bsSize="medium"
              onClick={this.props.chooseWorker.bind(null, this.props.task, worker)}
            >
              Hire me
            </Button>
          </div>

          <div className="temp-borders col-xs-12 col-sm-9">
            About me...<br/>{worker.bio}<br/>
          </div>

        </div>
      );
    }
  });
}(this));
