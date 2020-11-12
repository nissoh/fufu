import { empty, map, merge, mergeArray } from "@most/core"
import { Stream } from "@most/types"
import { $element, $node, attr, Behavior, component, NodeContainer, event, O, style } from '@aelea/core'
import * as designSheet from '../../common/stylesheet'
import { Control, dismissOp, interactionOp } from "./form"



export interface Checkbox extends Control {
  setCheck?: Stream<boolean>
}

export default (config: Checkbox) => component((
  [interactionBehavior, focusStyle]: Behavior<NodeContainer, true>,
  [dismissBehavior, dismissstyle]: Behavior<NodeContainer, false>,
  [sampleCheck, check]: Behavior<NodeContainer<HTMLInputElement>, boolean>
) => {

  const $overlay = $node(
    designSheet.stretch,
    style({ flex: 1, margin: '3px', }),
    style(
      map(
        ch => ch ? { backgroundColor: designSheet.theme.text } : null,
        merge(check, config.setCheck || empty())
      )
    ),
  )()

  const $checkInput = $element('input')(
    style({ opacity: 0, width: 'inherit', height: 'inherit', margin: '0', cursor: 'pointer', }),
    designSheet.stretch,

    sampleCheck(
      event('change'),
      map(evt => (<HTMLInputElement>evt.target).checked),
    ),

    attr({ type: 'checkbox' }),
    attr(
      map(
        checked => ({ checked }),
        merge(config.setCheck || empty(), check)
      )
    ),
    interactionBehavior(interactionOp),
    dismissBehavior(dismissOp),

  )()


  const containerStyle = O(
    style(
      map(
        active => active ? { borderColor: designSheet.theme.primary } : null,
        mergeArray([focusStyle, dismissstyle])
      )
    ),
    style({ position: 'relative', width: '18px', height: '18px', border: `2px solid ${designSheet.theme.base}` }),
  )

  return [
    $node(containerStyle)(
      $overlay,
      $checkInput
    ),
    {
      check
    }
  ]
})
