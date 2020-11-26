import { actionLoadCoordinatesSuccess } from './map.actions';
import { Action, createReducer, on, ReducerManager } from "@ngrx/store";
import { initialMapState, MapState } from "./map.state";
import { actionAddCoordinate } from "../map/map.actions";

const reducer = createReducer(
  initialMapState,
  on(actionAddCoordinate,
    (state, action) => ({
      ...state,
      coordinates: [...state.coordinates, [action.lng, action.lat]]
    })
  ),
  on(actionLoadCoordinatesSuccess,
    (state, action) => ({
      ...state,
      coordinates: [...action.coordinates]
    }))
);

export function mapReducer(
  state: MapState | undefined,
  action: Action
) {
  return reducer(state, action);
}
