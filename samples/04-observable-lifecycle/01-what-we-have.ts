import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { AfterContentInit, AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { _MatOptionBase } from '@angular/material/core';

@Component({selector: '', template: ''})
export class ClassicComponent implements AfterContentInit, OnDestroy, OnInit {

  ngOnInit(): void {
    this.setComponentProperties();
  }

  ngAfterContentInit() {
    this._keyManager = new ActiveDescendantKeyManager<_MatOptionBase>(this.options).withWrap();
    this._activeOptionChanges = this._keyManager.change.subscribe(index => {
      this.optionActivated.emit({source: this, option: this.options.toArray()[index] || null});
    });

    // Set the initial visibility state.
    this._setVisibility();
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
