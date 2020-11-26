import { selectCoordinates } from './../store/map/map.selectors';
import { actionAddCoordinate } from './../store/map/map.actions';
import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { RootState } from '../store/root.state';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy {
  map: mapboxgl.Map;
  $destroyed = new Subject();

  constructor(private store: Store<RootState>) { }

  ngOnInit() {
    this.map = new mapboxgl.Map({
      accessToken: environment.mapbox.accessToken,
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom: 5,
      center: [54.45401027719555, 32.35924477033592],
    });

    this.map.on('load', () => {
      this.map.addSource('iran', {
        type: 'geojson',
        data: null
      });

      this.map.addLayer({
        id: 'farm',
        type: 'fill',
        source: 'iran',
        layout: {},
        paint: {
          "fill-color": '#088',
          "fill-opacity": 0.8
        }
      });

      this.store.select(selectCoordinates).pipe(
        takeUntil(this.$destroyed)
      ).subscribe(coordinates => {
        this.setPolygonData(coordinates);
      })
    })

    this.map.on('click', e => {
      this.store.dispatch(actionAddCoordinate({
        lng: e.lngLat.lng,
        lat: e.lngLat.lat
      }));
    })
  }

  private setPolygonData(coordinates: number[][]): any {
    const source = this.map.getSource('iran');
    (<any>source).setData({
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [[...coordinates]]
      },
      properties: {}
    });
  }

  ngOnDestroy(): void {
    this.$destroyed.next();
  }
}
