// Google Maps API - displays a map of the regions, determines initial zoom level and map center
function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 7,
        center: { lng: -1.90000, lat: 51.00000 },
      });

    // Renders a polygon of each region on the map
    // Polygon co-ordinates stored in assets/js/polygons-maps.js
    const mapPolygon = new google.maps.Polygon({
        paths: regionMap,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
    });

    mapPolygon.setMap(map);
};