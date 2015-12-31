/**
 * Created by Matt Catellier on 2015-12-31.
 */

function initMap() {

    var geoCode =  new google.maps.Geocoder();
    // p1 - properties
    // p2 - callback function?
    setCenter(geoCode, "Vancouver, BC");
}

function setCenter(geocoder, address) {
    geocoder.geocode({
        'address': address
    }, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 8,
                center: results[0].geometry.location
            });
            addAutoComplete(map);
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
            // return null;
        }
    });
}

function addAutoComplete( map ) {
    var input = /** @type {!HTMLInputElement} */(
        document.getElementById('pac-input'));

    var types = document.getElementById('type-selector');
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(types);

    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);
    // to set type appears have to pass in an array of strings
    autocomplete.setTypes(['geocode']);

    autocomplete.addListener('place_changed', function() {

        var place = autocomplete.getPlace();
        if (!place.geometry) {
            window.alert("Autocomplete's returned place contains no geometry");
            return;
        }

        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);  // Why 17? Because it looks good.
        }
        var address = '';
        if (place.address_components) {
            address = [
                (place.address_components[0] && place.address_components[0].short_name || ''),
                (place.address_components[1] && place.address_components[1].short_name || ''),
                (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
        }
    });
}

google.maps.event.addDomListener(window, "load", initMap);