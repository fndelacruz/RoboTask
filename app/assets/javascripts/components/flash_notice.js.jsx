(function(root) {
  'use strict';
  // assumes this.props.messages

  var FlashNotice = React.createClass({
  getInitialState: function() {
    return {messages: this.props.messages};
  },

  messages: function (messageArray) {
    this.replaceState({messages: messageArray});
  },

  render: function() {
    return (
      <div className='flash_messages_component'>
        {this.state.messages.map(function(message, index) {
          _level = message[0];
          _text  = message[1];
          return (
            <div key={index} className={this._flash_class(_level)}>
              {_text}
            </div>
          );
        }.bind(this))}
      </div>
    );
  },

  _flash_class: function(level) {
    var _result = 'alert alert-error';
    if (level === 'notice') {
      _result = 'alert alert-info';
    } else if (level === 'success') {
      _result = 'alert alert-success';
    } else if (level === 'error') {
      _result = 'alert alert-error';
    } else if (level === 'alert') {
      _result = 'alert alert-error';
    }
    return _result;
  }

});


}(this));
