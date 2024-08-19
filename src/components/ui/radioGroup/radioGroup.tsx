import { ComponentPropsWithoutRef } from 'react'

import * as RadioGroupRadix from '@radix-ui/react-radio-group'
import clsx from 'clsx'

import style from './radioGroup.module.scss'

import { useGenerateId } from '../../../common/hooks/useGenerateId'
import { Typography } from '../typography/typography'

export type RadioGroupProps = ComponentPropsWithoutRef<typeof RadioGroupRadix.Root>

export const RadioGroup = (props: RadioGroupProps) => {
  const { className, disabled, ...rest } = props

  return (
    <RadioGroupRadix.Root
      aria-label={'View density'}
      className={clsx(style.radioGroupRoot, className)}
      disabled={disabled}
      {...rest}
    />
  )
}

type RadioGroupItemProps = {
  label: string
  value: string
}

export const RadioGroupItem = ({ label, value }: RadioGroupItemProps) => {
  const generatedId = useGenerateId()

  return (
    <div key={value} style={{ alignItems: 'center', display: 'flex' }}>
      <div className={style.itemWrap}>
        <RadioGroupRadix.Item className={style.radioGroupItem} id={generatedId} value={value}>
          <RadioGroupRadix.Indicator className={style.radioGroupIndicator} />
        </RadioGroupRadix.Item>
      </div>

      <Typography as={'label'} className={style.label} htmlFor={generatedId} variant={'body2'}>
        {label}
      </Typography>
    </div>
  )
}
