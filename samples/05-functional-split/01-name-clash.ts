import { CdkConnectedOverlay } from '@angular/cdk/overlay';
import { ElementRef, NgZone, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { mixture } from '../../src/app/ng-composition/pure-mixture';

const _canOpen = Symbol('canOpen');
const _triggerRect = Symbol('_triggerRect');
const _calculateOverlayPosition = Symbol('_calculateOverlayPosition');

// NOTE: such open/close extraction will reduce material/select on about 200 lines of code
// not to say tooltips/popovers/datepicker uses almost identical open/close logic for dynamic elements

class EmptyClass {
  [_canOpen]():boolean {}
  open():void {}
}

export class SelectOpenViewProperties {
  /** The last measured value for the trigger's client bounding rect. */
  [_triggerRect]: ClientRect;

  _triggerFontSize = 0;

  /** Trigger that opens the select. */
  @ViewChild('trigger') trigger: ElementRef;

  /**
   * Overlay pane containing the options.
   * @deprecated To be turned into a private API.
   * @breaking-change 10.0.0
   * @docs-private
   */
  @ViewChild(CdkConnectedOverlay) overlayDir: CdkConnectedOverlay;
}



export class SelectOpen extends mixture(EmptyClass, SelectOpenViewProperties) {
  _ngZone: NgZone;

  open(): void {
    if (super[_canOpen]()) {
      super.open();
      this[_triggerRect] = this.trigger.nativeElement.getBoundingClientRect();
      // Note: The computed font-size will be a string pixel value (e.g. "16px").
      // `parseInt` ignores the trailing 'px' and converts this to a number.
      this._triggerFontSize =
        parseInt(getComputedStyle(this.trigger.nativeElement).fontSize || '0', 10);
      this[_calculateOverlayPosition]();

      // Set the font size on the panel element once it exists.
      this._ngZone.onStable.pipe(take(1)).subscribe(() => {
        if (this._triggerFontSize && this.overlayDir.overlayRef &&
          this.overlayDir.overlayRef.overlayElement) {
          this.overlayDir.overlayRef.overlayElement.style.fontSize = `${this._triggerFontSize}px`;
        }
      });
    }
  }

  [_calculateOverlayPosition](): void {}
}
