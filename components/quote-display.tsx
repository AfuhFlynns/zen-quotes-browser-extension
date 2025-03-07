"use client"

import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface QuoteDisplayProps {
  quote: {
    text: string
    author: string
  }
  isFavorite: boolean
  onToggleFavorite: () => void
  fontStyle: string
}

export default function QuoteDisplay({ quote, isFavorite, onToggleFavorite, fontStyle }: QuoteDisplayProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center space-y-6 mb-16"
    >
      <motion.blockquote
        className={`text-3xl md:text-4xl lg:text-5xl font-light leading-relaxed ${fontStyle}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        "{quote.text}"
      </motion.blockquote>

      <motion.div
        className="flex items-center justify-center space-x-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <p className="text-xl opacity-80">— {quote.author}</p>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleFavorite}
          className="text-white hover:bg-white/20"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart className={`h-5 w-5 ${isFavorite ? "fill-white" : ""}`} />
        </Button>
      </motion.div>
    </motion.div>
  )
}

