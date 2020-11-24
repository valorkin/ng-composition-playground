// NOTES
// 1. Mixins inherit only methods and properties

// This can live anywhere in your codebase:
import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChange, SimpleChanges, Type } from '@angular/core';
import { combineLatest, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

// Each mixin is a traditional ES class
class Jumpable {
  _jump = 1;

  get jumpy() {
    return this._jump;
  }

  jump() {
    this._jump++;
  }
}

class Duckable {
  _duck = 1;

  duck() {
    this._duck++;
  }
}

// Apply the mixins into the base class via
// the JS at runtime

class EmptyClass {
}

// function mixture<T1 extends EmptyClass,
//   T2 extends EmptyClass>(constructors: [Type<T1>, Type<T2>]): Type<T1 & T2>;
function mixture<T1 extends EmptyClass,
  T2 extends EmptyClass = T1,
  T3 extends EmptyClass = T2>(constructors: [Type<T1>, Type<T2>, Type<T3>]): Type<T1 & T2 & T3> {
  class Mixin {
  }

  constructors.forEach((baseCtor) => {
    Object.getOwnPropertyNames(baseCtor.prototype)
      .filter(name => name !== 'constructor')
      .forEach((name) => {
        Object.defineProperty(
          Mixin.prototype,
          name,
          Object.getOwnPropertyDescriptor(baseCtor.prototype, name) as PropertyDescriptor
        );
      });

    for (const Constructor of constructors) {
      if (Constructor.length > 0) {
        continue;
      }
      const obj = new Constructor();
      Object.getOwnPropertyNames(obj)
        .forEach((name) => {
          Object.defineProperty(
            Mixin.prototype,
            name,
            Object.getOwnPropertyDescriptor(obj, name) as PropertyDescriptor
          );
        });
    }

  });
  return Mixin as any;
}

export class OnDestroy$ implements OnDestroy {
  onDestroy$ = new Subject<void>();

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}

export class OnInit$ implements OnInit {
  onInit$ = new Subject<void>();

  ngOnInit(): void {
    this.onInit$.next();
    this.onInit$.complete();
  }
}

export class OnChange$ implements OnChanges {
  onChanges$ = new Subject<SimpleChanges>();

  ngOnChanges(changes: SimpleChanges): void {
    this.onChanges$.next(changes);

    for (const key of Object.keys(changes)) {
      (this as unknown as Record<string, Subject<any>>)[key + `$`]
        .next(changes[key].currentValue);
    }
  }
}

const mixtureClass = mixture<OnDestroy$, OnInit$, OnChange$>([OnDestroy$, OnInit$, OnChange$]);

@Component({ selector: `any` })
export class HappyClappyZack extends mixtureClass {

  @Input() beardLength = 2;
  @Input() scratchingSeverity = 100;

  constructor() {
    super();
    // setup composition api
    this.goTiger();
    this.secondSon();
  }

  feat1() {
  }

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

    this.beardLength$.subscribe((value) => this.scratchingSeverity += 20);

    this.onChanges$
      .pipe(filter((value: SimpleChanges) => 'beardLength' in value))
      .subscribe();

    type Properties = keyof HappyClappyZack;
    function onChange<T1 extends Properties>(key: T1): void {
      return this.onChanges$
        .pipe(filter((value: SimpleChanges) => key in value));
    }

    onChange('scratchingSeverity', (value) => {} )
    onChanges(['scratchingSeverity', 'beardLength'], (value) => {})

    this.computedValue = computed(() => this.beardLength * this.scratchingSeverity);

    combineLatest(this.beardLength$, this.scratchingSeverity$)
      .subscribe((length, severity) => {
        this.computedValue = length * severity;
      });

    await this.onDestroy$.toPromise();
    // cleanup here
    this.cleanFeat2();
  }
}


@Component({
  selector: 'happy-mixture',
  template: `
    <button (click)="duck()">{{_duck}}</button>
    <br/>
    <button (click)="jump()">{{jumpy}}</button>
  `
})
export class HappyMixtureComponent extends mixture<Jumpable, Duckable>([Jumpable, Duckable]) {
  constructor() {
    super();
  }
}
