(function(root) {
  'use strict';

  // NOTE: replace DateTimeField with my own component later

  root.TaskForm = React.createClass({
    getInitialState: function() {
      return ({
        title: "",
        location: "",
        startDate: "",
        startTime: "",
        endDate: "",
        endTime: "",
        description: ""
      });
    },
    render: function() {
      return (
        <div className="task-form">
          Create new task<br/>

          Title<br/>
          <input
            type="text"
            placeholder="default title"
          /><br/><br/>

          Location<br/>
          <input
            type="text"
            placeholder="default location"
          /><br/><br/>

          Start date<br/>
          <input type="date" /><br/>
          <input type="time" /><br/><br/>

          End date<br/>
          <input type="date" /><br/>
          <input type="time" /><br/><br/>

          Description<br/>
          <textarea placeholder="default description" /><br/><br/>

          <input type="submit" value="find workers" />
        </div>
      );
    }
  });
}(this));
