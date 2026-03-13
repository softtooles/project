import { useState, useEffect } from "react";
import { AlertCircle } from "lucide-react";

export function RegexTester() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [testString, setTestString] = useState("");
  const [matches, setMatches] = useState<RegExpMatchArray[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!pattern || !testString) {
      setMatches([]);
      setError("");
      return;
    }

    try {
      const regex = new RegExp(pattern, flags);
      const allMatches: RegExpMatchArray[] = [];
      
      if (flags.includes("g")) {
        let match;
        const globalRegex = new RegExp(pattern, flags);
        while ((match = globalRegex.exec(testString)) !== null) {
          allMatches.push(match);
          if (match.index === globalRegex.lastIndex) {
            globalRegex.lastIndex++;
          }
        }
      } else {
        const match = testString.match(regex);
        if (match) allMatches.push(match);
      }

      setMatches(allMatches);
      setError("");
    } catch (err) {
      setError((err as Error).message);
      setMatches([]);
    }
  }, [pattern, flags, testString]);

  const highlightMatches = () => {
    if (!testString || matches.length === 0) {
      return testString;
    }

    let result = testString;
    let offset = 0;

    matches.forEach((match) => {
      if (match.index !== undefined) {
        const startTag = '<span class="bg-pink-500/20 border-b-2 border-pink-500">';
        const endTag = "</span>";
        const insertIndex = match.index + offset;

        result =
          result.slice(0, insertIndex) +
          startTag +
          result.slice(insertIndex, insertIndex + match[0].length) +
          endTag +
          result.slice(insertIndex + match[0].length);

        offset += startTag.length + endTag.length;
      }
    });

    return result;
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Regex Tester</h1>
          <p className="text-muted-foreground">
            Test and debug regular expressions with live results and match
            highlighting. Perfect for pattern matching and validation.
          </p>
        </div>

        {/* Regex Input */}
        <div className="bg-card border border-border rounded-xl p-6 mb-6">
          <label className="block mb-2 font-medium">Regular Expression</label>
          <div className="flex gap-2">
            <div className="flex-1 flex items-center gap-2">
              <span className="text-muted-foreground">/</span>
              <input
                type="text"
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                placeholder="Enter regex pattern..."
                className="flex-1 px-4 py-2 rounded-lg border border-border bg-background font-mono focus:outline-none focus:ring-2 focus:ring-pink-600"
              />
              <span className="text-muted-foreground">/</span>
            </div>
            <input
              type="text"
              value={flags}
              onChange={(e) => setFlags(e.target.value)}
              placeholder="gmi"
              className="w-20 px-4 py-2 rounded-lg border border-border bg-background font-mono text-center focus:outline-none focus:ring-2 focus:ring-pink-600"
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Common flags: g (global), i (case-insensitive), m (multiline)
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/20 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
            <p className="text-destructive text-sm">{error}</p>
          </div>
        )}

        {/* Test String */}
        <div className="bg-card border border-border rounded-xl p-6 mb-6">
          <label className="block mb-2 font-medium">Test String</label>
          <textarea
            value={testString}
            onChange={(e) => setTestString(e.target.value)}
            placeholder="Enter text to test against the regex..."
            className="w-full h-40 px-4 py-3 rounded-lg border border-border bg-background font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-pink-600"
          />
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Highlighted Output */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="font-semibold mb-4">
              Highlighted Matches ({matches.length})
            </h3>
            <div
              className="p-4 rounded-lg bg-muted font-mono text-sm whitespace-pre-wrap min-h-[160px] max-h-[400px] overflow-auto"
              dangerouslySetInnerHTML={{
                __html: highlightMatches() || "Matches will be highlighted here...",
              }}
            />
          </div>

          {/* Match Details */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="font-semibold mb-4">Match Details</h3>
            <div className="space-y-3 max-h-[400px] overflow-auto">
              {matches.length === 0 ? (
                <p className="text-muted-foreground text-sm">
                  No matches found. Try adjusting your regex pattern.
                </p>
              ) : (
                matches.map((match, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-lg bg-muted font-mono text-sm"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 rounded bg-pink-600 text-white text-xs">
                        Match {index + 1}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Position: {match.index}
                      </span>
                    </div>
                    <div className="text-pink-600 dark:text-pink-400 break-all">
                      {match[0]}
                    </div>
                    {match.length > 1 && (
                      <div className="mt-2 text-xs text-muted-foreground">
                        Groups: {match.slice(1).join(", ")}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Documentation */}
        <div className="mt-16 space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Common Regex Patterns</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-card border border-border">
                <code className="text-pink-600 dark:text-pink-400 font-mono text-sm">
                  \d+
                </code>
                <p className="text-sm text-muted-foreground mt-2">
                  Match one or more digits
                </p>
              </div>
              <div className="p-4 rounded-lg bg-card border border-border">
                <code className="text-pink-600 dark:text-pink-400 font-mono text-sm">
                  [a-zA-Z]+
                </code>
                <p className="text-sm text-muted-foreground mt-2">
                  Match letters only
                </p>
              </div>
              <div className="p-4 rounded-lg bg-card border border-border">
                <code className="text-pink-600 dark:text-pink-400 font-mono text-sm">
                  \w+@\w+\.\w+
                </code>
                <p className="text-sm text-muted-foreground mt-2">
                  Simple email pattern
                </p>
              </div>
              <div className="p-4 rounded-lg bg-card border border-border">
                <code className="text-pink-600 dark:text-pink-400 font-mono text-sm">
                  ^https?://
                </code>
                <p className="text-sm text-muted-foreground mt-2">
                  Match URL beginning
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Quick Reference</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <h4 className="font-semibold mb-2">Character Classes</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li><code className="text-pink-600 dark:text-pink-400">\d</code> - Digit</li>
                  <li><code className="text-pink-600 dark:text-pink-400">\w</code> - Word character</li>
                  <li><code className="text-pink-600 dark:text-pink-400">\s</code> - Whitespace</li>
                  <li><code className="text-pink-600 dark:text-pink-400">.</code> - Any character</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Quantifiers</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li><code className="text-pink-600 dark:text-pink-400">*</code> - 0 or more</li>
                  <li><code className="text-pink-600 dark:text-pink-400">+</code> - 1 or more</li>
                  <li><code className="text-pink-600 dark:text-pink-400">?</code> - 0 or 1</li>
                  <li><code className="text-pink-600 dark:text-pink-400">{`{n,m}`}</code> - Between n and m</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Anchors</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li><code className="text-pink-600 dark:text-pink-400">^</code> - Start of string</li>
                  <li><code className="text-pink-600 dark:text-pink-400">$</code> - End of string</li>
                  <li><code className="text-pink-600 dark:text-pink-400">\b</code> - Word boundary</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
