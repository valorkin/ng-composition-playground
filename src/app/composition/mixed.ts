// NOTES
// 1. Mixins inherit only methods and properties

// This can live anywhere in your codebase:
import { Component, Input, SimpleChanges } from '@angular/core';
import { filter } from 'rxjs/operators';
import { uniqueIdBase } from '../../../samples/02-split-by-feature/03-unique-prefix';
import { OnChanges$, OnDestroy$, OnInit$ } from '../ng-composition/lifecycle';
import { mixture } from '../ng-composition/pure-mixture';

// todo:
// 1. combine latest
// 2. watch | watchers
// 3. this?
// 4. convert onChange to key\value pairs?
// 5* @Directive() ignore Class is using Angular features but is not decorated. Please add an explicit Angular decorator.
// 6. inject parts via DI
// 7. how to init all the things??? setup function
// 7.1. child provides properties and methods without dependencies
// 7.2. child provides props and methods with dependencies
// 8. Component API should be defined in place - I prefer to be a bit more conservative about it,
// 8> for documentation and typing purposes
// 9. typeahead matching and highlight example
// 10. expose properties\methods to template?
// 11. computed properties
// 12. multi inject functions -> typeahead matching
// 13. samples carousel - timepicker - typeahead
// 14. resolve autocomplete via Symbols


// notes:
// 1. You should not worry about Mixins, because if you use angalar/matireal
// then you already use mixins https://github.com/angular/components/blob/master/src/material/autocomplete/autocomplete.ts

// Steps:
// 0. Perspective on component as an API and documentation for interactions:
// DO
// -- @Inputs - parent to child
// -- properties - rendering
// -- @Output - child to parent
// -- methods event handlers
// DO NOT (composition or NOT)
// -- zero usage of getters and methods in templates
// -- zero async pipe usage in templates
// prefer
// 1. use mixture for observable lifecycles
// 2. inject features, use setup method to inject {props, methods, calculated properties}
// ??? 3. implement interfaces from features, to have properties, methods available in templates
// ??? 4. API for template as a class to mixture, access to name clashes via local Symbols.
//      logic as a separate ?injectable? class

class test {
  temp = 0;
}

const lifecycles = mixture(OnDestroy$, OnInit$, OnChanges$);
const base = mixture(test, uniqueIdBase(`happy-id-`), lifecycles);

@Component({ selector: `happy-clappy-zack`, template: `nada {{temp}} id: {{id}}` })
export class HappyClappyZack extends base {
  @Input() id: string
  @Input() beardLength = 2;
  @Input() scratchingSeverity = 100;

  constructor() {
    super();
    console.log(`constructor`);
    // setup composition api
    this.goTiger();
    this.secondSon();
    return Object.assign(this, { temp: 1 });
  }

  feat1 = () => {
  };

  cleanFeat1() {
  }

  feat2() {
  }

  cleanFeat2() {
  }

  // WITH composition API
  // logic are grouped per feature
  async goTiger(): Promise<void> {
    console.log(`before init`);
    await this.onInit$.toPromise();
    console.log(`after init`);
    // do anything you usually do in ngOnInit
    this.feat1();
    console.log(`before destroy`);
    await this.onDestroy$.toPromise();
    console.log(`after destroy`);
    // cleanup here
    this.cleanFeat2();
  }

  // second feature description
  async secondSon(): Promise<void> {
    await this.onInit$.toPromise();
    // do anything you usually do in ngOnInit
    this.feat2();

    this.onChanges$
      .pipe(filter((value: SimpleChanges) => 'beardLength' in value))
      .subscribe();

    type Properties = keyof HappyClappyZack;
    const onChange = <T1 extends Properties>(key: T1) => {
      return this.onChanges$
        .pipe(filter((value: SimpleChanges) => key in value));
    };

    /*onChange('scratchingSeverity', (value) => {
    });
    onChanges(['scratchingSeverity', 'beardLength'], (value) => {
    });
*/
    /*    this.computedValue = computed(() => this.beardLength * this.scratchingSeverity);

        combineLatest(this.beardLength$, this.scratchingSeverity$)
          .subscribe((length, severity) => {
            this.computedValue = length * severity;
          });*/

    await this.onDestroy$.toPromise();
    // cleanup here
    this.cleanFeat2();
  }
}
