"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"
import { useZenStore } from "@/lib/store"

export default function SettingsPanel() {
  const { settings, favorites, updateSettings, setShowSettings, startAutoRotate } = useZenStore()

  // Handle auto-rotate interval change
  const handleIntervalChange = (value: string) => {
    updateSettings({ autoRotateInterval: Number.parseInt(value) })
    // Restart the auto-rotation with new interval
    startAutoRotate()
  }

  // Handle auto-rotate toggle
  const handleAutoRotateToggle = (checked: boolean) => {
    updateSettings({ autoRotateEnabled: checked })
    // Restart or stop auto-rotation based on toggle
    startAutoRotate()
  }

  // Handle data source toggle
  const handleDataSourceToggle = (checked: boolean) => {
    updateSettings({ useLocalQuotes: checked })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
    >
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-xl w-full max-w-2xl text-white">
        <div className="flex items-center justify-between p-4 border-b border-white/20">
          <h2 className="text-xl font-semibold">Settings</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowSettings(false)}
            className="text-white hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <Tabs defaultValue="appearance" className="p-4">
          <TabsList className="grid grid-cols-3 mb-4 bg-white/10">
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="behavior">Behavior</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
          </TabsList>

          <TabsContent value="appearance" className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Color Scheme</label>
              <Select value={settings.colorScheme} onValueChange={(value) => updateSettings({ colorScheme: value })}>
                <SelectTrigger className="bg-white/10 border-white/20">
                  <SelectValue placeholder="Select color scheme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="blue">Blue Calm</SelectItem>
                  <SelectItem value="green">Forest Green</SelectItem>
                  <SelectItem value="purple">Mystic Purple</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Font Style</label>
              <Select value={settings.fontStyle} onValueChange={(value) => updateSettings({ fontStyle: value })}>
                <SelectTrigger className="bg-white/10 border-white/20">
                  <SelectValue placeholder="Select font style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="serif">Serif</SelectItem>
                  <SelectItem value="sans">Sans-serif</SelectItem>
                  <SelectItem value="mono">Monospace</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Transition Speed</label>
              <Select
                value={settings.transitionSpeed}
                onValueChange={(value) => updateSettings({ transitionSpeed: value })}
              >
                <SelectTrigger className="bg-white/10 border-white/20">
                  <SelectValue placeholder="Select transition speed" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="slow">Slow</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="fast">Fast</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>

          <TabsContent value="behavior" className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="auto-rotate">Auto-rotate quotes</Label>
                <p className="text-sm text-white/70">Automatically change quotes and images</p>
              </div>
              <Switch id="auto-rotate" checked={settings.autoRotateEnabled} onCheckedChange={handleAutoRotateToggle} />
            </div>

            {settings.autoRotateEnabled && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Rotation Interval</label>
                <Select value={settings.autoRotateInterval.toString()} onValueChange={handleIntervalChange}>
                  <SelectTrigger className="bg-white/10 border-white/20">
                    <SelectValue placeholder="Select interval" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 minute</SelectItem>
                    <SelectItem value="2">2 minutes</SelectItem>
                    <SelectItem value="3">3 minutes</SelectItem>
                    <SelectItem value="5">5 minutes</SelectItem>
                    <SelectItem value="10">10 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <div className="space-y-0.5">
                <Label htmlFor="use-local">Use local quotes only</Label>
                <p className="text-sm text-white/70">Use built-in quotes instead of fetching from API</p>
              </div>
              <Switch id="use-local" checked={settings.useLocalQuotes} onCheckedChange={handleDataSourceToggle} />
            </div>
          </TabsContent>

          <TabsContent value="favorites" className="space-y-4">
            {favorites.length === 0 ? (
              <p className="text-center py-8 text-white/70">No favorite quotes yet.</p>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                {favorites.map((fav, index) => (
                  <div key={index} className="p-4 bg-white/10 rounded-lg">
                    <p className="text-lg mb-2">"{fav.text}"</p>
                    <p className="text-sm text-white/70">— {fav.author}</p>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  )
}

