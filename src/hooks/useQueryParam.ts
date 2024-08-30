// Chat GPT
import { useSearchParams } from 'react-router-dom'

export const useQueryParam = <T>(param: string, defaultValue: T) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const setParam = (value: T | null) => {
    const currentValue = searchParams.get(param)

    if (value === defaultValue || value === null) {
      if (currentValue !== null) {
        searchParams.delete(param)
        setSearchParams(searchParams)
      }
    } else {
      if (currentValue !== String(value)) {
        searchParams.set(param, String(value))
        setSearchParams(searchParams)
      }
    }
  }

  const getParam = () => {
    const currentValue = searchParams.get(param)

    try {
      return currentValue !== null ? (JSON.parse(currentValue) as T) : defaultValue
    } catch (error) {
      return currentValue !== null ? (currentValue as unknown as T) : defaultValue
    }
  }

  return [getParam(), setParam] as const
}
