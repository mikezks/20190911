import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { concatMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

import * as AppActions from '../actions/app.actions';


@Injectable()
export class AppEffects {

/* 
  loadApps$ = createEffect(() => this.actions$.pipe(
    ofType(AppActions.loadApps),
    /** An EMPTY observable only emits completion. Replace with your own observable API request /
    concatMap(() => EMPTY)
  ));


  constructor(private actions$: Actions) {} */

}
