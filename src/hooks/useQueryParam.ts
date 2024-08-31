// Chat GPT

export const useQueryParam = <T>(
  searchParams: URLSearchParams,
  setSearchParams: (searchParams: URLSearchParams) => void,
  param: string,
  defaultValue: T
) => {
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
