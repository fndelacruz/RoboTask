(function(root) {
  'use strict';

  // var benchIdsWithMarkers = [];
  // var benchIdMarkerDirectory = {};
  //
  // var benchNeedsMarker = function (benchId) {
  //   if (benchIdsWithMarkers.indexOf(benchId) === -1) {
  //     return true;
  //   }
  // };

  var TaskMap = root.TaskMap = React.createClass({
    // mixins: [ReactRouter.History],
    //
    // getInitialState: function() {
    //   return ({
    //     clicked: false
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
    // _createNewMarkers: function(benches) {
    //   benches.forEach(function(bench) {
    //     var benchId = bench.id.toString();
    //     if (benchNeedsMarker(benchId)) {
    //       var marker = new root.google.maps.Marker({
    //         position: { lat: bench.lat, lng: bench.lng },
    //         map: this.map,
    //         animation: root.google.maps.Animation.DROP,
    //         title: bench.description
    //       });
    //
    //       debugger;
    //       benchIdsWithMarkers.push(benchId);
    //       benchIdMarkerDirectory[benchId] = marker;
    //     }
    //   }.bind(this));
    // },
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

    componentDidMount: function() {
      var map = React.findDOMNode(this.refs.map);
      var mapOptions = {
        center: {lat: 37.7758, lng: -122.435},
        zoom: 13
      };
      this.map = new root.google.maps.Map(map, mapOptions);

      this.listenForMove();
      // this.listenForMapClick();
      // BenchStore.addChangeListener(this._changed);
      // IndexStore.addChangeListener(this._handleMarkerHighlight);
    },

    componentWillUnmount: function() {
      // BenchStore.removeChangeListener(this._changed);
      // IndexStore.removeChangeListener(this._handleMarkerHighlight);
      // benchIdsWithMarkers = [];
      // benchIdMarkerDirectory = {};
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
      root.google.maps.event.addListener(this.map, 'click', this.handleMapClick);
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
