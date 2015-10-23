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
    // mixins: [ReactRouter.History],
    //
    // getInitialState: function() {
    //   return ({
    //     clicked: false,
    //     tasks: [],
    //     markers: []
    //   });
    // },
    //
    // _changed: function() {
    //   this._createNewMarkers(BenchStore.all());
    //   this._deleteOutOfBoundsMarkers(BenchStore.all());
    // },
    //
    // _deleteOutOfBoundsMarkers: function(storeBenches) {
    //   var mapBenchIds = Object.keys(benchIdMarkerDirectory);
    //
    //   var storeBenchIds = storeBenches.map(function(storeBench) {
    //     return storeBench.id.toString();
    //   });
    //
    //   mapBenchIds.forEach(function(mapBenchId) {
    //     if (storeBenchIds.indexOf(mapBenchId) === -1) {
    //       benchIdMarkerDirectory[mapBenchId].setMap(null);
    //       delete benchIdMarkerDirectory[mapBenchId];
    //
    //       benchIdsWithMarkers.splice(benchIdsWithMarkers.indexOf(mapBenchId), 1);
    //     }
    //   });
    // },
    //
    _createNewMarkers: function(tasks) {
      tasks.forEach(function(task_holder) {
        var task = task_holder.task;
        var taskId = task.id.toString();
        if (taskNeedsMarker(taskId)) {
          var marker = new root.google.maps.Marker({
            position: { lat: task.lat, lng: task.lng },
            map: this.map,
            animation: root.google.maps.Animation.DROP,
            title: task.description
          });

          // debugger;
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
      console.log("updateTaskMarkers");
      // this.setState({ tasks: WorkableTaskStore.all() });
      // this._createNewMarkers(this.state.tasks);
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
      // WorkableTaskStore.addChangeListener(this.updateTaskMarkers);
      // BenchStore.addChangeListener(this._changed);
      // TaskMapHighLightStore.addChangeListener(this._handleMarkerHighlight);

    },

    componentWillReceiveProps: function(tasks) {
      // debugger
      console.log("componentWillReceiveProps");
      this._createNewMarkers(tasks.tasks);
    },

    componentWillUnmount: function() {
      // WorkableTaskStore.removeChangeListener(this.updateTaskMarkers);
      // BenchStore.removeChangeListener(this._changed);
      // TaskMapHighLightStore.removeChangeListener(this._handleMarkerHighlight);
      taskIdsWithMarkers = [];
      taskIdMarkerDirectory = {};
    },

    listenForMove: function() {
      root.google.maps.event.addListener(this.map, 'idle', this._handleMove);
    },

    _handleMove: function() {
      // O: latitude
      // // O: south
      // // j: north

      // j: longitude
      // // O: east
      // // j: west
      var northEast = this.map.getBounds().getNorthEast();
      var southWest = this.map.getBounds().getSouthWest();

      var latSouthNorth = this.map.getBounds().O;
      var lngEastWest = this.map.getBounds().j;
      var bounds = {
        northEast: { lat: latSouthNorth.j, lng: lngEastWest.O },
        southWest: { lat: latSouthNorth.O, lng: lngEastWest.j }
      };



      // var filterParams = TaskMapFilterParamsStore.all();
      // filterParams.bounds = bounds;
      // debugger;

      console.log("_handleMove run. bounds: " + bounds);
      FilterActions.updateBounds(bounds);
    },

    listenForMapClick: function() {
      root.google.maps.event.addListener(this.map, 'click', this._clicky);
    },

    handleMapClick: function (e) {
      console.log("handleMapClick run");
      // if (typeof e.latLng !== "undefined") {
      //   var lat = e.latLng.J;
      //   var lng = e.latLng.M;
      //   var coords = { lat: lat, lng: lng } ;
      //   this.history.pushState(null, "benches/new", coords);
      // }
    },

    _clicky: function() {
      console.log("clicky");
      // var marker = new root.google.maps.Marker({
      //   position: { lat: 37.786723, lng: -122.425569},
      //   animation: root.google.maps.Animation.DROP,
      //   title: "test title"
      // });
      // marker.setMap(this.map);
    },

    render: function() {
      // debugger;
      console.log("TaskMap rendered");
      // debugger;
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

// new this.google.maps.Marker({
//   position: { lat: 37.786723, lng: -122.425569},
//   map: this.map,
//   animation: this.google.maps.Animation.DROP,
//   title: "test title"
// });
