import { create } from "zustand"
import { persist } from "zustand/middleware"
import { zenQuotes, backgroundThemes } from "@/lib/zen-data"

// Define types for our state
interface Quote {
  text: string
  author: string
}

interface Background {
  imageUrl: string
}

interface Settings {
  colorScheme: string
  fontStyle: string
  transitionSpeed: string
  autoRotateInterval: number // in minutes
  autoRotateEnabled: boolean
  useLocalQuotes: boolean // New setting to toggle between API and local quotes
}

interface ZenState {
  // Current state
  quotes: Quote[]
  currentQuoteIndex: number
  background: Background
  isLoading: boolean
  isImageLoading: boolean
  searchQuery: string
  showSettings: boolean
  error: string | null

  // Persistent settings
  settings: Settings
  favorites: Quote[]

  // Actions
  fetchQuotes: () => Promise<void>
  fetchRandomImage: () => Promise<void>
  setQuotes: (quotes: Quote[]) => void
  setCurrentQuoteIndex: (index: number) => void
  setBackground: (background: Background) => void
  setIsLoading: (isLoading: boolean) => void
  setIsImageLoading: (isLoading: boolean) => void
  setSearchQuery: (query: string) => void
  setShowSettings: (show: boolean) => void
  setError: (error: string | null) => void
  updateSettings: (settings: Partial<Settings>) => void
  toggleFavorite: (quote: Quote) => void
  loadNewContent: () => void
  nextQuote: () => void
  isFavorite: (quote: Quote) => boolean
  getCurrentQuote: () => Quote
  startAutoRotate: () => void
  stopAutoRotate: () => void
  useLocalData: () => void
}

// Create the store with Zustand
export const useZenStore = create<ZenState>()(
  // Use persist middleware for settings and favorites
  persist(
    (set, get) => ({
      // Initial state
      quotes: [],
      currentQuoteIndex: 0,
      background: { imageUrl: "" },
      isLoading: true,
      isImageLoading: true,
      searchQuery: "",
      showSettings: false,
      error: null,
      settings: {
        colorScheme: "blue",
        fontStyle: "serif",
        transitionSpeed: "normal",
        autoRotateInterval: 3, // 3 minutes default
        autoRotateEnabled: true,
        useLocalQuotes: false, // Default to trying API first
      },
      favorites: [],

      // Fetch quotes from ZenQuotes API or use local data
      fetchQuotes: async () => {
        set({ isLoading: true, error: null })

        // Check if we should use local quotes
        if (get().settings.useLocalQuotes) {
          // Use local quotes
          set({
            quotes: zenQuotes,
            currentQuoteIndex: Math.floor(Math.random() * zenQuotes.length),
            isLoading: false,
          })

          // Fetch a random image
          get().fetchRandomImage()
          return
        }

        try {
          // Try to fetch from the API with a timeout
          const controller = new AbortController()
          const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout

          const response = await fetch("https://zenquotes.io/api/quotes", {
            signal: controller.signal,
            mode: "cors",
            headers: {
              Accept: "application/json",
            },
          })

          clearTimeout(timeoutId)

          if (!response.ok) {
            throw new Error(`Quote API responded with status: ${response.status}`)
          }

          const data = await response.json()

          // Transform the data to our format
          // ZenQuotes API returns quotes with 'q' for quote text and 'a' for author
          const formattedQuotes = data.map((item: any) => ({
            text: item.q,
            author: item.a,
          }))

          if (formattedQuotes.length === 0) {
            throw new Error("No quotes returned from API")
          }

          set({
            quotes: formattedQuotes,
            currentQuoteIndex: 0,
            isLoading: false,
            error: null,
          })

          // After fetching quotes, fetch a random image
          get().fetchRandomImage()
        } catch (error) {
          console.error("Error fetching quotes:", error)

          // Switch to local quotes
          set({
            quotes: zenQuotes,
            currentQuoteIndex: Math.floor(Math.random() * zenQuotes.length),
            isLoading: false,
            error: "Could not fetch quotes from API. Using local quotes instead.",
          })

          // Update setting to use local quotes to avoid repeated failures
          get().updateSettings({ useLocalQuotes: true })

          // Still try to fetch an image
          get().fetchRandomImage()
        }
      },

      // Fetch random nature image or use local fallback
      fetchRandomImage: async () => {
        set({ isImageLoading: true })
        try {
          // Try to fetch from the API with a timeout
          const controller = new AbortController()
          const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout

          const response = await fetch("https://api.algobook.info/v1/randomimage?category=nature", {
            signal: controller.signal,
            mode: "cors",
          })

          clearTimeout(timeoutId)

          if (!response.ok) {
            throw new Error(`Image API responded with status: ${response.status}`)
          }

          // The API returns the image URL directly
          const imageUrl = await response.text()

          set({
            background: { imageUrl },
            isImageLoading: false,
            error: null,
          })
        } catch (error) {
          console.error("Error fetching image:", error)

          // Use fallback image if API fails
          const randomIndex = Math.floor(Math.random() * backgroundThemes.length)
          const fallbackBackground = backgroundThemes[randomIndex]

          set({
            background: { imageUrl: fallbackBackground.imageUrl },
            isImageLoading: false,
          })
        }
      },

      // Switch to using local data only
      useLocalData: () => {
        set((state) => ({
          settings: { ...state.settings, useLocalQuotes: true },
          error: null,
        }))
        get().loadNewContent()
      },

      // State setters
      setQuotes: (quotes) => set({ quotes }),
      setCurrentQuoteIndex: (currentQuoteIndex) => set({ currentQuoteIndex }),
      setBackground: (background) => set({ background }),
      setIsLoading: (isLoading) => set({ isLoading }),
      setIsImageLoading: (isImageLoading) => set({ isImageLoading }),
      setSearchQuery: (searchQuery) => set({ searchQuery }),
      setShowSettings: (showSettings) => set({ showSettings }),
      setError: (error) => set({ error }),

      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),

      toggleFavorite: (quote) =>
        set((state) => {
          const isFavorite = state.favorites.some((fav) => fav.text === quote.text)

          if (isFavorite) {
            return { favorites: state.favorites.filter((fav) => fav.text !== quote.text) }
          } else {
            return { favorites: [...state.favorites, quote] }
          }
        }),

      isFavorite: (quote) => {
        const state = get()
        return state.favorites.some((fav) => fav.text === quote.text)
      },

      getCurrentQuote: () => {
        const { quotes, currentQuoteIndex } = get()
        if (quotes.length === 0) {
          return { text: "Loading...", author: "" }
        }
        return quotes[currentQuoteIndex]
      },

      // Move to the next quote and fetch a new image
      nextQuote: () => {
        const { quotes, currentQuoteIndex } = get()
        if (quotes.length === 0) return

        const nextIndex = (currentQuoteIndex + 1) % quotes.length
        set({ currentQuoteIndex: nextIndex })

        // Fetch a new image for the new quote
        get().fetchRandomImage()
      },

      // Load new content (quotes and image)
      loadNewContent: () => {
        get().fetchQuotes()
      },

      // Auto-rotation timer management
      startAutoRotate: () => {
        const { settings } = get()
        if (!settings.autoRotateEnabled) return

        // Clear any existing interval
        stopAutoRotateTimer()

        // Set up a new interval
        const intervalMs = settings.autoRotateInterval * 60 * 1000 // convert minutes to ms
        autoRotateTimerId = setInterval(() => {
          get().nextQuote()
        }, intervalMs)
      },

      stopAutoRotate: () => {
        stopAutoRotateTimer()
      },
    }),
    {
      name: "zen-tab-storage", // name of the item in localStorage
      partialize: (state) => ({
        settings: state.settings,
        favorites: state.favorites,
      }), // only persist these fields
    },
  ),
)

// Keep track of the auto-rotate timer outside the store
let autoRotateTimerId: NodeJS.Timeout | null = null

function stopAutoRotateTimer() {
  if (autoRotateTimerId) {
    clearInterval(autoRotateTimerId)
    autoRotateTimerId = null
  }
}

