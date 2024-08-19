import { ComponentPropsWithoutRef } from 'react'

import * as RadioGroupRadix from '@radix-ui/react-radio-group'
import clsx from 'clsx'

import style from './radioGroup.module.scss'

import { Typography } from '../typography/typography'

export type RadioGroupProps = { options: Option[] } & ComponentPropsWithoutRef<
  typeof RadioGroupRadix.Root
>

type Option = {
  label: string
  value: string
}

export const RadioGroup = (props: RadioGroupProps) => {
  const { className, disabled, options, ...rest } = props

  return (
    <RadioGroupRadix.Root
      className={clsx(style.radioGroupRoot, className)}
      disabled={disabled}
      {...rest}
    >
      {options.map(({ label, value }) => (
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
      ))}
    </RadioGroupRadix.Root>
  )
}

// export const RadioGroupItem = (props: ComponentPropsWithoutRef<typeof RadioGroupRadix.Item>) => {
//   const generatedId = useGenerateId()

//   return (
//     <div style={{ alignItems: 'center', display: 'flex' }}>
//       <div className={style.itemWrap}>
//         <RadioGroupRadix.Item className={style.radioGroupItem} id={generatedId} value={value}>
//           <RadioGroupRadix.Indicator className={style.radioGroupIndicator} />
//         </RadioGroupRadix.Item>
//       </div>

//       <Typography as={'label'} className={style.label} htmlFor={generatedId} variant={'body2'}>
//         {label}
//       </Typography>
//     </div>
//   )
// }
