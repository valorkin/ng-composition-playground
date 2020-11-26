import { Input } from '@angular/core';

const ariaHtml = `
           [attr.aria-label]="ariaLabel || null"
           [attr.aria-labelledby]="ariaLabelledby"
           [attr.aria-checked]="_getAriaChecked()"
           [attr.aria-describedby]="ariaDescribedby"
           `;

export class CheckboxAria {
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

  private _uniqueId: string = `mat-checkbox-${++nextUniqueId}`;

  /** A unique id for the checkbox input. If none is supplied, it will be auto-generated. */
  @Input() id: string = this._uniqueId;

  _getAriaChecked(): 'true' | 'false' | 'mixed' {
    if (this.checked) {
      return 'true';
    }

    return this.indeterminate ? 'mixed' : 'false';
  }
}

