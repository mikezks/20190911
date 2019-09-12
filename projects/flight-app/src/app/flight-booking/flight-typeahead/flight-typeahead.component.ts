import { Component, OnInit } from '@angular/core';
import { timer, Subscription, Observable, interval, combineLatest, iif, of } from 'rxjs';
import { take, tap, share, debounceTime, filter, switchMap, startWith, map, distinctUntilChanged } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Flight } from '@flight-workspace/flight-api';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-flight-typeahead',
  templateUrl: './flight-typeahead.component.html',
  styleUrls: ['./flight-typeahead.component.css']
})
export class FlightTypeaheadComponent implements OnInit {
  timerSubscription: Subscription;
  timer$: Observable<number>;

  control = new FormControl();
  flights$: Observable<Flight[]>;
  loading: boolean;
  online$: Observable<boolean>;
  online: boolean;
  
  constructor(private http: HttpClient) { }

  ngOnInit() {
    //this.rxjsDemo();
    this.initTypeahead();
  }

  rxjsDemo(): void {
    this.timer$ =
    timer(0, 1000)
      .pipe(
        //take(5)
        tap(console.log),
        //share()
      );

/*     this.timer$
    .subscribe(); */
  }

  initTypeahead(): void {
    this.control = new FormControl();

    this.online$ =
      interval(2000)
        .pipe(
          startWith(0),
          map(x => Math.random() < 0.5),
          distinctUntilChanged(),
          tap(x => this.online = x)
        );

    this.flights$ =
      this.control
        .valueChanges
        .pipe(
          value => combineLatest(value, this.online$),
          filter(([value, online]) => online),
          map(([value, online]) => value),
          distinctUntilChanged(),
          debounceTime(300),
          //filter((value: string) => value.length > 2),
          switchMap(value =>
            iif(
              () => value.length > 2,
              of(value)
                .pipe(
                  tap(() => this.loading = true),
                  switchMap(from => this.load(value)),
                  tap(() => this.loading = false)
                ),
              of([])
            )
          )          
        );
  }

  load(from: string): Observable<Flight[]>  {
    const url = "http://www.angular.at/api/flight";

    const params = new HttpParams()
                        .set('from', from);

    const headers = new HttpHeaders()
                        .set('Accept', 'application/json');

    return this.http.get<Flight[]>(url, {params, headers});
  }

  ngOnDestroy(): void {
    //this.timerSubscription.unsubscribe();
  }

}
