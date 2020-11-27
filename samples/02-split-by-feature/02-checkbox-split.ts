import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { MatRipple } from '@angular/material/core';
import { mixture } from '../../src/app/ng-composition/pure-mixture';
import { MatCheckboxChange } from './01-checkbox-all';

let nextUniqueId = 0;

const ariaHtml = `
           [attr.aria-label]="ariaLabel || null"
           [attr.aria-labelledby]="ariaLabelledby"
           [attr.aria-checked]="_getAriaChecked()"
           [attr.aria-describedby]="ariaDescribedby"
           `;

/** ----------------------------------------------------------------------------------- */

export class CheckboxAriaApi {
  /**
   * Attached to the aria-label attribute of the host element. In most cases, aria-labelledby will
   * take precedence so this may be omitted.
   */
  @Input('aria-label') ariaLabel: string = '';

  /**
   * Users can specify the `aria-labelledby` attribute which will be forwarded to the input element
   */
  @Input('aria-labelledby') ariaLabelledby: string | null = null;

  /** The 'aria-describedby' attribute is read after the element's label and field type. */
  @Input('aria-describedby') ariaDescribedby: string;

  isAriaChecked: 'true' | 'false' | 'mixed';
}

/** ----------------------------------------------------------------------------------- */

export class CheckboxUniqueId {
  private _uniqueId: string = `mat-checkbox-${++nextUniqueId}`;

  /** A unique id for the checkbox input. If none is supplied, it will be auto-generated. */
  @Input() id: string = this._uniqueId;
}

/** ----------------------------------------------------------------------------------- */

export class CheckboxTemplateProperties {
  /** The native `<input type="checkbox">` element */
  @ViewChild('input') _inputElement: ElementRef<HTMLInputElement>;

  /** Reference to the ripple instance of the checkbox. */
  @ViewChild(MatRipple) ripple: MatRipple;
}

/** ----------------------------------------------------------------------------------- */

export class CheckboxValueAccessor implements ControlValueAccessor {
  /** Whether the checkbox is checked. */
  @Input() checked: boolean;

  /**
   * Whether the checkbox is disabled. This fully overrides the implementation provided by
   * mixinDisabled, but the mixin is still required because mixinTabIndex requires it.
   */
  @Input() disabled: boolean;

  private _controlValueAccessorChangeFn: (value: any) => void = () => {};

  /**
   * Called when the checkbox is blurred. Needed to properly implement ControlValueAccessor.
   * @docs-private
   */
  _onTouched: () => any = () => {};

  // Implemented as part of ControlValueAccessor.
  writeValue(value: any) {
    this.checked = !!value;
  }

  // Implemented as part of ControlValueAccessor.
  registerOnChange(fn: (value: any) => void) {
    this._controlValueAccessorChangeFn = fn;
  }

  // Implemented as part of ControlValueAccessor.
  registerOnTouched(fn: any) {
    this._onTouched = fn;
  }

  // Implemented as part of ControlValueAccessor.
  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }
}

/** ----------------------------------------------------------------------------------- */

export class CheckboxApi {
  /** The value attribute of the native input element */
  @Input() value: string;

  /**
   * Whether the checkbox is indeterminate. This is also known as "mixed" mode and can be used to
   * represent a checkbox with three states, e.g. a checkbox that represents a nested list of
   * checkable items. Note that whenever checkbox is manually clicked, indeterminate is immediately
   * set to false.
   */
  @Input() indeterminate: boolean;

  /** Whether the label should appear after or before the checkbox. Defaults to 'after' */
  @Input() labelPosition: 'before' | 'after' = 'after';

  /** Event emitted when the checkbox's `checked` value changes. */
  @Output() readonly change: EventEmitter<MatCheckboxChange> =
    new EventEmitter<MatCheckboxChange>();

  /** Event emitted when the checkbox's `indeterminate` value changes. */
  @Output() readonly indeterminateChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  /** Name value will be applied to the input element if present */
  @Input() name: string | null = null;

  /** Whether the checkbox is required. */
  @Input() required: boolean;
}

/** ----------------------------------------------------------------------------------- */
