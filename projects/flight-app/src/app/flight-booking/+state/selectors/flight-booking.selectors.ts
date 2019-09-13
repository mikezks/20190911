import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State, FeatureState } from "../reducers/flight-booking.reducer";

export const getFlightBookingState =
        createFeatureSelector<FeatureState, State>('flightBooking');

export const getFlights =
    createSelector(
        getFlightBookingState,
        (state) => state.flights
    );
        
