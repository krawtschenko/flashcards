import { ComponentPropsWithoutRef } from 'react'

import * as CheckboxRadix from '@radix-ui/react-checkbox'
import clsx from 'clsx'
import { FiCheck } from 'react-icons/fi'

import style from './checkbox.module.scss'

import { Typography } from '../typography/typography'

type CheckboxProps = {
  className?: string
  label?: string
} & ComponentPropsWithoutRef<typeof CheckboxRadix.Root>

export const Checkbox = ({ className, disabled, label }: CheckboxProps) => {
  return (
    <div aria-disabled={disabled} className={clsx(style.checkbox, className)}>
      <div className={style.checkboxWrap}>
        <CheckboxRadix.Root className={style.checkboxRoot} defaultChecked disabled={disabled}>
          <CheckboxRadix.Indicator className={style.checkboxIndicator}>
            <FiCheck />
          </CheckboxRadix.Indicator>
        </CheckboxRadix.Root>
      </div>

      {label && (
        <Typography className={style.label} variant={'body2'}>
          {label}
        </Typography>
      )}
    </div>
  )
}
