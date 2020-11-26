import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 37.75;
  lng = -122.41;

  coordinates: number[][] = [];

  constructor() { }

  ngOnInit() {
    this.map = new mapboxgl.Map({
      accessToken: environment.mapbox.accessToken,
      container: 'map',
      style: this.style,
      zoom: 5,
      center: [-68.13734351262877, 45.137451890638886],
    });
    // Add map controls
    this.map.addControl(new mapboxgl.NavigationControl());
    this.map.on('load', () => {
      this.map.addSource('maine', {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: []
          },
          properties: {}
        }
      });

      this.map.addLayer({
        id: 'maine',
        type: 'fill',
        source: 'maine',
        layout: {},
        paint: {
          "fill-color": '#088',
          "fill-opacity": 0.8
        }
      });
    })

    this.map.on('click', e => {
      console.log(`A click event has occured at ${e.lngLat}`);
      this.coordinates = [
        ...this.coordinates,
        [e.lngLat.lng, e.lngLat.lat]
      ];
      const source = this.map.getSource('maine');
      (<any>source).setData({
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [[...this.coordinates]]
        },
        properties: {}
      });
      debugger;
    })
  }
}
