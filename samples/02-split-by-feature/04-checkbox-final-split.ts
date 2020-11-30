import { Component } from '@angular/core';
import { mixture } from '../../src/app/ng-composition/pure-mixture';
import {
  CheckboxApi,
  CheckboxAriaApi, CheckboxInputApi,
  CheckboxTemplateProperties,
  CheckboxUniqueId,
  CheckboxValueAccessor
} from './02-checkbox-split';

const CheckboxBase = mixture(CheckboxApi, CheckboxValueAccessor, CheckboxInputApi,
  CheckboxTemplateProperties, CheckboxUniqueId, CheckboxAriaApi);

@Component({ selector: 'mat-checkbox', template: 'some material template' })
export class CheckboxComponent extends CheckboxBase {
}


function two() {

  @Component({ selector: 'bootstrap-checkbox', template: '' })
  export class CheckboxComponent extends CheckboxBase {

  }

}
