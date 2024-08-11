import { ComponentPropsWithoutRef, useState } from 'react'

import clsx from 'clsx'
import { FiEye, FiEyeOff, FiSearch, FiX } from 'react-icons/fi'

import style from './text-field.module.scss'

import { Typography } from '../typography/typography'

type TextFieldProps = {
  disabled?: boolean
  error?: string
  label?: string
  variant?: 'password' | 'search'
} & ComponentPropsWithoutRef<'input'>

export const TextField = (props: TextFieldProps) => {
  const { className, disabled, error, label, variant, ...rest } = props

  const [value, setValue] = useState<string>('')
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const generateType = () => {
    if (variant === 'password' && !showPassword) {
      return 'password'
    } else {
      return 'text'
    }
  }

  const handleTogglePassword = () => {
    if (!disabled) {
      setShowPassword(!showPassword)
    }
  }

  return (
    <div aria-disabled={disabled} className={clsx(style.textField, className)}>
      {label && (
        <Typography className={style.label} variant={'body2'}>
          {label}
        </Typography>
      )}

      <div className={clsx(style.inputContainer, error && style.error)}>
        {variant === 'search' && <FiSearch className={style.searchIcon} />}

        <input
          className={style.input}
          data-value={value && 'true'}
          disabled={disabled}
          onChange={event => setValue(event.currentTarget.value)}
          type={generateType()}
          value={value}
          {...rest}
        />

        {variant === 'password' && (
          <div className={style.eyeIcon} onClick={handleTogglePassword}>
            {showPassword ? <FiEye /> : <FiEyeOff />}
          </div>
        )}

        {variant === 'search' && value && (
          <FiX className={style.clearIcon} onClick={() => setValue('')} />
        )}
      </div>

      {error && (
        <Typography color={'red'} variant={'caption'}>
          {error}
        </Typography>
      )}
    </div>
  )
}
