import {
  css,
  CSSObject,
  DefaultTheme,
  SimpleInterpolation,
  ThemedCssFunction,
} from 'styled-components'
import { breakpoints } from './variables'

export const respondTo = Object.keys(breakpoints).reduce((acc, label) => {
  acc[label] = (
    first: CSSObject | TemplateStringsArray,
    ...interpolations: SimpleInterpolation[]
  ) => css`
    @media (min-width: ${breakpoints[label]}px) {
      ${css(first, ...interpolations)};
    }
  `
  return acc
}, {}) as {
  xs: ThemedCssFunction<DefaultTheme>
  sm: ThemedCssFunction<DefaultTheme>
  md: ThemedCssFunction<DefaultTheme>
  lg: ThemedCssFunction<DefaultTheme>
  xl: ThemedCssFunction<DefaultTheme>
}
