import React from 'react'

type Fonts = Record<string, number[]>

// const FONTS: Fonts = {}

// function needsFont(family: string, weight: number) {
//   return !FONTS[family] || !FONTS[family].includes(weight)
// }

// @ts-ignore
const Context: React.Context<Fonts> = React.createContext()

export default function useGoogleFont(font: string, weight: number): void {
  // const context = React.useContext(Context)
  // if (!context) {
  //   throw Error(
  //     `Hook 'useGoogleFont' should not be used outside the 'GoogleFontProvider'.`
  //   )
  // }
  // React.useEffect(() => {
  // const family = font
  //   .trim()
  //   .replace(/("|')+/g, '')
  //   .replace(/\s+/g, '+')
  // if
  // if (needsFont(family, weight)) {
  // }})
}
