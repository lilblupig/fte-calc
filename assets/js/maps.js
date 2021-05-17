/*
Google Maps API - displays a map of the regions
*/
function initMap() {
    // Produces the map, determines initial zoom level and map center
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 8,
        center: { lng: -2.20000, lat: 51.10000 },
      });

    // Renders a polygon of each region on the map
    // Polygon co-ordinates stored in assets/js/polygons-maps.js
    const mapPolygon = new google.maps.Polygon({
        paths: regionMap, // regionMap is a global variable which is given either bournemouthMap or BristolMap by the region chooser
        strokeColor: "#57245E",
        strokeOpacity: 0.5,
        strokeWeight: 1,
        fillColor: "#8E4E99",
        fillOpacity: 0.35,
    });

    mapPolygon.setMap(map);
};