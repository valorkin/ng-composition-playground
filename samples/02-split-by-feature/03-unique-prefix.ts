import { Component, Directive, Input } from '@angular/core';
import { mixture } from '../../src/app/ng-composition/pure-mixture';

let uniqueId = 1;

@Directive()
class UniqueId {
  /** Unique ID to be used by autocomplete trigger's "aria-owns" property. */
  @Input() id: string;
}

const map = new WeakMap();

export function uniqueIdBase(prefix: string) {
  const decor = Object.getOwnPropertyDescriptor(UniqueId.prototype, 'id');
  Object.defineProperty(UniqueId.prototype, 'id', {
    configurable: true,
    enumerable: true,
    get() {
      if (map.has(this)) {
        return map.get(this);
      }
      map.set(this, `${prefix}${uniqueId++}`);
      return map.get(this);
    },
    set(id: string) {
      map.set(this, id);
    }
  });
  return UniqueId;
}

@Component({selector: `your-component`, template: ``})
class ComponentWithUniqueId extends uniqueIdBase(`your-component-name`) {
  @Input() fck: string;
}
