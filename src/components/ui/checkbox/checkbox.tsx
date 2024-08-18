import { ComponentPropsWithoutRef } from 'react'

import * as CheckboxRadix from '@radix-ui/react-checkbox'
import clsx from 'clsx'
import { FiCheck } from 'react-icons/fi'

import style from './checkbox.module.scss'

import { useGenerateId } from '../../../common/hooks/useGenerateId'
import { Typography } from '../typography/typography'

export type CheckboxProps = {
  label?: string
} & ComponentPropsWithoutRef<typeof CheckboxRadix.Root>

export const Checkbox = ({ className, disabled, id, label, ...rest }: CheckboxProps) => {
  const generatedId = useGenerateId(id)

  return (
    <div aria-disabled={disabled} className={clsx(style.checkbox, className)}>
      <div className={style.checkboxWrap}>
        <CheckboxRadix.Root
          {...rest}
          className={style.checkboxRoot}
          disabled={disabled}
          id={generatedId}
        >
          <CheckboxRadix.Indicator className={style.checkboxIndicator}>
            <FiCheck />
          </CheckboxRadix.Indicator>
        </CheckboxRadix.Root>
      </div>

      {label && (
        <Typography as={'label'} className={style.label} htmlFor={generatedId} variant={'body2'}>
          {label}
        </Typography>
      )}
    </div>
  )
}
