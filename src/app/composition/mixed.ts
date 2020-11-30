// NOTES
// 1. Mixins inherit only methods and properties

// This can live anywhere in your codebase:
import {
  Component,
  Inject,
  inject,
  Injectable,
  InjectionToken,
  Injector,
  Input,
  Renderer2,
  RendererFactory2,
  SimpleChanges,
  Type
} from '@angular/core';
import { Observable } from 'rxjs';
import { fromArray } from 'rxjs/internal/observable/fromArray';
import { distinctUntilChanged, filter, map, takeUntil, tap } from 'rxjs/operators';
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
// 1. You should not worry about Mixins, because if you use angular/matireal
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
@Injectable({ providedIn: 'any' })
class TestService {
  temp = 0;

  constructor(renderer: Renderer2) {
    console.log(renderer);
  }

  fetch(): Observable<number> {
    return fromArray([1, 2, 3, 4]);
  }
}

const lifecycles = mixture(OnDestroy$, OnInit$, OnChanges$);
const MixinsBase = mixture(uniqueIdBase(`unique-id-`), lifecycles);

export const TEST_TOKEN = new InjectionToken<TestService>('test toke', {
  providedIn: 'any',
  factory: () => new TestService(inject(RendererFactory2 as Type<RendererFactory2>).createRenderer(null, null))
})

@Component({selector: `based-on-mixins`, template: `my {{id}}`})
export class BasedOnMixture extends MixinsBase {
  @Input() beardLength = 2;
  @Input() scratchingSeverity = 100;
  computed = 0;
  test = 'test';

  constructor(@Inject(TEST_TOKEN) private readonly service: TestService, renderer: Renderer2) {
    super();
    // todo:
    // 1. bind to properties
    // 2. watch inputs -> calculated
    // ?. on set?


    onChange(this, 'beardLength', value => this.scratchingSeverity += value);
    onChanges(this, ['beardLength', 'scratchingSeverity'],
      (values => this.computed = values.beardLength * values.scratchingSeverity ));


    function onChange<T extends OnChanges$ & OnDestroy$, K extends keyof T>(
      comp: T, key: K, fn: (value: T[K]) => void, _markForCheck = false) {
      return comp.onChanges$
        .pipe(
          takeUntil(comp.onDestroy$),
          filter(value => !!value[key as string]),
          map((values: SimpleChanges) => values[key as string]?.currentValue),
          distinctUntilChanged(),
          tap(value => {
            if (fn) {
              fn(value);
            }
            if (_markForCheck) {
              markForCheck();
            }
          })
        );
    }

    function onChanges<T extends OnChanges$ & OnDestroy$, K extends keyof T>(
      comp: T, key: Array<K>, fn: (values: {[Z in keyof T]: T[K]}) => void, _markForCheck = false) {
      return 'TODO';
    }

    function markForCheck(){}

    // setup(this, test, {fetched: test.fetch};
    // setup composition api
    function setup<T, K>(that: T, provider: K, props: Partial<{ [Z in keyof T]: Observable<T[Z]> }>) {
    }

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

    const beardSub = this.onChanges$
      .pipe(filter((value: SimpleChanges) => 'beardLength' in value))
      .subscribe();

    type Properties = keyof BasedOnMixture;
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
    beardSub.unsubscribe();
    this.cleanFeat2();
  }
}
