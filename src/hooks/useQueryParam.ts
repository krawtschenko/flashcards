export const useQueryParam = <T extends boolean | number | string>(
  searchParams: URLSearchParams,
  setSearchParams: (searchParams: URLSearchParams) => void,
  param: string,
  defaultValue?: T
) => {
  const paramValue = searchParams.get(param)
  const convertedValue = convertValue(paramValue, defaultValue)

  const setParamValue = (value: T | null) => {
    if (value === null || value === '') {
      searchParams.delete(param)
    } else {
      searchParams.set(param, String(value))
    }
    setSearchParams(searchParams)
  }

  return [convertedValue, setParamValue]
}

function convertValue<T>(value: null | string, defaultValue?: T) {
  if (value === null) {
    return defaultValue ?? null
  }

  if (value === 'true' || value === 'false') {
    return (value === 'true') as unknown as T
  }

  if (!isNaN(Number(value))) {
    return Number(value) as unknown as T
  }

  return value as unknown as T
}
