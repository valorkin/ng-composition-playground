class Countries {
  id: number;
  countries: string[];
}

class States {
  id: number;
  countries: string[];
}

class Cities {
  id: number;
  cities: string[];
}

class SelectCity {

  setup() {
    setupCountries();
    setupStates();
    setupCities();
  }

  setupCountries;
}
