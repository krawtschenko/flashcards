/* eslint-disable no-nested-ternary */

import { useMemo } from 'react'

export const useGenerateColor = () => {
  // Function to generate a random hex color
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF'
    let color = '#'

    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }

    return color
  }

  // Function to lighten a color by a percentage
  const lightenColor = (color: string, percent: number) => {
    const num = parseInt(color.slice(1), 16),
      amt = Math.round(2.55 * percent * 100),
      R = (num >> 16) + amt,
      G = ((num >> 8) & 0x00ff) + amt,
      B = (num & 0x0000ff) + amt

    return (
      '#' +
      (
        0x1000000 +
        (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
        (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
        (B < 255 ? (B < 1 ? 0 : B) : 255)
      )
        .toString(16)
        .slice(1)
    )
  }

  // Function to darken a color by a percentage
  const darkenColor = (color: string, percent: number) => {
    const num = parseInt(color.slice(1), 16),
      amt = Math.round(2.55 * percent * 100),
      R = (num >> 16) - amt,
      G = ((num >> 8) & 0x00ff) - amt,
      B = (num & 0x0000ff) - amt

    return (
      '#' +
      (
        0x1000000 +
        (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
        (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
        (B < 255 ? (B < 1 ? 0 : B) : 255)
      )
        .toString(16)
        .slice(1)
    )
  }

  // Generate a random background color
  const backgroundColor = useMemo(() => getRandomColor(), [])

  // Create a lighter background color for the avatar
  const lightBackground = useMemo(() => lightenColor(backgroundColor, 0.5), [backgroundColor])

  // Create a darker version of the same color for the text
  const textColor = useMemo(() => darkenColor(backgroundColor, 0.2), [backgroundColor])

  return { lightBackground, textColor }
}
