export const fallbackQuotes = [
  { text: "The obstacle is the path.", author: "Zen Proverb" },
  { text: "When you realize nothing is lacking, the whole world belongs to you.", author: "Lao Tzu" },
  { text: "The journey of a thousand miles begins with a single step.", author: "Lao Tzu" },
  {
    text: "Before enlightenment, chop wood, carry water. After enlightenment, chop wood, carry water.",
    author: "Zen Proverb",
  },
  {
    text: "When thoughts arise, then do all things arise. When thoughts vanish, then do all things vanish.",
    author: "Zen Proverb",
  },
  {
    text: "In the beginner's mind there are many possibilities, in the expert's mind there are few.",
    author: "Shunryu Suzuki",
  },
  { text: "Nature does not hurry, yet everything is accomplished.", author: "Lao Tzu" },
  { text: "Do not seek to follow in the footsteps of the wise. Seek what they sought.", author: "Matsuo Basho" },
  { text: "The only Zen you find on the tops of mountains is the Zen you bring up there.", author: "Robert M. Pirsig" },
  {
    text: "When you do something, you should burn yourself completely, like a good bonfire, leaving no trace of yourself.",
    author: "Shunryu Suzuki",
  },
]

export const fallbackImages = [
  "/placeholder.svg?height=1080&width=1920&text=Zen+Mountains",
  "/placeholder.svg?height=1080&width=1920&text=Calm+Waters",
  "/placeholder.svg?height=1080&width=1920&text=Forest+Path",
  "/placeholder.svg?height=1080&width=1920&text=Peaceful+Garden",
  "/placeholder.svg?height=1080&width=1920&text=Misty+Morning",
]

export function getRandomQuote() {
  return fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)]
}

export function getRandomImage() {
  return fallbackImages[Math.floor(Math.random() * fallbackImages.length)]
}

