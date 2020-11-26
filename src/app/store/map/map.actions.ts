import { createAction, props } from "@ngrx/store";

export const actionAddCoordinate = createAction(
  '[MAP] Add Coordinate',
  props<{ lng: number, lat: number }>()
)

export const actionSaveCoordinates = createAction(
  '[MAP] Save Coordinates'
)

export const actionLoadCoordinates = createAction(
  '[MAP] Load Coordinates'
)

export const actionLoadCoordinatesSuccess = createAction(
  '[MAP] Load Coordinates Success',
  props<{ coordinates: number[][] }>()
)
