import { combine, constant, map, merge, startWith } from "@most/core"
import { $Node, component, attr, event, $element, style, IBranch, StyleCSS, Behavior, styleBehavior } from '@aelea/core'
import { Route } from "@aelea/router"
import * as designSheet from '../common/stylesheet'

interface Link {
  href: string,
  $content: $Node,
  route: Route
}


const $anchor = $element('a')(style({
  transition: 'background-color 0.75s cubic-bezier(0, 1.5, 0.2, 0.18) 0s',
  textDecoration: 'none', padding: '2px 4px', fontSize: '14px',
  color: designSheet.theme.text
}))

export const $Link = ({ href, route, $content }: Link) => component((
  [sampleClick, click]: Behavior<IBranch, string>,
  [sampleActive, active]: Behavior<IBranch, { focused: boolean, match: boolean }>
) => {

  const isRouteMatched = merge(constant(true, route.match), constant(false, route.miss))

  return [
    $anchor(
      styleBehavior(
        map(({ match, focused }): StyleCSS | null => {
          return match ? { color: designSheet.theme.primary, cursor: 'default' }
            : focused ? { backgroundColor: designSheet.theme.primary }
              : null
        }, active)
      ),
      attr({ href }),
      sampleClick(
        event('click'),
        map((clickEv): string => {
          clickEv.preventDefault()

          const pathName = clickEv.currentTarget instanceof HTMLAnchorElement ? clickEv.currentTarget.pathname : null

          if (pathName) {
            history.pushState(null, '', href)
            return pathName
          }

          throw new Error('target anchor contains no href')
        })
      ),
      sampleActive(
        src => {
          const focus = constant(true, merge(event('focus', src), event('pointerenter', src)))
          const blur = constant(false, merge(event('blur', src), event('pointerleave', src)))

          return startWith(false, merge(focus, blur))
        },
        combine((match, focused) => ({ match, focused }), isRouteMatched)
      )
    )($content),

    { click }
  ]
})