import { RootState } from './../root.state';
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { MapState } from './map.state';

export const selectMapState = createFeatureSelector<RootState, MapState>(
  'map'
);

export const selectCoordinates = createSelector(
  selectMapState,
  (state: MapState) => state.coordinates
);
