import { ComponentPropsWithoutRef } from 'react'

import * as RadioGroupRadix from '@radix-ui/react-radio-group'
import clsx from 'clsx'

import style from './radioGroup.module.scss'

import { Typography } from '../typography/typography'

export const RadioGroup = (props: ComponentPropsWithoutRef<typeof RadioGroupRadix.Root>) => {
  const { children, className, disabled, ...rest } = props

  return (
    <RadioGroupRadix.Root
      aria-label={'View density'}
      className={clsx(style.radioGroupRoot, className)}
      disabled={disabled}
      {...rest}
    >
      {children}
    </RadioGroupRadix.Root>
  )
}

type RadioGroupItemProps = {
  label: string
  value: string
}

export const RadioGroupItem = ({ label, value }: RadioGroupItemProps) => {
  return (
    <div key={value} style={{ alignItems: 'center', display: 'flex' }}>
      <div className={style.itemWrap}>
        <RadioGroupRadix.Item className={style.radioGroupItem} id={value} value={value}>
          <RadioGroupRadix.Indicator className={style.radioGroupIndicator} />
        </RadioGroupRadix.Item>
      </div>

      <Typography as={'label'} className={style.label} htmlFor={value} variant={'body2'}>
        {label}
      </Typography>
    </div>
  )
}
