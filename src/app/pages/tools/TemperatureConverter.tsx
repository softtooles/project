import { useState } from "react";
import { Thermometer } from "lucide-react";
import { motion } from "motion/react";

export function TemperatureConverter() {
  const [celsius, setCelsius] = useState("");
  const [fahrenheit, setFahrenheit] = useState("");
  const [kelvin, setKelvin] = useState("");

  const fromCelsius = (value: string) => {
    setCelsius(value);
    const c = parseFloat(value);
    if (!isNaN(c)) {
      setFahrenheit(((c * 9/5) + 32).toFixed(2));
      setKelvin((c + 273.15).toFixed(2));
    } else {
      setFahrenheit("");
      setKelvin("");
    }
  };

  const fromFahrenheit = (value: string) => {
    setFahrenheit(value);
    const f = parseFloat(value);
    if (!isNaN(f)) {
      setCelsius(((f - 32) * 5/9).toFixed(2));
      setKelvin((((f - 32) * 5/9) + 273.15).toFixed(2));
    } else {
      setCelsius("");
      setKelvin("");
    }
  };

  const fromKelvin = (value: string) => {
    setKelvin(value);
    const k = parseFloat(value);
    if (!isNaN(k)) {
      setCelsius((k - 273.15).toFixed(2));
      setFahrenheit((((k - 273.15) * 9/5) + 32).toFixed(2));
    } else {
      setCelsius("");
      setFahrenheit("");
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-orange-500/10 to-red-500/10 mb-6">
            <Thermometer className="h-12 w-12 text-orange-600 dark:text-orange-400" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Temperature Converter</h1>
          <p className="text-xl text-muted-foreground">
            Convert between Celsius, Fahrenheit, and Kelvin
          </p>
        </motion.div>

        <div className="space-y-6">
          <div className="p-6 rounded-lg bg-card border border-border">
            <label className="block text-sm font-semibold mb-2">Celsius (°C)</label>
            <input
              type="number"
              value={celsius}
              onChange={(e) => fromCelsius(e.target.value)}
              placeholder="0"
              className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-orange-600"
            />
          </div>

          <div className="p-6 rounded-lg bg-card border border-border">
            <label className="block text-sm font-semibold mb-2">Fahrenheit (°F)</label>
            <input
              type="number"
              value={fahrenheit}
              onChange={(e) => fromFahrenheit(e.target.value)}
              placeholder="32"
              className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>

          <div className="p-6 rounded-lg bg-card border border-border">
            <label className="block text-sm font-semibold mb-2">Kelvin (K)</label>
            <input
              type="number"
              value={kelvin}
              onChange={(e) => fromKelvin(e.target.value)}
              placeholder="273.15"
              className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-yellow-600"
            />
          </div>

          <div className="p-6 rounded-lg bg-muted/50">
            <h3 className="font-semibold mb-3">Common Temperatures:</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Water freezes:</span>
                <span>0°C = 32°F = 273.15K</span>
              </div>
              <div className="flex justify-between">
                <span>Room temperature:</span>
                <span>20°C = 68°F = 293.15K</span>
              </div>
              <div className="flex justify-between">
                <span>Body temperature:</span>
                <span>37°C = 98.6°F = 310.15K</span>
              </div>
              <div className="flex justify-between">
                <span>Water boils:</span>
                <span>100°C = 212°F = 373.15K</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
