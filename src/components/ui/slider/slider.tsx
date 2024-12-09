import { ComponentPropsWithoutRef } from 'react'

import * as SliderRadix from '@radix-ui/react-slider'
import clsx from 'clsx'

import style from './slider.module.scss'

import { Typography } from '../typography/typography'

type SliderProps = {
  value: (number | undefined)[]
} & Omit<ComponentPropsWithoutRef<typeof SliderRadix.Root>, 'value'>

export const Slider = (props: SliderProps) => {
  const { className, title, value, ...rest } = props

  return (
    <div className={clsx(style.sliderWrap, className)}>
      {title && (
        <Typography className={style.title} variant={'body2'}>
          {title}
        </Typography>
      )}

      <div className={clsx(style.rectangle, rest.disabled && style.disabled)}>{value?.[0]}</div>

      <SliderRadix.Root
        className={style.sliderRoot}
        value={[value?.[0] ?? 0, value?.[1] ?? rest.max ?? 0]}
        {...rest}
      >
        <SliderRadix.Track className={style.sliderTrack}>
          <SliderRadix.Range className={style.sliderRange} />
        </SliderRadix.Track>

        <SliderRadix.Thumb aria-label={'Volume'} className={style.sliderThumb} />

        <SliderRadix.Thumb aria-label={'Volume'} className={style.sliderThumb} />
      </SliderRadix.Root>

      <div className={clsx(style.rectangle, rest.disabled && style.disabled)}>{value?.[1]}</div>
    </div>
  )
}
