
import { map, combine, startWith, now } from '@most/core'
import { component, $node, $text, style, O, Behavior, create, runAt } from 'fufu'
import { newDefaultScheduler } from '@most/scheduler'
import { $row, $column, $examplesRoot } from '../common/common'

import * as designSheet from '../common/style/stylesheet'
import { $Input } from '../common/form/input'
import { InputType } from '../common/form'


const add = (x: number, y: number) => x + y


const extractValue = O(
  map((str: string) => Number(str)),
  startWith(0)
)

const $plus = $node(
  style({
    justifyContent: 'center', alignItems: 'center',
    width: '36px', color: designSheet.theme.system
  }),
  designSheet.displayFlex
)

const $Add = component((
  [sampleX, x]: Behavior<string, number>,
  [sampleY, y]: Behavior<string, number>
) =>
  [
    $column(

      $row(
        $plus(
          $text('+')
        ),
        $column(
          $Input({ type: InputType.NUMBER, setValue: now('0') })(
            {
              value: sampleX(extractValue)
            }
          ),
          $Input({ type: InputType.NUMBER, setValue: now('0') })(
            {
              value: sampleY(extractValue)
            }
          ),
        )
      ),

      $row(
        $node(style({ width: '36px' }))(),
        $text(style({ lineHeight: '46px', fontSize: '28px' }))(map(String, combine(add, x, y)))
      )

    )
  ]
)



const $body = create(map(x => x))(document.body)(
  designSheet.main,
)




runAt(
  $examplesRoot(
    $Add()
  ),
  newDefaultScheduler()
)




