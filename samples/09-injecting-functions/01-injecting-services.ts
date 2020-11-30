// first of all avoid temptation to make this services stateful
// think of them as a pure functions
// there are several main reasons to have methods in component to reevaluate it`s state/trigger events
// 1. allow a user to trigger an action from component's template
// 2. react to a change of an input(s)
// 3. react to a change in template

// Bind properties?
// where to store methods definitions?
// 1. API in API related class
// 2. Template related bindings in component?

import { coerceBooleanProperty } from '@angular/cdk/coercion';
/** // 1. allow a user to trigger an action from component's template */
import { Component, Directive, Input } from '@angular/core';

function case1() {

  class SampleService {
    open(comp: Component) {
    }

    close(compRef) {
    }
  }

// for 1 -> setup function
  function setup(service: SampleService) {
    bindMethods(this, {
      open: () => service.open(this),
      close: () => service.close(this)
    });
  }

  /** *********************************** */
  function bindMethods(a: any, b: any) {
  }

  setup(new SampleService());
}

/** // 2. react to a change of an input(s) */
// why bind to inputs? you never should to use getters to calculate values,
// if your components needs to react onSet
// if you need to react on change of several inputs at the same time
// this is a computed properties in a nutshell
// todo: what if need to react on 2 or more properties?
function case2() {

  @Directive()
  class FromThis {
    /** Whether the checkbox is required. */
    @Input()
    get required(): boolean {
      return this._required;
    }

    set required(value: boolean) {
      this._required = coerceBooleanProperty(value);
    }

    private _required: boolean;


    /** Returns the unique id for the visual hidden input. */
    get inputId(): string { return `${this.id || this._uniqueId}-input`; }
  }

  function setup() {
    onSet(this, {
      required: (value) => coerceBooleanProperty(value),
      disabled: coerceBooleanProperty
    });
  }

  function onSet(a: any, b: any) {
  }


}
