(function(root) {
  'use strict';

  var taskIdsWithMarkers = [];
  var taskIdMarkerDirectory = {};

  var taskNeedsMarker = function (taskId) {
    if (taskIdsWithMarkers.indexOf(taskId) === -1) { return true; }
  };

  var TaskMap = root.TaskMap = React.createClass({
    componentDidMount: function() {
      var map = React.findDOMNode(this.refs.map);
      var mapOptions = { center: {lat: 37.7558, lng: -122.439}, zoom: 13 };
      this.map = new root.google.maps.Map(map, mapOptions);
      this.listenForMove();
      TaskMapHighLightStore.addChangeListener(this._handleMarkerHighlight);
      TaskMapHighLightStore.addZoomListener(this.zoomToTask);
    },

    componentWillReceiveProps: function(tasks) {
      this._createNewMarkers(tasks.tasks);
      this._deleteOutOfBoundsMarkers(tasks.tasks);
    },

    componentWillUnmount: function() {
      TaskMapHighLightStore.removeChangeListener(this._handleMarkerHighlight);
      TaskMapHighLightStore.removeZoomListener(this.zoomToTask);
      taskIdsWithMarkers = [];
      taskIdMarkerDirectory = {};
    },

    _deleteOutOfBoundsMarkers: function(tasks) {
      var mapTaskIds = Object.keys(taskIdMarkerDirectory);
      var storeTaskIds = tasks.map(function(task) { return task.id.toString(); });

      mapTaskIds.forEach(function(mapTaskId) {
        if (storeTaskIds.indexOf(mapTaskId) === -1) {
          taskIdMarkerDirectory[mapTaskId].setMap(null);
          delete taskIdMarkerDirectory[mapTaskId];
          taskIdsWithMarkers.splice(taskIdsWithMarkers.indexOf(mapTaskId), 1);
        }
      });
    },

    _createNewMarkers: function(tasks) {
      tasks.forEach(function(task) {
        var taskId = task.id.toString();
        if (taskNeedsMarker(taskId)) {
          var marker = new root.google.maps.Marker({
            position: { lat: task.lat, lng: task.lng },
            map: this.map,
            animation: root.google.maps.Animation.DROP,
            title: task.description
          });
          marker.addListener('click', function() {
            var container = $("#workable-tasks-holder");
            var scrollTo = $("#task-" + task.id);
            container.animate({
              scrollTop: scrollTo.offset().top - container.offset().top + container.scrollTop()
            });
          });
          taskIdsWithMarkers.push(taskId);
          taskIdMarkerDirectory[taskId] = marker;
        }
      }.bind(this));
    },

    _handleMarkerHighlight: function() {
      var highlightedTaskId = TaskMapHighLightStore.getHighlightedTaskId();
      taskIdsWithMarkers.forEach(function(taskIdWithMarkers) {
        if (taskIdWithMarkers === highlightedTaskId) {
          taskIdMarkerDirectory[taskIdWithMarkers].setAnimation(
            google.maps.Animation.BOUNCE
          );
        } else { taskIdMarkerDirectory[taskIdWithMarkers].setAnimation(); }
      });
    },

    listenForMove: function() {
      root.google.maps.event.addListener(this.map, 'idle', this._handleMove);
    },

    _handleMove: function() {
      // NOTE: Google maps API occasionally relabels getBounds properties which
      // breaks this function. Adjust accordingly when Google maps API changes.
      var latSouthNorth = this.map.getBounds().f; // f, b
      var lngWestEast = this.map.getBounds().b; // b, f
      var bounds = {
        northEast: { lat: latSouthNorth.b, lng: lngWestEast.f },
        southWest: { lat: latSouthNorth.f, lng: lngWestEast.b }
      };
      FilterActions.updateBounds(bounds);
    },

    zoomToTask: function() {
      this.map.panTo(TaskMapHighLightStore.getZoomLatLng());
      this.map.setZoom(18);
    },

    render: function() { return <div className="map" ref="map" id="map" />; }
  });
}(this));
