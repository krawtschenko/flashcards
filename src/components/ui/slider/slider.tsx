import { ComponentPropsWithoutRef } from 'react'

import * as SliderRadix from '@radix-ui/react-slider'
import clsx from 'clsx'

import style from './slider.module.scss'

import { Typography } from '../typography/typography'

export const Slider = (props: ComponentPropsWithoutRef<typeof SliderRadix.Root>) => {
  const { className, title, ...rest } = props

  return (
    <div className={clsx(style.sliderWrap, className)}>
      {title && (
        <Typography className={style.title} variant={'body2'}>
          {title}
        </Typography>
      )}

      <div className={clsx(style.rectangle, rest.disabled && style.disabled)}>
        {rest.value?.[0]}
      </div>
      <SliderRadix.Root className={style.sliderRoot} {...rest}>
        <SliderRadix.Track className={style.sliderTrack}>
          <SliderRadix.Range className={style.sliderRange} />
        </SliderRadix.Track>
        <SliderRadix.Thumb aria-label={'Volume'} className={style.sliderThumb} />
        <SliderRadix.Thumb aria-label={'Volume'} className={style.sliderThumb} />
      </SliderRadix.Root>
      <div className={clsx(style.rectangle, rest.disabled && style.disabled)}>
        {rest.value?.[1]}
      </div>
    </div>
  )
}
