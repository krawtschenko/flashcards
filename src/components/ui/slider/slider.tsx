import { ComponentPropsWithoutRef } from 'react'

import * as SliderRadix from '@radix-ui/react-slider'
import clsx from 'clsx'

import style from './slider.module.scss'

export const Slider = ({
  className,
  ...rest
}: ComponentPropsWithoutRef<typeof SliderRadix.Root>) => {
  return (
    <div className={clsx(style.sliderWrap, className)}>
      <div className={clsx(style.rectangle, rest.disabled && style.disabled)}>
        {rest.value?.[0]}
      </div>
      <SliderRadix.Root className={style.sliderRoot} max={100} step={1} {...rest}>
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
