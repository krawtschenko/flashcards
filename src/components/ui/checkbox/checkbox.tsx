import { ComponentPropsWithoutRef } from 'react'

import * as CheckboxRadix from '@radix-ui/react-checkbox'
import clsx from 'clsx'
import { FiCheck } from 'react-icons/fi'

import style from './checkbox.module.scss'

import { Typography } from '../typography/typography'

type CheckboxProps = {
  label?: string
} & ComponentPropsWithoutRef<typeof CheckboxRadix.Root>

export const Checkbox = ({ className, disabled, label, ...rest }: CheckboxProps) => {
  return (
    <div aria-disabled={disabled} className={clsx(style.checkbox, className)}>
      <div className={style.checkboxWrap}>
        <CheckboxRadix.Root
          {...rest}
          className={style.checkboxRoot}
          defaultChecked
          disabled={disabled}
          id={'r1'}
        >
          <CheckboxRadix.Indicator className={style.checkboxIndicator}>
            <FiCheck />
          </CheckboxRadix.Indicator>
        </CheckboxRadix.Root>
      </div>

      {label && (
        <Typography as={'label'} className={style.label} htmlFor={'r1'} variant={'body2'}>
          {label}
        </Typography>
      )}
    </div>
  )
}
