import { Component } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {

    ngOnInit() {
        var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

        mapboxgl.accessToken = 'pk.eyJ1IjoicHJvamVrdGlvIiwiYSI6ImNrdmRqMzh1djZ6N2UydXM3ejloMmV3cjQifQ.HOcupE1cuihoT8GgDKmuDg';
        var map = new mapboxgl.Map({
            container: 'mapa',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [-74.5, 40], // starting position [lng, lat]
            zoom: 9 // starting zoom
        });

    }
}
