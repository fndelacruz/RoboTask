// (function(root) {
//   'use strict';
//
//   var FILTER_PARAMS_CHANGE_EVENT = "FILTER_PARAMS_CHANGE_EVENT";
//
//   var _filterParams = {};
//
//   var resetFilterParams = function(filterParams) {
//     _filterParams = filterParams;
//     FilterParamsStore.emit(FILTER_PARAMS_CHANGE_EVENT);
//   };
//
//   var FilterParamsStore = root.FilterParamsStore = $.extend({}, EventEmitter.prototype, {
//     all: function() {
//       return _filterParams;
//     },
//
//     addFilterParamsChangeListener: function(callback) {
//       this.on(FILTER_PARAMS_CHANGE_EVENT, callback);
//     },
//
//     removeFilterParamsChangeListener: function(callback) {
//       this.removeListener(FILTER_PARAMS_CHANGE_EVENT, callback);
//     },
//
//     dispatcherID: AppDispatcher.register(function(payload) {
//       switch (payload.actionType) {
//         case FilterConstants.FILTER_PARAMS_CHANGE_EVENT:
//           resetFilterParams(payload.action);
//           break;
//       }
//     })
//   });
// }(this));
