(function(root) {
  'use strict';

  var taskIdsWithMarkers = [];
  var taskIdMarkerDirectory = {};

  var taskNeedsMarker = function (taskId) {
    if (taskIdsWithMarkers.indexOf(taskId) === -1) {
      return true;
    }
  };

  var TaskMap = root.TaskMap = React.createClass({
    _deleteOutOfBoundsMarkers: function(tasks) {
      var mapTaskIds = Object.keys(taskIdMarkerDirectory);

      var storeTaskIds = tasks.map(function(task) {
        return task.id.toString();
      });

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
        } else {
          taskIdMarkerDirectory[taskIdWithMarkers].setAnimation();
        }
      });
    },

    updateTaskMarkers: function() {
    },

    componentDidMount: function() {
      var map = React.findDOMNode(this.refs.map);
      var mapOptions = {
        center: {lat: 37.7558, lng: -122.439},
        zoom: 13
      };
      this.map = new root.google.maps.Map(map, mapOptions);
      this.listenForMove();
      this.listenForMapClick();
      TaskMapHighLightStore.addChangeListener(this._handleMarkerHighlight);

    },

    componentWillReceiveProps: function(tasks) {
      this._createNewMarkers(tasks.tasks);
      this._deleteOutOfBoundsMarkers(tasks.tasks);
    },

    componentWillUnmount: function() {
      TaskMapHighLightStore.removeChangeListener(this._handleMarkerHighlight);
      taskIdsWithMarkers = [];
      taskIdMarkerDirectory = {};
    },

    listenForMove: function() {
      root.google.maps.event.addListener(this.map, 'idle', this._handleMove);
    },

    _handleMove: function() {
      var northEast = this.map.getBounds().getNorthEast();
      var southWest = this.map.getBounds().getSouthWest();

      var latSouthNorth = this.map.getBounds().O;
      var lngEastWest = this.map.getBounds().j;
      var bounds = {
        northEast: { lat: latSouthNorth.j, lng: lngEastWest.O },
        southWest: { lat: latSouthNorth.O, lng: lngEastWest.j }
      };
      FilterActions.updateBounds(bounds);
    },

    listenForMapClick: function() {
      root.google.maps.event.addListener(this.map, 'click', this._clicky);
    },

    handleMapClick: function (e) {
    },

    _clicky: function() {
    },

    render: function() {
      return (
        <div
          className="map"
          ref="map"
          id="map">
          <div>
            TaskMap is here!
          </div>
        </div>
      );
    }
  });
}(this));
