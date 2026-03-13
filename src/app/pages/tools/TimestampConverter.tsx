import { useState, useEffect } from "react";
import { Copy, Clock, Calendar, AlertCircle } from "lucide-react";
import { motion } from "motion/react";
import { copyToClipboard } from "../../utils/clipboard";
import { toast } from "sonner";

export function TimestampConverter() {
  const [timestamp, setTimestamp] = useState("");
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [convertedDate, setConvertedDate] = useState("");
  const [error, setError] = useState("");
  
  // Date to timestamp inputs
  const [dateInput, setDateInput] = useState("");
  const [timeInput, setTimeInput] = useState("");
  const [dateToTimestamp, setDateToTimestamp] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const convertTimestamp = () => {
    if (!timestamp.trim()) {
      setError("Please enter a timestamp");
      setConvertedDate("");
      return;
    }

    try {
      const ts = parseInt(timestamp);
      if (isNaN(ts)) {
        setError("Invalid timestamp format");
        setConvertedDate("");
        return;
      }

      // Handle both seconds and milliseconds timestamps
      const tsMs = ts.toString().length === 10 ? ts * 1000 : ts;
      const date = new Date(tsMs);
      
      if (isNaN(date.getTime())) {
        setError("Invalid timestamp");
        setConvertedDate("");
        return;
      }

      setError("");
      const formatted = formatDate(date);
      setConvertedDate(formatted);
      toast.success("Timestamp converted successfully");
    } catch (err) {
      setError("Failed to convert timestamp");
      setConvertedDate("");
      toast.error("Failed to convert timestamp");
    }
  };

  const convertDateToTimestamp = () => {
    if (!dateInput || !timeInput) {
      toast.error("Please enter both date and time");
      return;
    }

    try {
      const dateTime = new Date(`${dateInput}T${timeInput}`);
      if (isNaN(dateTime.getTime())) {
        toast.error("Invalid date or time");
        return;
      }

      const ts = Math.floor(dateTime.getTime() / 1000);
      setDateToTimestamp(ts.toString());
      toast.success("Date converted to timestamp");
    } catch (err) {
      toast.error("Failed to convert date");
    }
  };

  const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    };
    return date.toLocaleString("en-US", options);
  };

  const handleCopyTimestamp = async (value: string) => {
    const success = await copyToClipboard(value);
    if (success) {
      toast.success("Copied to clipboard");
    } else {
      toast.error("Failed to copy");
    }
  };

  const getCurrentTimestamp = () => {
    const ts = Math.floor(currentTime / 1000);
    setTimestamp(ts.toString());
    convertTimestamp();
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-teal-500/10 mb-6">
            <Clock className="h-12 w-12 text-cyan-600 dark:text-cyan-400" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Timestamp Converter
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Convert Unix timestamps to readable dates and vice versa
          </p>
        </motion.div>

        {/* Current Time Display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 p-6 rounded-xl bg-gradient-to-r from-cyan-500/10 to-teal-500/10 border border-cyan-500/20"
        >
          <div className="text-center">
            <div className="text-sm text-muted-foreground mb-2">
              Current Unix Timestamp
            </div>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <div className="text-3xl font-bold font-mono">
                {Math.floor(currentTime / 1000)}
              </div>
              <button
                onClick={() =>
                  handleCopyTimestamp(Math.floor(currentTime / 1000).toString())
                }
                className="p-2 rounded-lg bg-accent hover:bg-accent/80 transition-colors"
              >
                <Copy className="h-4 w-4" />
              </button>
            </div>
            <div className="text-sm text-muted-foreground mt-2">
              {formatDate(new Date(currentTime))}
            </div>
          </div>
        </motion.div>

        {/* Timestamp to Date Converter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8 p-8 rounded-xl bg-card border border-border"
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Clock className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
            Timestamp to Date
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Enter Unix Timestamp
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={timestamp}
                  onChange={(e) => setTimestamp(e.target.value)}
                  placeholder="e.g., 1710000000"
                  className="flex-1 px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-cyan-600 font-mono"
                />
                <button
                  onClick={getCurrentTimestamp}
                  className="px-4 py-3 rounded-lg border border-border hover:bg-accent transition-colors"
                  title="Use current timestamp"
                >
                  <Clock className="h-5 w-5" />
                </button>
              </div>
            </div>
            <button
              onClick={convertTimestamp}
              className="w-full px-8 py-3 rounded-lg bg-gradient-to-r from-cyan-600 to-teal-600 text-white font-medium hover:from-cyan-700 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl"
            >
              Convert to Date
            </button>
            {error && (
              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                <span className="text-sm text-destructive">{error}</span>
              </div>
            )}
            {convertedDate && (
              <div className="p-4 rounded-lg bg-accent border border-border">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="text-sm text-muted-foreground mb-1">
                      Converted Date
                    </div>
                    <div className="font-medium">{convertedDate}</div>
                  </div>
                  <button
                    onClick={() => handleCopyTimestamp(convertedDate)}
                    className="p-2 rounded-lg hover:bg-background transition-colors"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Date to Timestamp Converter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-8 p-8 rounded-xl bg-card border border-border"
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Calendar className="h-6 w-6 text-teal-600 dark:text-teal-400" />
            Date to Timestamp
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Date</label>
                <input
                  type="date"
                  value={dateInput}
                  onChange={(e) => setDateInput(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-teal-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Time</label>
                <input
                  type="time"
                  value={timeInput}
                  onChange={(e) => setTimeInput(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-teal-600"
                />
              </div>
            </div>
            <button
              onClick={convertDateToTimestamp}
              className="w-full px-8 py-3 rounded-lg bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-medium hover:from-teal-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl"
            >
              Convert to Timestamp
            </button>
            {dateToTimestamp && (
              <div className="p-4 rounded-lg bg-accent border border-border">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="text-sm text-muted-foreground mb-1">
                      Unix Timestamp
                    </div>
                    <div className="font-mono font-medium text-lg">
                      {dateToTimestamp}
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopyTimestamp(dateToTimestamp)}
                    className="p-2 rounded-lg hover:bg-background transition-colors"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="p-6 rounded-xl bg-card border border-border">
            <h3 className="font-semibold mb-2">Real-time Clock</h3>
            <p className="text-sm text-muted-foreground">
              Live display of current Unix timestamp
            </p>
          </div>
          <div className="p-6 rounded-xl bg-card border border-border">
            <h3 className="font-semibold mb-2">Bidirectional</h3>
            <p className="text-sm text-muted-foreground">
              Convert timestamp to date or date to timestamp
            </p>
          </div>
          <div className="p-6 rounded-xl bg-card border border-border">
            <h3 className="font-semibold mb-2">Multiple Formats</h3>
            <p className="text-sm text-muted-foreground">
              Supports both seconds and milliseconds timestamps
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
