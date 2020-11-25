import { NgModule } from '@angular/core';
import {
  AfterContentChecked$,
  AfterContentInit$,
  AfterViewChecked$,
  AfterViewInit$,
  DoCheck$,
  OnChanges$,
  OnDestroy$,
  OnInit$
} from './lifecycle';

// @deprecated
@NgModule({
  declarations: [
    OnChanges$, OnInit$, DoCheck$,
    AfterContentInit$, AfterContentChecked$,
    AfterViewInit$, AfterViewChecked$,
    OnDestroy$
  ]
})
export class NeNadaTakModule {}
