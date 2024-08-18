import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Button } from '../../ui/button/button'
import { ControlledCheckbox } from '../../ui/checkbox/controlledCheckbox'
import { TextField } from '../../ui/textField/textField'

const loginSchema = z.object({
  email: z.string().min(1, 'Required').email(),
  password: z.string().min(1, 'Required'),
  rememberMe: z.boolean().optional().default(false),
})

export type LoginFormValues = z.infer<typeof loginSchema>
type LoginFormProps = { onSubmit: () => void }

export const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField {...register('email')} error={errors.email?.message} label={'Email'} />
      <TextField {...register('password')} error={errors.password?.message} label={'Password'} />
      <ControlledCheckbox control={control} label={'Remember me'} name={'rememberMe'} />
      <Button type={'submit'}>Submit</Button>
    </form>
  )
}
