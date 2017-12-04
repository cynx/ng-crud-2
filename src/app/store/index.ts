import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
import { State, defaultState } from './state'
import 'rxjs/Rx';

const _store = new BehaviorSubject<State>(defaultState);

@Injectable()
export class Store {
  private _store = _store;
  changes = this._store.asObservable().distinctUntilChanged()

  setState(state: State) {
    this._store.next(state);
  }

  getState(): State {
    return this._store.value;
  }

  purge() {
    this._store.next(defaultState);
  }

  getCollection(collection, prop, state) {
    switch(prop){
            case 'doctors': {
        return this.getDoctorsCollection(collection, state);
      }
            case 'patients': {
        return this.getPatientsCollection(collection, state);
      }
          }
  }

  getFilter(collection, prop, id) {
    switch(prop){
            case 'doctors': {
        return this.getDoctorsFilter(collection, id);
      }
            case 'patients': {
        return this.getPatientsFilter(collection, id);
      }
          }
  }

    private getDoctorsCollection(collection, state) {
    return collection.map(item => {
      if (item.Id !== state.Id) {
        return item;
      }
      return Object.assign({}, item, state)
    })
  }
    private getPatientsCollection(collection, state) {
    return collection.map(item => {
      if (item.Id !== state.Id) {
        return item;
      }
      return Object.assign({}, item, state)
    })
  }
  
    private getDoctorsFilter(collection, id) {
    return collection.filter(item => item.Id !== id)
  }
    private getPatientsFilter(collection, id) {
    return collection.filter(item => item.Id !== id)
  }
  }

