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
    getInitialState: function() {
      return ({
        clicked: false,
        tasks: [],
        markers: []
      });
    },
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
    //
    // _handleMarkerHighlight: function() {
    //   var highlightedBenchId = IndexStore.getHighlightedBenchId();
    //   benchIdsWithMarkers.forEach(function(benchIdWithMarkers) {
    //     if (benchIdWithMarkers === highlightedBenchId) {
    //       benchIdMarkerDirectory[benchIdWithMarkers].setAnimation(
    //         google.maps.Animation.BOUNCE
    //       );
    //     } else {
    //       benchIdMarkerDirectory[benchIdWithMarkers].setAnimation();
    //     }
    //   });
    // },

    updateTaskMarkers: function() {
      this.setState({ tasks: WorkableTaskStore.all() });
      this._createNewMarkers(this.state.tasks);
    },

    componentDidMount: function() {
      var map = React.findDOMNode(this.refs.map);
      var mapOptions = {
        center: {lat: 37.7758, lng: -122.435},
        zoom: 13
      };
      this.map = new root.google.maps.Map(map, mapOptions);
      this.listenForMove();
      this.listenForMapClick();
      WorkableTaskStore.addChangeListener(this.updateTaskMarkers);
      // BenchStore.addChangeListener(this._changed);
      // IndexStore.addChangeListener(this._handleMarkerHighlight);
    },

    componentWillReceiveProps: function(tasks) {
      // this._createNewMarkers(tasks.tasks);
    },

    componentWillUnmount: function() {
      WorkableTaskStore.removeChangeListener(this.updateTaskMarkers);
      // BenchStore.removeChangeListener(this._changed);
      // IndexStore.removeChangeListener(this._handleMarkerHighlight);
      taskIdsWithMarkers = [];
      taskIdMarkerDirectory = {};
    },

    listenForMove: function() {
      root.google.maps.event.addListener(this.map, 'idle', this._handleMove);
    },

    _handleMove: function() {
      console.log("_handleMove run");
      // var northEast = this.map.getBounds().getNorthEast();
      // var southWest = this.map.getBounds().getSouthWest();
      // var bounds = {
      //   northEast: { lat: northEast.J, lng: northEast.M },
      //   southWest: { lat: southWest.J, lng: southWest.M }
      // };

      // var filterParams = FilterParamsStore.all();
      // filterParams.bounds = bounds;
      //
      // FilterActions.receiveNewFilterParams(filterParams);
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
      console.log("TaskMap rendered");
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
