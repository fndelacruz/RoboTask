(function(root) {
  'use strict';
  // this.props.adressChangeListener
  // this.props.handleFocus

  var checkValidCity = function(city) {
    return city === "San Francisco" ? true : false;
  };

  root.LocationEntry = React.createClass({
    componentDidMount: function() { this._initAutocomplete(); },

    _handleFocus: function () {
      this._geolocate();
      this.props.handleFocus();
    },

    _geolocate: function() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var geolocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          var circle = new google.maps.Circle({
            center: geolocation,
            radius: position.coords.accuracy
          });
          this.autocomplete.setBounds(circle.getBounds());
        }.bind(this));
      }
    },

    _initAutocomplete: function() {
      var autocomplete = React.findDOMNode(this.refs.autocomplete);
      this.autocomplete = new google.maps.places.Autocomplete(
        autocomplete,
        {types: ['geocode']}
      );
      this.autocomplete.addListener('place_changed', this._fillInAddress);
    },

    _fillInAddress: function() {
      var place = this.autocomplete.getPlace();
      var city;
      place.address_components.forEach(function(component, idx) {
        if (component.types[0] === "locality") { city = component.long_name; }
      });

      if (checkValidCity(city)) {
        this.props.adressEntryListener(
          place.formatted_address,
          place.geometry.location.lat(),
          place.geometry.location.lng()
        );
      } else { this.props.invalidAddressListener(); }
    },

    renderInput: function() {
      if (typeof this.props.title === "undefined") {
        return (
          <input
            className="autocomplete form-control"
            ref="autocomplete"
            placeholder="Example: 1061 Market St, San Franciso, CA 94103"
            onFocus={this._handleFocus}
            onBlur={this.props.handleLocationBlur}
            onChange={this.props.handleChange}
            id="location-entry"
            type="text">
          </input>
        );
      } else {
        return (
          <input
            className="autocomplete form-control"
            ref="autocomplete"
            placeholder="Example: 1061 Market St, San Franciso, CA 94103"
            onFocus={this._handleFocus}
            onBlur={this.props.handleLocationBlur}
            onChange={this.props.handleChange}
            id="location-entry"
            autoFocus
            type="text">
          </input>
        );
      }
    },

    render: function() {
      return (
        <div id="locationField">
          {this.renderInput()}
        </div>
      );
    }
  });
}(this));
