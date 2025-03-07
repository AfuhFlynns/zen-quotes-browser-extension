"use client";

import type React from "react";

import { useEffect } from "react";
import {
  Search,
  Settings,
  RefreshCw,
  SkipForward,
  CloudOff,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import QuoteDisplay from "@/components/quote-display";
import SettingsPanel from "@/components/settings-panel";
import { useZenStore } from "@/lib/store";

export default function Home() {
  // Get state and actions from Zustand store
  const {
    isLoading,
    isImageLoading,
    background,
    searchQuery,
    showSettings,
    settings,
    error,
    setSearchQuery,
    setShowSettings,
    loadNewContent,
    nextQuote,
    isFavorite,
    toggleFavorite,
    getCurrentQuote,
    startAutoRotate,
    stopAutoRotate,
    useLocalData,
    setError,
  } = useZenStore();

  // Get the current quote
  const quote = getCurrentQuote();

  // Load content on initial render and set up auto-rotation
  useEffect(() => {
    loadNewContent();

    // Start auto-rotation
    startAutoRotate();

    // Clean up on unmount
    return () => {
      stopAutoRotate();
    };
  }, [loadNewContent, startAutoRotate, stopAutoRotate]);

  // Restart auto-rotation when settings change
  useEffect(() => {
    startAutoRotate();
  }, [
    settings.autoRotateInterval,
    settings.autoRotateEnabled,
    startAutoRotate,
  ]);

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // In a real extension, this would use the browser's search API
      // For this demo, we'll just open a Google search
      // https://chatgpt.com/?q=What+is+a+house%3F&hints=search&ref=ext (Using chatgpt search engine)
      // https://www.google.com/search?q=What+is+a+house%3F (Using google search engine)

      // ? Check if the search query is a url https and send to google else send to chatgpt search engine

      const urlRegex =
        /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
      if (urlRegex.test(searchQuery)) {
        window.open(
          `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`,
          "_blank"
        );
      } else
        window.open(
          `https://chatgpt.com/?q=${encodeURIComponent(
            searchQuery
          )}&hints=search&ref=ext`,
          "_blank"
        );
      // Clear the search query
      setSearchQuery("");
    }
  };

  // Apply color scheme based on settings
  const getColorScheme = (): string => {
    switch (settings.colorScheme) {
      case "blue":
        return "bg-gradient-to-br from-blue-900 to-indigo-700";
      case "green":
        return "bg-gradient-to-br from-emerald-900 to-teal-700";
      case "purple":
        return "bg-gradient-to-br from-purple-900 to-violet-700";
      default:
        return "bg-gradient-to-br from-blue-900 to-indigo-700";
    }
  };

  // Apply font style based on settings
  const getFontStyle = () => {
    switch (settings.fontStyle) {
      case "serif":
        return "font-serif";
      case "sans":
        return "font-sans";
      case "mono":
        return "font-mono";
      default:
        return "font-serif";
    }
  };

  // Switch to local data only
  const handleUseLocalData = () => {
    useLocalData();
    setError(null);
  };

  return (
    <main
      className={`min-h-screen flex flex-col items-center justify-between ${getColorScheme()} text-white relative overflow-hidden`}
    >
      {/* Background image with overlay */}
      {background.imageUrl && !isImageLoading && (
        <div className="absolute inset-0 z-0">
          <Image
            src={background.imageUrl || "/placeholder.svg"}
            alt="Relaxing background"
            fill
            className="object-cover opacity-40 transition-opacity duration-1000"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
      )}

      {/* Top bar with buttons */}
      <div className="w-full p-4 flex justify-between z-10">
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={loadNewContent}
            className="text-white hover:bg-white/20"
            aria-label="Refresh quotes and image"
          >
            <RefreshCw className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={nextQuote}
            className="text-white hover:bg-white/20"
            aria-label="Next quote"
          >
            <SkipForward className="h-5 w-5" />
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowSettings(!showSettings)}
          className="text-white hover:bg-white/20"
          aria-label="Open settings"
        >
          <Settings className="h-5 w-5" />
        </Button>
      </div>

      {/* Error message if any */}
      {error && (
        <div className="absolute top-16 left-0 right-0 mx-auto w-max max-w-md bg-red-500/80 text-white px-4 py-2 rounded z-50 flex items-center gap-2">
          <span>{error}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleUseLocalData}
            className="text-white hover:bg-white/20 flex items-center gap-1"
          >
            <CloudOff className="h-4 w-4" />
            <span>Use Local Data</span>
          </Button>
        </div>
      )}

      {/* Main content */}
      <div className="flex flex-col items-center justify-center flex-grow z-10 px-4 max-w-4xl mx-auto">
        {isLoading ? (
          <div className="animate-pulse flex flex-col items-center space-y-8 w-full">
            <div className="h-6 bg-white/20 rounded w-3/4"></div>
            <div className="h-4 bg-white/20 rounded w-1/2"></div>
          </div>
        ) : (
          <QuoteDisplay
            quote={quote}
            isFavorite={isFavorite(quote)}
            onToggleFavorite={() => toggleFavorite(quote)}
            fontStyle={getFontStyle()}
          />
        )}
      </div>

      {/* Auto-rotate indicator */}
      {settings.autoRotateEnabled && (
        <div className="absolute bottom-32 left-0 right-0 mx-auto w-max text-white/50 text-sm">
          Next quote in {settings.autoRotateInterval}{" "}
          {settings.autoRotateInterval === 1 ? "minute" : "minutes"}
        </div>
      )}

      {/* Search bar */}
      <div className="w-full max-w-lg mx-auto mb-16 z-10 px-4">
        <form onSubmit={handleSearch} className="relative">
          <Input
            type="text"
            placeholder="Search the web..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-3 bg-white/10 backdrop-blur-md border-white/20 text-white placeholder:text-white/70 focus:bg-white/20 transition-all"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70" />
        </form>
      </div>

      {/* Settings panel */}
      {showSettings && <SettingsPanel />}
    </main>
  );
}
