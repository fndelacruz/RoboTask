(function(root) {
  'use strict';
  // this.props.adressChangeListener
  // this.props.handleFocus

  // This example displays an address form, using the autocomplete feature
  // of the Google Places API to help users fill in the information.

  // NOTE: is placeSearch even used here?
  var placeSearch;

  // NOTE: I will only use locality (city name) to have searches limited to
  // San Francisco

  // NOTE: For now, limit locations to within San Francisco
  var checkValidCity = function(city) {
    return city === "San Francisco" ? true : false;
  };
  // Bias the autocomplete object to the user's geographical location,
  // as supplied by the browser's 'navigator.geolocation' object.

  root.LocationEntry = React.createClass({
    componentDidMount: function() {
      this._initAutocomplete();
    },

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

      var city;
      // var city = place.address_components[3].long_name;

      place.address_components.forEach(function(component, idx) {
        if (component.types[0] === "locality") {
          city = component.long_name;
        }
      });

      if (checkValidCity(city)) {
        console.log("Valid city!"); // NOTE: replace this with real feedback message!
        // Get each component of the address from the place details
        // and fill the corresponding field on the form.

        // NOTE: if user presses "enter" on the search field instead of selecting
        // an address below, then an error occurs due to address_component being
        // undefined. HANDLE THIS
        this.props.adressEntryListener(place.formatted_address);
      } else {
        // NOTE: replace this with real feedback message!
        this.props.invalidAddressListener();
        // console.log("Sorry, we only serve San Francisco right now.");
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
              onFocus={this._handleFocus}
              type="text">
            </input>
          </div>

        </div>
      );
    }
  });
}(this));
