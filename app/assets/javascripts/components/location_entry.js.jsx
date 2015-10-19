(function(root) {
  'use strict';
  // This example displays an address form, using the autocomplete feature
  // of the Google Places API to help users fill in the information.

  // NOTE: is placeSearch even used here?
  var placeSearch;
  // NOTE: I will only use locality (city name) to have searches limited to
  // San Francisco
  var componentForm = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'short_name',
    country: 'long_name',
    postal_code: 'short_name'
  };

  var fillInAddress = function() {
    // Get the place details from the autocomplete object.
    var place = autocomplete.getPlace();

    for (var component in componentForm) {
      document.getElementById(component).value = '';
      document.getElementById(component).disabled = false;
    }

    // Get each component of the address from the place details
    // and fill the corresponding field on the form.
    for (var i = 0; i < place.address_components.length; i++) {
      var addressType = place.address_components[i].types[0];
      if (componentForm[addressType]) {
        var val = place.address_components[i][componentForm[addressType]];
        document.getElementById(addressType).value = val;
      }
    }
  };

  // Bias the autocomplete object to the user's geographical location,
  // as supplied by the browser's 'navigator.geolocation' object.

  root.LocationEntry = React.createClass({
    componentDidMount: function() {
      this._initAutocomplete();
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
      // Create the autocomplete object, restricting the search to geographical
      // location types.
      var autocomplete = React.findDOMNode(this.refs.autocomplete);
      this.autocomplete = new google.maps.places.Autocomplete(
        autocomplete,
        {types: ['geocode']}
      );

      // When the user selects an address from the dropdown, populate the address
      // fields in the form.
      this.autocomplete.addListener('place_changed', this._fillInAddress);
    },

    _fillInAddress: function() {
      // Get the place details from the autocomplete object.
      var place = this.autocomplete.getPlace();


      for (var component in componentForm) {
        document.getElementById(component).value = '';
        document.getElementById(component).disabled = false;
      }

      // Get each component of the address from the place details
      // and fill the corresponding field on the form.

      // NOTE: if user presses "enter" on the search field instead of selecting
      // an address below, then an error occurs due to address_component being
      // undefined. HANDLE THIS
      for (var i = 0; i < place.address_components.length; i++) {
        var addressType = place.address_components[i].types[0];
        if (componentForm[addressType]) {
          var val = place.address_components[i][componentForm[addressType]];
          document.getElementById(addressType).value = val;
        }
      }
    },

    render: function() {
      return (
        <div>
          <div id="locationField">
            <input
              className="autocomplete form-control"
              ref="autocomplete"
              placeholder="Enter your address"
              onFocus={this._geolocate}
              type="text">
            </input>
          </div>

          <table id="address">
            <tr>
              <td className="label">Street address</td>
              <td className="slimField"><input className="field" id="street_number"
                    disabled="true"></input></td>
              <td className="wideField" colSpan="2"><input className="field" id="route"
                    disabled="true"></input></td>
            </tr>
            <tr>
              <td className="label">City</td>
              <td className="wideField" colSpan="3"><input className="field" id="locality"
                    disabled="true"></input></td>
            </tr>
            <tr>
              <td className="label">State</td>
              <td className="slimField"><input className="field"
                    id="administrative_area_level_1" disabled="true"></input></td>
              <td className="label">Zip code</td>
              <td className="wideField"><input className="field" id="postal_code"
                    disabled="true"></input></td>
            </tr>
            <tr>
              <td className="label">Country</td>
              <td className="wideField" colSpan="3"><input className="field"
                    id="country" disabled="true"></input></td>
            </tr>
          </table>
        </div>
      );
    }
  });
}(this));
