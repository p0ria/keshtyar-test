import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { mapReducer } from './map/map.reducer';
import { RootState } from './root.state';

export const rootReducer: ActionReducerMap<RootState> = {
  map: mapReducer,
}
