import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { RadioGroup, RadioGroupProps } from './radioGroup'

type ControlledRadioGroupProps<T extends FieldValues> = Omit<
  RadioGroupProps,
  'onChange' | 'value'
> &
  UseControllerProps<T>

export const ControlledRadioGroup = <T extends FieldValues>({
  control,
  name,
  ...rest
}: ControlledRadioGroupProps<T>) => {
  const {
    field: { onChange, value },
  } = useController({ control, name })

  return <RadioGroup onValueChange={onChange} value={value} {...rest} />
}
