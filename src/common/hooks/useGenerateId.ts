import { useId } from 'react'

export const useGenerateId = (id?: string) => {
  const generatedId = useId()

  return id ? id : generatedId
}
