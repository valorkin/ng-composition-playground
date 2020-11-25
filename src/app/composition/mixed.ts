// NOTES
// 1. Mixins inherit only methods and properties

// This can live anywhere in your codebase:
import { Component, Input, SimpleChanges } from '@angular/core';
import { filter } from 'rxjs/operators';
import { OnChanges$, OnDestroy$, OnInit$ } from '../ng-composition/lifecycle';
import { mixture } from '../ng-composition/pure-mixture';

// todo:
// 1. combine latest
// 2. watch | watchers
// 3. this?
// 4. convert onChange to key\value pairs?
// 5* ignore Class is using Angular features but is not decorated. Please add an explicit Angular decorator.
// 6. inject parts via DI
// 7. how to init all the things??? setup function
// 7.1. child provides properties and methods without dependencies
// 7.2. child provides props and methods with dependencies
// 8. Component API should be defined in place - I prefer to be a bit more conservative about it,
// 8> for documentation and typing purposes
// 9. typeahead matching and highlight example
// 10. expose properties\methods to template?
// 11. computed properties

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
// 3. implement interfaces from features, to have properties, methods available in templates

const mixtureClass = mixture(OnDestroy$, OnInit$, OnChanges$);
interface test {temp: number}

@Component({ selector: `happy-clappy-zack`, template: `nada {{temp}}` })
export class HappyClappyZack extends mixtureClass implements test {

  @Input() beardLength = 2;
  @Input() scratchingSeverity = 100;

  constructor() {
    super();

    // setup composition api
    this.goTiger();
    this.secondSon();
    return Object.assign(this, {temp: 1});
  }

  feat1 = () => {};

  cleanFeat1() {
  }

  feat2() {
  }

  cleanFeat2() {
  }


  // without composition API
  // FIX: logic of feature is mixed in lifecycle hooks
  ngOnInit() {
    this.feat1();
    this.feat2();
  }

  ngOnDestroy() {
    this.feat1();
    this.feat2();
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  // WITH composition API
  // logic are grouped per feature
  async goTiger(): Promise<void> {
    await this.onInit$.toPromise();
    // do anything you usually do in ngOnInit
    this.feat1();

    await this.onDestroy$.toPromise();
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
