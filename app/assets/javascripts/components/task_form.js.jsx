(function(root) {
  'use strict';

  root.TaskForm = React.createClass({
    render: function() {
      return (
        <div className="task-form">
          <div>Create new task</div><br/>

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

          Description<br/>
          <textarea placeholder="default description" /><br/><br/>

          <input type="submit" value="find workers" />
        </div>
      );
    }
  });
}(this));
