"use client"

import { useState, useEffect } from "react"

export function useLocalStorage<T>(key: string, initialValue: T) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue
    }

    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key)
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.log(error)
      return initialValue
    }
  })

  // Return a wrapped version of useState's setter function that
  // persists the new value to localStorage.
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value
      // Save state
      setStoredValue(valueToStore)
      // Save to local storage
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.log(error)
    }
  }

  // Update local storage if the key changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      const item = window.localStorage.getItem(key)
      if (item) {
        try {
          const parsedItem = JSON.parse(item)
          // Only update state if the value is different
          if (JSON.stringify(parsedItem) !== JSON.stringify(storedValue)) {
            setStoredValue(parsedItem)
          }
        } catch (error) {
          console.log(error)
        }
      } else {
        // If item doesn't exist in localStorage, set it
        window.localStorage.setItem(key, JSON.stringify(initialValue))
      }
    }
  }, [key])

  return [storedValue, setValue] as const
}

