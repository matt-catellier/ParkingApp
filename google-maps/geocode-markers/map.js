/**
 * Created by Matt Catellier on 2015-12-30.
 */

result = "";

function initMap() {

    var geocoder1 = new google.maps.Geocoder();
    var center = getCenter(geocoder1, 'Vancouver, BC');

    if(center != null) {
        alert(center[0].geometry.location);
    }

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: {lat: -34.397, lng: 150.644}
    });

    var addressArr = ["2075 West 8th Ave, Vancouver, BC"];
    for( var i = 0; i < addressArr.length; i++) {
        var geocoder = new google.maps.Geocoder();
        geocodeMarker(geocoder, map, addressArr[i].toString());
    }

    var geocoder = new google.maps.Geocoder();
    centerMap(geocoder, map, 'Vancouver, BC');

    document.getElementById('submit').addEventListener('click', function() {
        var geocoder = new google.maps.Geocoder();
        geocodeAddress(geocoder, map);
    });

    // want to create a marker and add it to the map based on an address
    // instead of waiting for a click event just create the marker and then do it right away
    // if can do that, than build an array of address and gget muluitpl to appear on the screen



}

function getCenter(geocoder, address) {
    geocoder.geocode({'address': address}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            console.log(results);
            var result = results[0].geometry.location.toJSON();
            return result;
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
            // return null;
        }
    });
}
// will set center of map based on an address
function centerMap(geocoder, resultsMap, address) {
    geocoder.geocode({'address': address}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            // console.log(results);
            resultsMap.setCenter(results[0].geometry.location);
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

// will create marker based on text value
function geocodeAddress(geocoder, resultsMap) {
    var address = document.getElementById('address').value;
    geocoder.geocode({'address': address}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            resultsMap.setCenter(results[0].geometry.location);
            //var marker = new google.maps.Marker({
            //    map: resultsMap,
            //    position: results[0].geometry.location
            //});
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

// will create a marker based on third parameter
function geocodeMarker(geocoder, resultsMap, address) {
    // var address = document.getElementById('address').value;
    geocoder.geocode({'address': address}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            resultsMap.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: resultsMap, // set the map as part of properties rather than another paramter
                position: results[0].geometry.location
            });
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}