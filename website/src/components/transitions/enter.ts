import { $Node, motion, styleInline } from "@aelea/core"
import { combine, continueWith, now } from "@most/core"

export function fadeIn($content: $Node) {
  const fadeIn = motion({ stiffness: 70, damping: 26, precision: 3 }, 0, now(100))
  const slideIn = motion({ stiffness: 270, damping: 46, precision: 3 }, 25, now(0))

  const removeStyle = continueWith(() => now({ opacity: null, transform: null }))

  const animation = styleInline(
    removeStyle(
      combine((opacity, slide) => ({ opacity: `${opacity}%`, transform: `translate(0, ${slide}px)` }), fadeIn, slideIn)
    )
  )

  return animation(
    $content
  )
}