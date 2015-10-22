(function(root) {
  'use strict';
  // this will probably have a bunch of properties...

  var OverlayTrigger = ReactBootstrap.OverlayTrigger;
  var Button = ReactBootstrap.Button;
  var Popover = ReactBootstrap.Popover;


  root.HomePage = React.createClass({
    mixins: [ReactRouter.History],

    getInitialState: function() {
      return({
        recentCreatedTasksUnassigned: [],
        recentCreatedTasksAssigned: [],
        workableTasks: []
      });
    },

    _updateTasks: function() {
      this.setState({
        recentCreatedTasksUnassigned: CreatedTaskStore.allIncompleteUnassigned(),
        recentCreatedTasksAssigned: CreatedTaskStore.allIncompleteAssigned(),
        workableTasks: []
      });
      // debugger;
    },

    componentDidMount: function() {
      root.ApiUtil.fetchCreatedTasks();
      CreatedTaskStore.addChangeListener(this._updateTasks);
    },

    componentWillUnmount: function() {
      CreatedTaskStore.removeChangeListener(this._updateTasks);
    },

    // _handleCurrentUserClick: function() {
    //   this.history.pushState(null, "/profile");
    // },

    render: function() {
      // debugger;
      var recentCreatedTasksAssigned = this.state.recentCreatedTasksAssigned;
      return (
        <div className="container">
          <div className="row">
            <div className="panel">
              <OverlayTrigger
                trigger="hover"
                placement="bottom"
                overlay={
                  <Popover
                    title="Hello">
                    Hi there!
                  </Popover>
                }>
                <img
                  className="reviewer-profile-pic"
                  id="home-current-user-pic"
                  src={ "https://robohash.org/" + root.CURRENT_USER_ID } />
              </OverlayTrigger>
              <span className="home-header">Welcome to RoboTask, {root.CURRENT_USER_SHORTNAME}! </span>
            </div>
            <div className="panel">
              <span className="home-sub-header">Upcoming tasks</span>
                {(recentCreatedTasksAssigned === 0) ?
                  <div>No upcoming tasks!</div>
                :
                  <div>
                    {recentCreatedTasksAssigned.map(function(createdTask) {
                      return <CreatedTasksIndexItem key={createdTask.id} createdTask={createdTask} />;
                    })}
                  </div>
                }
            </div>

            <div className="panel">
              <span className="home-sub-header">Tasks needing assignment</span>
                <div>
                  Here will be 5 tasks that the user created, but don't have workers assigned yet. Aenean eget ex ligula. Nam non malesuada velit. Suspendisse tincidunt odio eu mi sollicitudin condimentum. Proin aliquet ipsum sed urna efficitur aliquam. Nam in eros vel diam bibendum commodo. Sed imperdiet non turpis eget elementum. Nullam nec odio interdum, dignissim dolor et, iaculis erat. Nunc in feugiat quam. In vel velit non arcu tristique maximus elementum quis est. Nam erat arcu, egestas.
                </div>
            </div>

            <div className="panel">
              <span className="home-sub-header">Want to get paid? Here are some tasks that you are qualified for, today! </span>
                <div>
                  Here will be 5 random tasks pending assignment that the user is qualified for (has open time-slots scheduled via Profile). Aliquam non facilisis quam. Proin vel tristique dolor. Proin placerat quam eget eros gravida, in efficitur dolor porttitor. Maecenas ipsum dolor, iaculis id feugiat tincidunt, blandit vitae elit. Sed sollicitudin erat eget semper gravida. Etiam eget magna magna. Integer facilisis, diam eget rhoncus vulputate, arcu elit egestas elit, at condimentum turpis erat at justo. Aenean et euismod dui, et rutrum risus.
                </div>
            </div>


            <div className="row">
              <div className="col-xs-4 homepage-element">
              Create a task
              </div>
              <div className="col-xs-4 homepage-element">
              View your tasks
              </div>
              <div className="col-xs-4 homepage-element">
              Find some tasks to do
              </div>
            </div>

          </div>
        </div>
      );
    }
  });
}(this));
