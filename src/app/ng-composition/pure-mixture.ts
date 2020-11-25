import { Type } from '@angular/core';
import { AfterViewChecked$, OnChanges$, OnDestroy$ } from './lifecycle';

// Apply the mixins into the base class via
// the JS at runtime

export function mixture<T1, T2, T3, T4, T5,
  T6, T7, T8, T9, T10>(t1: Type<T1>, t2?: Type<T2>, t3?: Type<T3>, t4?: Type<T4>, t5?: Type<T5>,
                       t6?: Type<T6>, t7?: Type<T7>, t8?: Type<T8>, t9?: Type<T9>, t10?: Type<T10>)
  : Type<T1 & T2 & T3 & T4 & T5 & T6 & T7 & T8 & T9 & T10> {
  class Mixin {
  }

  for (const baseCtor of [...arguments]) {
    if (!baseCtor) {
      continue;
    }
    for (const name of Object.getOwnPropertyNames(baseCtor.prototype)) {
      // merge methods
      if (name !== 'constructor') {
        Object.defineProperty(
          Mixin.prototype,
          name,
          Object.getOwnPropertyDescriptor(baseCtor.prototype, name) as PropertyDescriptor
        );
        continue;
      }
      if (baseCtor.length > 0) {
        continue;
      }
      // merge properties with default values if constructor doesn't have options

      const obj = new baseCtor();
      Object.getOwnPropertyNames(obj)
        .forEach((propName) => {
          Object.defineProperty(
            Mixin.prototype,
            propName,
            Object.getOwnPropertyDescriptor(obj, propName) as PropertyDescriptor
          );
        });
    }
  }

  return Mixin as any;
}
