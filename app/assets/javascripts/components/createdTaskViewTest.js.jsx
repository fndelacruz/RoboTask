(function(root) {
  'use strict';
  var Tabs = ReactBootstrap.TabbedArea;
  var Tab = ReactBootstrap.TabPane;

  root.TaskViewTest = React.createClass({
    getInitialState: function() {
      // I'll likely change this based on location params! since I will nest 3
      // categories of tabs: unassigned, assigned, completed
      return ({ key: 1 });
    },

    handleSelect: function(key) {
      alert('selected ' + key);
      this.setState({key});
    },

    render: function() {
      return (
        <Tabs defaultActiveKey={1} animation={false}>
          <Tab eventKey={1} title="Tab 1">Tab 1 content</Tab>
          <Tab eventKey={2} title="Tab 2">Tab 2 content</Tab>
          <Tab eventKey={3} title="Tab 3" disabled>Tab 3 content</Tab>
        </Tabs>
      );
    }
  });
}(this));
        // <div> test</div>
