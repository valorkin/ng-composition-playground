// first of all avoid temptation to make this services stateful
// think of them as a pure functions
// there are several main reasons to have methods in component to reevaluate it`s state/trigger events
// 1. allow a user to trigger an action from component's template
// 2. react to a change of an input(s)
// 3. react to a property change in template

// Bind properties?
// where to store methods definitions?
// 1. API in API related class
// 2. Template related bindings in component?

import { coerceBooleanProperty } from '@angular/cdk/coercion';
/** // 1. allow a user to trigger an action from component's template */
import { Component, Directive, Input } from '@angular/core';
import { Subject } from 'rxjs';

function case1() {

  class SampleService {
    open(comp) {
    }

    close(compRef) {
    }
  }

// for 1 -> setup function

  @Component({selector: '', template: ''})
  class BindMethods {

    setup(service: SampleService) {
      bindMethods(this, {
        open: () => service.open(this),
        close: () => service.close(this)
      });
    }

  }

  /** *********************************** */
  function bindMethods(a: any, b: any) {
  }
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

    /** *********************************** */

    /** Returns the unique id for the visual hidden input. */
    get inputId(): string {
      return `${this.id || this._uniqueId}-input`;
    }

    id: number;
    _uniqueId: number;
  }

  function setup() {
    onSet(this, {
      required: (value) => coerceBooleanProperty(value),
      // OR short form
      disabled: coerceBooleanProperty
    });
  }

  function onSet(a: any, props: any) {
  }

}


// case 3
// 1. binding Observable to static property
// 2. binding Observable to static property which depends on 2nd property

function case3() {
  function fetch(value: number): Subject<number> {
    return new Subject<number>();
  }

  class BindSample {
    staticProperty: number;

    setup() {
      bindProperty$(this, 'staticProperty', fetch);
    }

    id: number;

    setup2() {

      onSet(this, {
        id: (id) => bindProperty$(this, 'staticProperty', fetch(id)),
      });

      onSet(this, {
        id: (id) => bindProperties$(this, fetch(id), (req) => ({
          isLoading: req.isLoading,
          error: req.error,
          staticProperty: req?.result
        })),
      });


    }
  }

  function bindProperty$(a: any, prop: any, c: any) {
  }

  function bindProperties$(a: any, prop: any, res: any) {
  }

  function onSet(a: any, props: any, c?: any) {
  }
}
