/** Base class with all of the `MatAutocomplete` functionality. */
import { Platform } from '@angular/cdk/platform';
import {
  AfterContentInit,
  ChangeDetectorRef,
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  Output
} from '@angular/core';
import {
  MAT_AUTOCOMPLETE_DEFAULT_OPTIONS,
  MatAutocompleteActivatedEvent,
  MatAutocompleteDefaultOptions,
  MatAutocompleteSelectedEvent
} from '@angular/material/autocomplete';
import { CanDisableRipple } from '@angular/material/core';

class _MatAutocompleteMixinBase {
}

/**
 * Autocomplete IDs need to be unique across components, so this counter exists outside of
 * the component definition.
 */
let _uniqueAutocompleteIdCounter = 0;

@Directive()
export abstract class _MatAutocompleteBase extends _MatAutocompleteMixinBase implements AfterContentInit, CanDisableRipple, OnDestroy {

  /** Function that maps an option's control value to its display value in the trigger. */
  @Input() displayWith: ((value: any) => string) | null = null;

  /**
   * Whether the first option should be highlighted when the autocomplete panel is opened.
   * Can be configured globally through the `MAT_AUTOCOMPLETE_DEFAULT_OPTIONS` token.
   */
  @Input() autoActiveFirstOption: boolean;

  /**
   * Specify the width of the autocomplete panel.  Can be any CSS sizing value, otherwise it will
   * match the width of its host.
   */
  @Input() panelWidth: string | number;

  /** Event that is emitted whenever an option from the list is selected. */
  @Output() readonly optionSelected: EventEmitter<MatAutocompleteSelectedEvent> =
    new EventEmitter<MatAutocompleteSelectedEvent>();

  /** Event that is emitted when the autocomplete panel is opened. */
  @Output() readonly opened: EventEmitter<void> = new EventEmitter<void>();

  /** Event that is emitted when the autocomplete panel is closed. */
  @Output() readonly closed: EventEmitter<void> = new EventEmitter<void>();

  /** Emits whenever an option is activated using the keyboard. */
  @Output() readonly optionActivated: EventEmitter<MatAutocompleteActivatedEvent> =
    new EventEmitter<MatAutocompleteActivatedEvent>();

  /**
   * Takes classes set on the host mat-autocomplete element and applies them to the panel
   * inside the overlay container to allow for easy styling.
   */
  @Input('class') classList: string | string[];

  /** Unique ID to be used by autocomplete trigger's "aria-owns" property. */
  id: string = `mat-autocomplete-${_uniqueAutocompleteIdCounter++}`;

  protected constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _elementRef: ElementRef<HTMLElement>,
    @Inject(MAT_AUTOCOMPLETE_DEFAULT_OPTIONS) defaults: MatAutocompleteDefaultOptions,
    platform?: Platform) {
    super();
  }

  ngAfterContentInit(): void {
  }

  ngOnDestroy(): void {
  }

  disableRipple: boolean;
}
