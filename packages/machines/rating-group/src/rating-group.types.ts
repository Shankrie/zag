import type { StateMachine as S } from "@zag-js/core"
import type { CommonProperties, Context, DirectionProperty, PropTypes, RequiredBy } from "@zag-js/types"

/* -----------------------------------------------------------------------------
 * Callback details
 * -----------------------------------------------------------------------------*/

export interface ValueChangeDetails {
  value: number
}

export interface HoverChangeDetails {
  hoveredValue: number
}

/* -----------------------------------------------------------------------------
 * Machine context
 * -----------------------------------------------------------------------------*/

interface IntlTranslations {
  ratingValueText(index: number): string
}

type ElementIds = Partial<{
  root: string
  label: string
  hiddenInput: string
  control: string
  rating(id: string): string
}>

interface PublicContext extends DirectionProperty, CommonProperties {
  /**
   * The ids of the elements in the rating. Useful for composition.
   */
  ids?: ElementIds
  /**
   * Specifies the localized strings that identifies the accessibility elements and their states
   */
  translations: IntlTranslations
  /**
   * The maximum rating value.
   */
  max: number
  /**
   * The name attribute of the rating element (used in forms).
   */
  name?: string
  /**
   * The associate form of the underlying input element.
   */
  form?: string
  /**
   * The current rating value.
   */
  value: number
  /**
   * Whether the rating is readonly.
   */
  readOnly?: boolean
  /**
   * Whether the rating is disabled.
   */
  disabled?: boolean
  /**
   * Whether to allow half stars.
   */
  allowHalf?: boolean
  /**
   * Whether to autofocus the rating.
   */
  autoFocus?: boolean
  /**
   * Function to be called when the rating value changes.
   */
  onValueChange?: (details: ValueChangeDetails) => void
  /**
   * Function to be called when the rating value is hovered.
   */
  onHoverChange?: (details: HoverChangeDetails) => void
}

export type UserDefinedContext = RequiredBy<PublicContext, "id">

type ComputedContext = Readonly<{
  /**
   * @computed
   * Whether the rating is interactive
   */
  isInteractive: boolean
  /**
   * @computed
   * Whether the pointer is hovering over the rating
   */
  isHovering: boolean
  /**
   * @computed
   * Whether the rating is disabled
   */
  isDisabled: boolean
}>

type PrivateContext = Context<{
  /**
   * @internal The value of the hovered rating.
   */
  hoveredValue: number
  /**
   * @internal Whether the fieldset is disabled.
   */
  fieldsetDisabled: boolean
}>

export interface MachineContext extends PublicContext, ComputedContext, PrivateContext {}

export interface MachineState {
  value: "idle" | "hover" | "focus"
}

export type State = S.State<MachineContext, MachineState>

export type Send = S.Send<S.AnyEventObject>

/* -----------------------------------------------------------------------------
 * Component API
 * -----------------------------------------------------------------------------*/

export interface ItemProps {
  index: number
}

export interface ItemState {
  isEqual: boolean
  isValueEmpty: boolean
  isHighlighted: boolean
  isHalf: boolean
  isChecked: boolean
}

export interface MachineApi<T extends PropTypes = PropTypes> {
  /**
   * Sets the value of the rating group
   */
  setValue(value: number): void
  /**
   * Clears the value of the rating group
   */
  clearValue(): void
  /**
   * Whether the rating group is being hovered
   */
  isHovering: boolean
  /**
   * The current value of the rating group
   */
  value: number
  /**
   * The value of the currently hovered rating
   */
  hoveredValue: number
  /**
   * The maximum value of the rating group
   */
  size: number
  /**
   * The array of rating values. Returns an array of numbers from 1 to the max value.
   */
  sizeArray: number[]
  /**
   * Returns the state of a rating item
   */
  getRatingState(props: ItemProps): ItemState

  rootProps: T["element"]
  hiddenInputProps: T["input"]
  labelProps: T["element"]
  controlProps: T["element"]
  getRatingProps(props: ItemProps): T["element"]
}
