import { Component } from '@angular/core';
import { mixture } from '../../src/app/ng-composition/pure-mixture';

class Country {
}

class State {
}

class City {
}

class CountriesProperties {
  countryName: number;
  country: Country;
  countries: Country[];
}

class StatesProperties {
  stateName: string;
  state: State;
  states: State[];
}

class CitiesProperties {
  cityName: string;
  city: City;
  cities: City[];
}

@Component({selector: '', template: ''})
class SelectCity extends mixture(CountriesProperties, StatesProperties, CitiesProperties) {

  setup() {
    this.countryServ.setup(this);
    this.stateServ.setup(this);
    this.cityServ.setup(this);
  }

  setupInside() {
    // this.countryServ.setup(this);
    onSet(this, {
      countryName: (name) => bindProperty$(this, 'countries', this.countryServ.fetchByName(name))
    });

    // this.statesServ.setup(this);
    onSet(this, {
      countryName: (name) => bindProperty$(this, 'states', this.stateServ.fetchByName(name))
    });

    // this.citiesServ.setup(this);
    onSet(this, {
      countryName: (name) => bindProperty$(this, 'cities', this.cityServ.fetchByName(name))
    });
  }

  countryServ = {setup(comp){}, fetchByName(name) {}};
  stateServ = {setup(comp){}, fetchByName(name) {}};
  cityServ = {setup(comp){}, fetchByName(name) {}};

}

function setupCountries() {

}

function bindProperty$(a: any, prop: any, c: any) {
}

function bindProperties$(a: any, prop: any, res: any) {
}

function onSet(a: any, props: any, c?: any) {
}
