// NOTES
// 1. Mixins inherit only methods and properties

// This can live anywhere in your codebase:
import { Component, Directive, Injectable, Injector, Input, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { distinctUntilChanged, filter, map, takeUntil, tap } from 'rxjs/operators';
import { OnChanges$, OnDestroy$, OnInit$ } from '../../src/app/ng-composition/lifecycle';
import { mixture } from '../../src/app/ng-composition/pure-mixture';

const lifecycles = mixture(OnDestroy$, OnInit$, OnChanges$);
const base = mixture(lifecycles);

@Directive()
export class OnChangesSample extends base {
  @Input() beardLength = 2;
  @Input() scratchingSeverity = 100;
  computed = 0;

  constructor() {
    super();

    onChange(this, 'beardLength', value => this.scratchingSeverity += value);
    onChanges(this, ['beardLength', 'scratchingSeverity'],
      (values => this.computed = values.beardLength * values.scratchingSeverity));
  }
}

function onChange<T extends OnChanges$ & OnDestroy$, K extends keyof T>(
  comp: T, key: K, fn: (value: T[K]) => void, _markForCheck = false) {
  return comp.onChanges$
    .pipe(
      takeUntil(comp.onDestroy$),
      filter(value => !!value[key as string]),
      map((values: SimpleChanges) => values[key as string]?.currentValue),
      distinctUntilChanged(),
      map(value => {
        if (fn) {
          fn(value);
        }
        return value;
      }),
      tap(() => {
        if (_markForCheck) {
          markForCheck();
        }
      })
    );
}

function onChanges<T extends OnChanges$ & OnDestroy$, K extends keyof T>(
  comp: T, key: Array<K>, fn: (values: { [Z in keyof T]: T[K] }) => void, _markForCheck = false) {
  return 'TODO';
}

function markForCheck() {
}
