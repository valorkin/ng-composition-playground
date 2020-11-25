import {
  OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked,
  AfterViewChecked, AfterViewInit, OnDestroy, SimpleChanges, Injectable, Directive
} from '@angular/core';
import { Subject } from 'rxjs';

// read more at: https://angular.io/guide/lifecycle-hooks

@Directive({selector: 'ne-nada-tak-OnChanges$'})
export class OnChanges$ implements OnChanges {
  onChanges$ = new Subject<SimpleChanges>();

  ngOnChanges(changes: SimpleChanges): void {
    this.onChanges$.next(changes);
  }
}

@Directive({selector: 'ne-nada-tak-OnInit$'})
export class OnInit$ implements OnInit {
  onInit$ = new Subject<void>();

  ngOnInit(): void {
    this.onInit$.next();
    this.onInit$.complete();
  }
}

@Directive({selector: 'ne-nada-tak-DoCheck$'})
export class DoCheck$ implements DoCheck {
  doCheck$ = new Subject<void>();

  ngDoCheck(): void {
    this.doCheck$.next();
  }
}

@Directive({selector: 'ne-nada-tak-AfterContentInit$'})
export class AfterContentInit$ implements AfterContentInit {
  afterContentInit$ = new Subject<void>();

  ngAfterContentInit(): void {
    this.afterContentInit$.next();
    this.afterContentInit$.complete();
  }
}

@Directive({selector: 'ne-nada-tak-AfterContentChecked$'})
export class AfterContentChecked$ implements AfterContentChecked {
  afterContentChecked$ = new Subject<void>();

  ngAfterContentChecked(): void {
    this.afterContentChecked$.next();
  }
}

@Directive({selector: 'ne-nada-tak-AfterViewInit$'})
export class AfterViewInit$ implements AfterViewInit {
  afterViewInit$ = new Subject<void>();

  ngAfterViewInit(): void {
    this.afterViewInit$.next();
    this.afterViewInit$.complete();
  }
}

@Directive({selector: 'ne-nada-tak-AfterViewChecked$'})
export class AfterViewChecked$ implements AfterViewChecked {
  afterViewChecked$ = new Subject<void>();

  ngAfterViewChecked(): void {
    this.afterViewChecked$.next();
  }
}

@Directive({selector: 'ne-nada-tak-OnDestroy$'})
export class OnDestroy$ implements OnDestroy {
  onDestroy$ = new Subject<void>();

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
