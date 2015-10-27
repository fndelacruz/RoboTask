// (function(root) {
//   'use strict';
//
//   var CHANGE_EVENT = "MESSAGE_STORE_CHANGE_EVENT";
//   var _messages = [];
//
//   var _resetMessages = function(messages) {
//     console.log("MessageStore._resetMessages");
//     _messages = messages;
//     MessageStore.emit(CHANGE_EVENT);
//   };
//
//   var MessageStore = root.MessageStore = $.extend({}, EventEmitter.prototype, {
//     all: function(type) {
//       switch (type) {
//         case "received":
//           return _messages.filter(function(message) {
//             return message.owner_id === message.receiver_id;
//           });
//         case "sent":
//           return _messages.filter(function(message) {
//             return message.owner_id === message.sender_id;
//           });
//         default:
//           return _messages.slice();
//       }
//     },
//
//     addChangeListener: function(callback) {
//       this.on(CHANGE_EVENT, callback);
//     },
//
//     removeChangeListener: function(callback) {
//       this.removeListener(CHANGE_EVENT, callback);
//     },
//
//     dispatcherId: AppDispatcher.register(function(payload) {
//       switch (payload.actionType) {
//         case MessageConstants.RECEIVED_NEW_MESSAGES:
//           console.log("RECEIVED_NEW_MESSAGES from AppDispatcher");
//           _resetMessages(payload.action);
//           break;
//       }
//     })
//   });
// }(this));
