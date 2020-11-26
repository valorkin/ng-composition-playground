/** Base class with all of the `MatAutocomplete` functionality. */
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { coerceBooleanProperty, coerceStringArray } from '@angular/cdk/coercion';
import { Platform } from '@angular/cdk/platform';
import {
  AfterContentInit, ChangeDetectorRef,
  Directive,
  ElementRef, EventEmitter, Inject,
  Input,
  OnDestroy, Output,
  QueryList,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {
  MAT_AUTOCOMPLETE_DEFAULT_OPTIONS,
  MatAutocompleteActivatedEvent, MatAutocompleteDefaultOptions,
  MatAutocompleteSelectedEvent
} from '@angular/material/autocomplete';
import { _MatOptgroupBase, _MatOptionBase, CanDisableRipple } from '@angular/material/core';
import { Subscription } from 'rxjs';

class _MatAutocompleteMixinBase {
}

/**
 * Autocomplete IDs need to be unique across components, so this counter exists outside of
 * the component definition.
 */
let _uniqueAutocompleteIdCounter = 0;

@Directive()
export abstract class _MatAutocompleteBase extends _MatAutocompleteMixinBase implements
  AfterContentInit, CanDisableRipple, OnDestroy {
  private _activeOptionChanges = Subscription.EMPTY;

  /** Class to apply to the panel when it's visible. */
  protected abstract _visibleClass: string;

  /** Class to apply to the panel when it's hidden. */
  protected abstract _hiddenClass: string;

  /** Manages active item in option list based on key events. */
  _keyManager: ActiveDescendantKeyManager<_MatOptionBase>;

  /** Whether the autocomplete panel should be visible, depending on option length. */
  showPanel: boolean = false;

  /** Whether the autocomplete panel is open. */
  get isOpen(): boolean {
    return this._isOpen && this.showPanel;
  }

  _isOpen: boolean = false;

  // The @ViewChild query for TemplateRef here needs to be static because some code paths
  // lead to the overlay being created before change detection has finished for this component.
  // Notably, another component may trigger `focus` on the autocomplete-trigger.

  /** @docs-private */
  @ViewChild(TemplateRef, {static: true}) template: TemplateRef<any>;

  /** Element for the panel containing the autocomplete options. */
  @ViewChild('panel') panel: ElementRef;

  /** @docs-private */
  abstract options: QueryList<_MatOptionBase>;

  /** @docs-private */
  abstract optionGroups: QueryList<_MatOptgroupBase>;

  /** Function that maps an option's control value to its display value in the trigger. */
  @Input() displayWith: ((value: any) => string) | null = null;

  /**
   * Whether the first option should be highlighted when the autocomplete panel is opened.
   * Can be configured globally through the `MAT_AUTOCOMPLETE_DEFAULT_OPTIONS` token.
   */
  @Input()
  get autoActiveFirstOption(): boolean {
    return this._autoActiveFirstOption;
  }

  set autoActiveFirstOption(value: boolean) {
    this._autoActiveFirstOption = coerceBooleanProperty(value);
  }

  private _autoActiveFirstOption: boolean;

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
  @Input('class')
  set classList(value: string | string[]) {
    if (value && value.length) {
      this._classList = coerceStringArray(value).reduce((classList, className) => {
        classList[className] = true;
        return classList;
      }, {} as { [key: string]: boolean });
    } else {
      this._classList = {};
    }

    this._setVisibilityClasses(this._classList);
    this._elementRef.nativeElement.className = '';
  }

  _classList: { [key: string]: boolean } = {};

  /** Unique ID to be used by autocomplete trigger's "aria-owns" property. */
  id: string = `mat-autocomplete-${_uniqueAutocompleteIdCounter++}`;

  /**
   * Tells any descendant `mat-optgroup` to use the inert a11y pattern.
   * @docs-private
   */
  readonly inertGroups: boolean;
  disableRipple: boolean;

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

  private _setVisibilityClasses(_classList: {[p: string]: boolean}) {

  }
}
