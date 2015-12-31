/**
 * Created by Matt Catellier on 2015-12-31.
 */
var geocoder;
var map;

function initMap() {

    var geocoder1 = new google.maps.Geocoder();
    setCenter(geocoder1, 'Vancouver, BC');
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
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
            // return null;
        }
    });
}

google.maps.event.addDomListener(window, "load", initMap);