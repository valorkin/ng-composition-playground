import {
  OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked,
  AfterViewChecked, AfterViewInit, OnDestroy, SimpleChanges, Injectable, Directive
} from '@angular/core';
import { Subject } from 'rxjs';

// read more at: https://angular.io/guide/lifecycle-hooks

@Directive()
export class OnChanges$ implements OnChanges {
  onChanges$ = new Subject<SimpleChanges>();

  ngOnChanges(changes: SimpleChanges): void {
    this.onChanges$.next(changes);
  }
}

@Directive()
export class OnInit$ implements OnInit {
  onInit$ = new Subject<void>();

  ngOnInit(): void {
    this.onInit$.next();
    this.onInit$.complete();
  }
}

@Directive()
export class DoCheck$ implements DoCheck {
  doCheck$ = new Subject<void>();

  ngDoCheck(): void {
    this.doCheck$.next();
  }
}

@Directive()
export class AfterContentInit$ implements AfterContentInit {
  afterContentInit$ = new Subject<void>();

  ngAfterContentInit(): void {
    this.afterContentInit$.next();
    this.afterContentInit$.complete();
  }
}

@Directive()
export class AfterContentChecked$ implements AfterContentChecked {
  afterContentChecked$ = new Subject<void>();

  ngAfterContentChecked(): void {
    this.afterContentChecked$.next();
  }
}

@Directive()
export class AfterViewInit$ implements AfterViewInit {
  afterViewInit$ = new Subject<void>();

  ngAfterViewInit(): void {
    this.afterViewInit$.next();
    this.afterViewInit$.complete();
  }
}

@Directive()
export class AfterViewChecked$ implements AfterViewChecked {
  afterViewChecked$ = new Subject<void>();

  ngAfterViewChecked(): void {
    this.afterViewChecked$.next();
  }
}

@Directive()
export class OnDestroy$ implements OnDestroy {
  onDestroy$ = new Subject<void>();

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
