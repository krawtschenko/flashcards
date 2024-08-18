import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { TextField, TextFieldProps } from './textField'

type ControlledTextFieldProps<T extends FieldValues> = Omit<TextFieldProps, 'onChange' | 'value'> &
  UseControllerProps<T>

export const ControlledTextField = <T extends FieldValues>(props: ControlledTextFieldProps<T>) => {
  const { control, name, ...textFieldProps } = props

  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({ control, name })

  return (
    <TextField
      error={error?.message}
      id={name}
      onChange={onChange}
      value={value}
      {...textFieldProps}
    />
  )
}
