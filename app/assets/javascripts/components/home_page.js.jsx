(function(root) {
  'use strict';
  // this will probably have a bunch of properties...
  root.HomePage = React.createClass({
    render: function() {
      return (
        <div className="row">
          <div className="panel">

            <span className="home-header">Welcome to RoboTask, {root.CURRENT_USER_SHORTNAME}! </span>
          </div>
          <div className="panel">
            <span className="home-sub-header">Here's some of your upcoming tasks</span>
              <div>
                Here will be 5 tasks that the user already assigned someone to do. Will be the 5 most upcoming. Nullam gravida augue et sem ultrices ullamcorper. Etiam id odio finibus, sagittis neque a, eleifend mauris. Proin elit erat, rutrum ut semper at, pretium sit amet ligula. Morbi dapibus justo massa, vitae mollis sapien ultrices nec. Nam sit amet placerat lorem, at elementum purus. Ut eu ex eu lectus pellentesque dignissim. Vivamus quis urna facilisis, maximus tellus a, feugiat risus. Quisque aliquet cursus metus id viverra. Vivamus quis ex eget mauris mattis faucibus nec ut odio. Nunc ut ultrices enim. Vivamus pulvinar tellus vel consectetur tincidunt. Pellentesque turpis mauris, eleifend et lobortis a, pulvinar eu mauris. Donec venenatis at odio ut maximus. Morbi in suscipit velit, at consequat eros. In ornare bibendum neque sit amet bibendum. Cras placerat mattis nibh sed condimentum.
              </div>
          </div>

          <div className="panel">
            <span className="home-sub-header">Did you forget to assign these tasks? </span>
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
      );
    }
  });
}(this));
