import { useEffect, useState } from "react"

export function useSearchParamsReplicator<T>(
  fromSearchParams: (searchParams: URLSearchParams) => T,
  toSearchParams: (value: T, existingParams: URLSearchParams) => URLSearchParams,
  defaultValue: T
): [T, (value: T, options?: { push?: boolean }) => void] {
  const [state, setState] = useState<T>(() => {
    // Initialize from URL immediately
    const searchParams = new URLSearchParams(window.location.search)
    return fromSearchParams(searchParams) ?? defaultValue
  })

  useEffect(() => {
    const handlePopState = () => {
      const searchParams = new URLSearchParams(window.location.search)
      setState(fromSearchParams(searchParams))
    }

    window.addEventListener("popstate", handlePopState)
    return () => window.removeEventListener("popstate", handlePopState)
  }, [fromSearchParams])

  const updateSearchParams = (
    value: T,
    options?: { push?: boolean }
  ) => {
    const params = new URLSearchParams(window.location.search)
    const newParams = toSearchParams(value, params)

    const url = `${window.location.pathname}?${newParams.toString()}`

    if (options?.push) {
      window.history.pushState({}, "", url)
    } else {
      window.history.replaceState({}, "", url)
    }

    setState(value)
  }

  return [state, updateSearchParams]
}