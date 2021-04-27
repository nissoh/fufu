
import { $Node, $svg, $text, attr, Behavior, component, event, IBranch, INode, motion, MOTION_NO_WOBBLE, style, StyleCSS, styleInline } from '@aelea/core'
import { $card, $column, $Field, $icon, $Popover, $row, $Slider, $VirtualScroll, elevation2, Field, layoutSheet, state } from '@aelea/ui-components'
import { pallete } from '@aelea/ui-components-theme'
import { constant, map, merge, now, snapshot } from '@most/core'
import { Stream } from '@most/types'
import { $TokenLsit } from './$tokenList'
import { Token } from './types'

const $path = $svg('path')

export const $caretDown = $path(attr({ d: 'M4.616.296c.71.32 1.326.844 2.038 1.163L13.48 4.52a6.105 6.105 0 005.005 0l6.825-3.061c.71-.32 1.328-.84 2.038-1.162l.125-.053A3.308 3.308 0 0128.715 0a3.19 3.19 0 012.296.976c.66.652.989 1.427.989 2.333 0 .906-.33 1.681-.986 2.333L18.498 18.344a3.467 3.467 0 01-1.14.765c-.444.188-.891.291-1.345.314a3.456 3.456 0 01-1.31-.177 2.263 2.263 0 01-1.038-.695L.95 5.64A3.22 3.22 0 010 3.309C0 2.403.317 1.628.95.98c.317-.324.68-.568 1.088-.732a3.308 3.308 0 011.24-.244 3.19 3.19 0 011.338.293z' }))()
export const $caretDblDown = $path(attr({ d: 'M15.97 28.996c-.497 0-.983-.176-1.37-.493L1.77 17.793a2.15 2.15 0 01-.275-3.021 2.142 2.142 0 013.017-.276l11.465 9.6 11.464-9.254a2.143 2.143 0 013.011.311l.006.012a2.14 2.14 0 01-.175 3.022l-.124.106-12.83 10.345c-.41.258-.884.387-1.358.358z M15.97 18.996c-.497 0-.983-.176-1.37-.493L1.77 7.793a2.15 2.15 0 01-.275-3.021 2.142 2.142 0 013.017-.276l11.465 9.6L27.44 4.842a2.143 2.143 0 013.011.311l.006.012a2.14 2.14 0 01-.175 3.022l-.124.106-12.83 10.345c-.41.258-.884.387-1.358.358z' }))()
export const $xrd = $path(attr({ d: 'M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16zm-3.825-7.457c.175.286.525.457.875.457h.117c.408-.057.7-.286.875-.629l5.891-13.2H26V9h-6.767a1.08 1.08 0 00-.991.629l-5.425 12.114-3.559-4.8c-.175-.286-.525-.457-.875-.457H5v2.171h2.8l4.375 5.886z' }))()
export const $btc = $path(attr({ d: 'M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16zm7.189-17.98c.314-2.096-1.283-3.223-3.465-3.975l.708-2.84-1.728-.43-.69 2.765c-.454-.114-.92-.22-1.385-.326l.695-2.783L15.596 6l-.708 2.839c-.376-.086-.746-.17-1.104-.26l.002-.009-2.384-.595-.46 1.846s1.283.294 1.256.312c.7.175.826.638.805 1.006l-.806 3.235c.048.012.11.03.18.057l-.183-.045-1.13 4.532c-.086.212-.303.531-.793.41.018.025-1.256-.313-1.256-.313l-.858 1.978 2.25.561c.418.105.828.215 1.231.318l-.715 2.872 1.727.43.708-2.84c.472.127.93.245 1.378.357l-.706 2.828 1.728.43.715-2.866c2.948.558 5.164.333 6.097-2.333.752-2.146-.037-3.385-1.588-4.192 1.13-.26 1.98-1.003 2.207-2.538zm-3.95 5.538c-.533 2.147-4.148.986-5.32.695l.95-3.805c1.172.293 4.929.872 4.37 3.11zm.535-5.569c-.487 1.953-3.495.96-4.47.717l.86-3.45c.975.243 4.118.696 3.61 2.733z' }))()
export const $bnb = $path(attr({ d: 'M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16zm-3.884-17.596L16 10.52l3.886 3.886 2.26-2.26L16 6l-6.144 6.144 2.26 2.26zM6 16l2.26 2.26L10.52 16l-2.26-2.26L6 16zm6.116 1.596l-2.263 2.257.003.003L16 26l6.146-6.146v-.001l-2.26-2.26L16 21.48l-3.884-3.884zM21.48 16l2.26 2.26L26 16l-2.26-2.26L21.48 16zm-3.188-.002h.001L16 13.706 14.305 15.4l-.195.195-.401.402-.004.003.004.003 2.29 2.291 2.294-2.293.001-.001-.002-.001z' }))()
export const $usd = $path(attr({ 'clip-rule': 'evenodd', 'fill-rule': 'evenodd', d: 'M21 22.99v-7.98c0-.56-.49-1.01-1.1-1.01h-7.7c-.61 0-1.1.45-1.1 1.01v7.98c0 .56.49 1.01 1.1 1.01h7.7c.61 0 1.1-.45 1.1-1.01zm-4.165-5.604l1.634-.259c-.105-.469-.332-.838-.68-1.107-.346-.27-.847-.425-1.504-.466v-.435h-.641v.435c-.72.038-1.264.233-1.63.584a1.734 1.734 0 00-.545 1.305c0 .381.09.705.272.972.182.263.395.455.642.575.249.12.669.263 1.26.427v1.55c-.204-.099-.352-.213-.443-.342-.088-.129-.158-.338-.211-.628l-1.775.206c.052.293.131.544.237.752a2.147 2.147 0 001.143.997c.269.1.62.169 1.05.207v.83h.641v-.83c.36-.015.665-.062.914-.14a2.2 2.2 0 00.703-.392c.223-.179.405-.401.546-.668.143-.267.215-.56.215-.879 0-.545-.198-.994-.593-1.349-.3-.264-.894-.514-1.785-.751v-1.27c.153.082.261.164.326.246.067.079.142.222.224.43zm-1.191-.698c-.188.061-.318.137-.391.228a.496.496 0 00-.11.32c0 .13.036.243.11.34.076.093.206.172.39.237v-1.125zm.641 4.324c.25-.056.431-.147.545-.273a.625.625 0 00.176-.43.562.562 0 00-.15-.378c-.096-.117-.287-.226-.57-.325v1.406zm3.882-12.929H9.75a.836.836 0 00-.833.834c0 .458.375.833.833.833h10.417A.836.836 0 0021 8.917a.836.836 0 00-.833-.834zm2.083.834a1.042 1.042 0 102.084-.001 1.042 1.042 0 00-2.084 0zM32 15.5C32 24.06 24.837 31 16 31S0 24.06 0 15.5C0 6.94 7.163 0 16 0s16 6.94 16 15.5zM6 7.667C6 6.746 6.746 6 7.667 6H10V5c0-.392.49-.707 1.1-.707h9.8c.61 0 1.1.315 1.1.707v1h2.333C25.254 6 26 6.746 26 7.667v10c0 .92-.746 1.666-1.667 1.666h-1.666v5c0 .921-.33 1.667-1.25 1.667H10.583c-.92 0-1.36-.746-1.36-1.667v-5H7.666a1.666 1.666 0 01-1.667-1.666v-10z' }))()
export const $eth = $svg('g')(
  $path(attr({ d: 'M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16zm7.994-15.781L16.498 4 9 16.22l7.498 4.353 7.496-4.354zM24 17.616l-7.502 4.351L9 17.617l7.498 10.378L24 17.616z' }))(),
  $path(attr({ 'fill-opacity': '.298', d: 'M16.498 4v8.87l7.497 3.35zm0 17.968v6.027L24 17.616z' }))(),
  $path(attr({ 'fill-opacity': '.801', d: 'M16.498 20.573l7.497-4.353-7.497-3.348z' }))(),
  $path(attr({ 'fill-opacity': '.298', d: 'M9 16.22l7.498 4.353v-7.701z' }))(),
)



const $circle = $path(attr({ d: 'M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831' }))

interface Gauge {
  styleCSS?: StyleCSS
  size?: string
  value: Stream<number>
}

const $gaugeMetric = ({ value, size = '24px', styleCSS }: Gauge) => {

  const animateChange = motion(MOTION_NO_WOBBLE, 0, value)
  const attrAniamtion = styleInline(map(n => ({
    strokeDasharray: `${n * 100}, 100`,
    stroke: n > 1 ? pallete.negative : ''
  }), animateChange))

  return $svg('svg')(style({ display: 'block', width: size, height: size, ...styleCSS }), attr({ viewBox: '0 0 36 36' }))(
    $circle(style({ fill: 'none', stroke: pallete.middleground, strokeWidth: '3.8' }))(),
    $circle(style({ fill: 'none', stroke: pallete.foreground, strokeWidth: '3.8' }), attrAniamtion)()
  )
}



const tokenList: Token[] = [
  { $icon: $xrd, label: 'Radix', symbol: 'XRD' },
  { $icon: $btc, label: 'Bitcoin', symbol: 'BTC' },
  { $icon: $eth, label: 'Ethereum', symbol: 'ETH' },
  { $icon: $bnb, label: 'Binance Coin', symbol: 'BNB' },
  { $icon: $usd, label: 'Gambit Dollar', symbol: 'USDG' },
  { $icon: $usd, label: 'Binance Dollar', symbol: 'BUSD' },
]


interface CoinInput {
  token: Token
  field: Field
}

function formatNumber(number: string) {
  return number
  // return Number(number.replace(/,/g, '')).toLocaleString()
}

const coinInput = ({ field, token }: CoinInput) => component((
  [sampleChange, change]: Behavior<any, any>,
  [sampleSwitchTokenPopover, switchTokenPopover]: Behavior<INode, PointerEvent>,
  [sampleSwitchToken, switchToken]: Behavior<Token, Token>,
) => {



  const $tokenList = $TokenLsit(tokenList)({
    choose: sampleSwitchToken()
  })



  return [
    $row(layoutSheet.spacingBig, style({ alignItems: 'center', flex: 1 }))(
    
      $Popover({
        $$popContent: constant($tokenList, switchTokenPopover),
        // overlayBackgroundColor: pallete.background
      })(
        $row(sampleSwitchTokenPopover(event('click')), layoutSheet.spacingSmall, style({ alignItems: 'center', cursor: 'pointer' }))(
          $icon({ $content: token.$icon, fill: pallete.message, width: 42, viewBox: '0 0 32 32' }),
          $icon({ $content: $caretDown, width: 10, viewBox: '0 0 32 19.43' })
        )
      )({}),
      $Field({
        fieldStyle: { borderBottomColor: 'transparent', fontWeight: 'bolder', fontSize: '150%' },
        attributes: { pattern: '^[0-9]*[.,]?[0-9]*$', inputmode: 'decimal' },
        ...field
      })({
        change: sampleChange()
      })
    ),

    { change, switchToken }
  ]
}) 

export const $AtomicSwapExample = component((
  [samplefromInputValueChange, fromInputValueChange]: Behavior<string, string>,
  [sampleClickOnDivide, clickOnDivide]: Behavior<IBranch, PointerEvent>,
  [sampleDivideByPercentage, divideBySlider]: Behavior<number, number>,
  [sampleSwitchTokenSource, switchTokenSource]: Behavior<Token, Token>,
) => {

  const selectedTokenBalance = now(86263.1458)


  const clickOnGauge = sampleClickOnDivide(event('click'))

  const divideByInput = snapshot((balance, change) =>
    1 - (balance - Number(change)) / balance
  , selectedTokenBalance, fromInputValueChange)

  const sliderDivide = snapshot((balance, divide) => balance * divide, selectedTokenBalance, divideBySlider)
  const transferValue = sliderDivide


  const divideControl = merge(divideBySlider, divideByInput)

  // state replay
  const replayDivideControls = state.replayLatest(divideControl)

  return [
    $card(layoutSheet.spacingBig, elevation2, style({ borderRadius: '30px', padding: '30px' }))(

      $Popover({
        $$popContent: constant($column(style({  }))(
          $Slider({ value: replayDivideControls })({
            change: sampleDivideByPercentage()
          }),
        ), clickOnDivide),
        // overlayBackgroundColor: pallete.background
      })(
        $row(style({ alignItems: 'center' }))(
          coinInput({
            field: {
              value: transferValue,
              placeholder: '86263.1458'
            },
            token: tokenList[0]
          })({
            change: samplefromInputValueChange(),
            switchToken: sampleSwitchTokenSource()
          }),
          clickOnGauge(
            $gaugeMetric({ value: replayDivideControls, size: '28px', styleCSS: { height: '100%', cursor: 'pointer' } })
          )
        )
      )({}),

      $row(layoutSheet.spacing, style({ placeContent: 'center', alignItems: 'center' }))(
        $column(style({ flex: 1, borderBottom: `1px solid ${pallete.middleground}` }))(),
        $row(layoutSheet.spacingSmall, style({ alignItems: 'center' }))(
          $text(style({ color: pallete.foreground, fontSize: '75%' }))('Swap into'),
          $icon({ $content: $caretDblDown, width: 10, viewBox: '0 0 32 32' }),
        ),
        $column(style({ flex: 1, borderBottom: `1px solid ${pallete.middleground}` }))(),
      ),

      coinInput({
        field: {
          value: now(formatNumber('4.97453'))
        },
        token: tokenList[5]
      })({}),
    )
  ]
})


