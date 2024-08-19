import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { Checkbox, CheckboxProps } from './checkbox'

type ControlledCheckboxProps<T extends FieldValues> = Omit<CheckboxProps, 'onChange' | 'value'> &
  UseControllerProps<T>

export const ControlledCheckbox = <T extends FieldValues>(props: ControlledCheckboxProps<T>) => {
  const { control, name, ...rest } = props

  const {
    field: { onChange, value },
  } = useController({ control, name })

  return <Checkbox checked={value} id={name} name={name} onCheckedChange={onChange} {...rest} />
}
