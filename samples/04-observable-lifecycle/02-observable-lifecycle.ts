import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { AfterContentInit, AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { _MatOptionBase } from '@angular/material/core';
import { AfterContentInit$, OnDestroy$, OnInit$ } from '../../src/app/ng-composition/lifecycle';
import { mixture } from '../../src/app/ng-composition/pure-mixture';

@Component({selector: '', template: ''})
export class NotClassicComponent extends mixture(OnInit$, AfterContentInit$, OnDestroy$){
  constructor() {
    super();
    this.enableHooks();
  }

  async enableHooks() {
    await this.onInit$.toPromise();
    this.setComponentProperties();

    await this.afterContentInit$.toPromise();
    this._keyManager = new ActiveDescendantKeyManager<_MatOptionBase>(this.options).withWrap();

    const _activeOptionChanges = this._keyManager.change.subscribe(index => {
      this.optionActivated.emit({source: this, option: this.options.toArray()[index] || null});
    });

    // Set the initial visibility state.
    this._setVisibility();

    await this.onDestroy$.toPromise();
    _activeOptionChanges.unsubscribe();
  }

  ngOnInit(): void {
    this.setComponentProperties();
  }

  ngAfterContentInit() {

  }

  ngOnDestroy() {
    this._activeOptionChanges.unsubscribe();
  }

  setComponentProperties(){};
  _keyManager: any;
  _activeOptionChanges: any;
  optionActivated: any;
  options: any;
  _setVisibility: any;


}
