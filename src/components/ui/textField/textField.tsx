import { ComponentPropsWithoutRef, ReactNode, useState } from 'react'

import clsx from 'clsx'
import { FiEye, FiEyeOff, FiX } from 'react-icons/fi'

import style from './textField.module.scss'

import { useGenerateId } from '../../../common/hooks/useGenerateId'
import { Button } from '../button/button'
import { Typography } from '../typography/typography'

type TextFieldProps = {
  error?: string
  icon?: ReactNode
  label?: string
} & ComponentPropsWithoutRef<'input'>

export const TextField = (props: TextFieldProps) => {
  const { className, disabled, error, icon, id, label, type, ...rest } = props

  const [value, setValue] = useState<string>('')
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const generatedId = useGenerateId(id)

  const handleTogglePassword = () => {
    if (!disabled) {
      setShowPassword(!showPassword)
    }
  }

  return (
    <div aria-disabled={disabled} className={clsx(style.textField, className)}>
      {label && (
        <Typography as={'label'} className={style.label} htmlFor={generatedId} variant={'body2'}>
          {label}
        </Typography>
      )}

      <div className={clsx(style.inputContainer, error && style.error)}>
        {icon && <div className={style.searchIcon}>{icon}</div>}

        <input
          className={style.input}
          data-value={value && 'true'}
          disabled={disabled}
          id={generatedId}
          onChange={event => setValue(event.currentTarget.value)}
          type={showPassword ? 'text' : type}
          value={value}
          {...rest}
        />

        {type === 'password' && value && (
          <Button className={style.eyeIcon} onClick={handleTogglePassword}>
            {showPassword ? <FiEye /> : <FiEyeOff />}
          </Button>
        )}

        {icon && value && (
          <Button className={style.clearIcon} onClick={() => setValue('')}>
            <FiX />
          </Button>
        )}
      </div>

      {error && (
        <Typography className={style.errorMessage} variant={'caption'}>
          {error}
        </Typography>
      )}
    </div>
  )
}
