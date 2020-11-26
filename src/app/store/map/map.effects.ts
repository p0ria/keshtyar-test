import { selectCoordinates } from './map.selectors';
import { Constants } from './../../constants';
import { actionLoadCoordinates, actionLoadCoordinatesSuccess, actionSaveCoordinates, actionAddCoordinate } from './map.actions';
import { RootState } from './../root.state';
import { Injectable } from "@angular/core";
import { Actions, ofType, ROOT_EFFECTS_INIT } from "@ngrx/effects";
import { select, Store } from '@ngrx/store';
import { createEffect } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';

@Injectable()
export class MapEffects {
  constructor(
    private actions$: Actions,
    private store: Store<RootState>
  ) { }

  init = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ROOT_EFFECTS_INIT),
        map(_ => actionLoadCoordinates())
      )
  );

  saveCoordinates$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionSaveCoordinates),
        mergeMap(_ =>
          this.store.pipe(
            select(selectCoordinates)
          )
        ),
        map(coordinates => {
          localStorage.setItem(Constants.storageKey, JSON.stringify(coordinates))
        })
      ), { dispatch: false }
  );

  loadCoordinates$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionLoadCoordinates),
        map(_ => {
          const coordinatesJson = localStorage.getItem(Constants.storageKey) || '[]';
          const coordinates = JSON.parse(coordinatesJson);
          return actionLoadCoordinatesSuccess({ coordinates });
        })
      )
  );

  addCoordinate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionAddCoordinate),
        map(_ => actionSaveCoordinates())
      )
  );
}
