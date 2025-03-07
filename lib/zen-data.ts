// Collection of zen quotes and background themes for the extension
// This provides reliable fallbacks when APIs are unavailable

export const zenQuotes = [
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
  { text: "Wherever you are, it's the place you need to be.", author: "Pema Chödrön" },
  {
    text: "The true miracle is not walking on water or walking in air, but simply walking on this earth.",
    author: "Thích Nhất Hạnh",
  },
  {
    text: "If you are unable to find the truth right where you are, where else do you expect to find it?",
    author: "Dōgen Zenji",
  },
  { text: "The mind is everything. What you think you become.", author: "Buddha" },
  { text: "Silence is the language of God, all else is poor translation.", author: "Rumi" },
  { text: "The quieter you become, the more you can hear.", author: "Ram Dass" },
  { text: "No snowflake ever falls in the wrong place.", author: "Zen Proverb" },
  { text: "When you've understood this scripture, throw it away.", author: "Zen saying" },
  {
    text: "The present moment is the only moment available to us, and it is the door to all moments.",
    author: "Thích Nhất Hạnh",
  },
  { text: "If your mind isn't clouded by unnecessary things, this is the best season of your life.", author: "Wu-Men" },
  { text: "To seek is to suffer. To seek nothing is bliss.", author: "Bodhidharma" },
  { text: "The search for happiness is one of the chief sources of unhappiness.", author: "Eric Hoffer" },
  {
    text: "Zen is not some kind of excitement, but concentration on our usual everyday routine.",
    author: "Shunryu Suzuki",
  },
  { text: "The way is not in the sky. The way is in the heart.", author: "Buddha" },
  {
    text: "When we are unable to find tranquility within ourselves, it is useless to seek it elsewhere.",
    author: "François de La Rochefoucauld",
  },
  { text: "Muddy water is best cleared by leaving it alone.", author: "Alan Watts" },
  { text: "The less you try to force things, the more satisfying your life will be.", author: "Michael A. Singer" },
  {
    text: "The only way to make sense out of change is to plunge into it, move with it, and join the dance.",
    author: "Alan Watts",
  },
  { text: "Treat every moment as your last. It is not preparation for something else.", author: "Shunryu Suzuki" },
  { text: "Life is a balance of holding on and letting go.", author: "Rumi" },
]

export const backgroundThemes = [
  {
    name: "Mountain Mist",
    gradient: "bg-gradient-to-br from-slate-900 to-blue-900",
    imageUrl: "/placeholder.svg?height=1080&width=1920&text=Mountain+Mist",
  },
  {
    name: "Forest Calm",
    gradient: "bg-gradient-to-br from-emerald-900 to-teal-800",
    imageUrl: "/placeholder.svg?height=1080&width=1920&text=Forest+Calm",
  },
  {
    name: "Ocean Depths",
    gradient: "bg-gradient-to-br from-blue-900 to-indigo-800",
    imageUrl: "/placeholder.svg?height=1080&width=1920&text=Ocean+Depths",
  },
  {
    name: "Desert Sunset",
    gradient: "bg-gradient-to-br from-orange-900 to-rose-800",
    imageUrl: "/placeholder.svg?height=1080&width=1920&text=Desert+Sunset",
  },
  {
    name: "Twilight Sky",
    gradient: "bg-gradient-to-br from-purple-900 to-violet-800",
    imageUrl: "/placeholder.svg?height=1080&width=1920&text=Twilight+Sky",
  },
  {
    name: "Autumn Forest",
    gradient: "bg-gradient-to-br from-amber-800 to-red-900",
    imageUrl: "/placeholder.svg?height=1080&width=1920&text=Autumn+Forest",
  },
  {
    name: "Misty Morning",
    gradient: "bg-gradient-to-br from-gray-700 to-gray-900",
    imageUrl: "/placeholder.svg?height=1080&width=1920&text=Misty+Morning",
  },
  {
    name: "Calm Waters",
    gradient: "bg-gradient-to-br from-cyan-900 to-blue-800",
    imageUrl: "/placeholder.svg?height=1080&width=1920&text=Calm+Waters",
  },
]

// Helper functions to get random items
export function getRandomQuote() {
  return zenQuotes[Math.floor(Math.random() * zenQuotes.length)]
}

export function getRandomBackground() {
  return backgroundThemes[Math.floor(Math.random() * backgroundThemes.length)]
}

