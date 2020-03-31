import mapboxgl from 'mapbox-gl';

const mapboxAccessCode = "pk.eyJ1IjoiYmVuLWFueXdheXMiLCJhIjoiY2p6d3RyMzVhMGVoYjNibGEwNGYzc21zciJ9.T9X-lvJFZrWiFyzYQUPIew";
mapboxgl.accessToken = mapboxAccessCode;
var map = new mapboxgl.Map({
    container: 'map',
    style: 'https://api.maptiler.com/maps/3327a63f-c15d-462a-9f23-ebf73a14254a/style.json?key=jwL83LCYXcsbjHQxJcVH',
    center: [4.868640, 50.813588], // starting position [lng, lat]&lat=&lng=
    zoom: 8.64, // starting zoom
    preserveDrawingBuffer: true
});

map.addControl(new mapboxgl.NavigationControl());

