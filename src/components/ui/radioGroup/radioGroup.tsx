import { ComponentPropsWithoutRef } from 'react'

import * as RadioGroupRadix from '@radix-ui/react-radio-group'
import clsx from 'clsx'

import style from './radioGroup.module.scss'

import { Typography } from '../typography/typography'

type RadioGroupProps = { options: Options[] } & ComponentPropsWithoutRef<
  typeof RadioGroupRadix.Root
>

type Options = { id: string; name: string }

export const RadioGroup = (props: RadioGroupProps) => {
  const { className, disabled, options, ...rest } = props

  return (
    <RadioGroupRadix.Root
      aria-label={'View density'}
      className={clsx(style.radioGroupRoot, className)}
      disabled={disabled}
      {...rest}
    >
      {options.map(({ id, name }) => (
        <div key={id} style={{ alignItems: 'center', display: 'flex' }}>
          <div className={style.itemWrap}>
            <RadioGroupRadix.Item className={style.radioGroupItem} id={id} value={name}>
              <RadioGroupRadix.Indicator className={style.radioGroupIndicator} />
            </RadioGroupRadix.Item>
          </div>

          <Typography as={'label'} className={style.label} htmlFor={id} variant={'body2'}>
            {name}
          </Typography>
        </div>
      ))}
    </RadioGroupRadix.Root>
  )
}
