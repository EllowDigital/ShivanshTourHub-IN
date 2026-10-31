import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { MapPin, Navigation, Search, Loader2 } from "lucide-react";
import {
  searchLocationSuggestions,
  type LocationSuggestion,
} from "@/lib/locationSearch";

interface LocationAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  required?: boolean;
  variant?: "pickup" | "drop";
}

const LocationAutocomplete = ({
  value,
  onChange,
  placeholder,
  required,
  variant = "pickup",
}: LocationAutocompleteProps) => {
  const [focused, setFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);

  useEffect(() => {
    let active = true;
    const q = value.trim();
    if (q.length < 3) {
      setSuggestions([]);
      setLoading(false);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      const results = await searchLocationSuggestions(q);
      if (active) {
        setSuggestions(results);
        setLoading(false);
      }
    }, 280);

    return () => { active = false; clearTimeout(timer); };
  }, [value]);

  const showDropdown = focused && value.trim().length >= 3;

  return (
    <div className="relative">
      {variant === "pickup" ? (
        <MapPin className="absolute left-3 top-3.5 h-4 w-4 text-secondary" />
      ) : (
        <Navigation className="absolute left-3 top-3.5 h-4 w-4 text-destructive" />
      )}

      <Input
        aria-label={variant === "pickup" ? "Pickup location" : "Drop location"}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setTimeout(() => setFocused(false), 180)}
        className="text-base sm:text-sm pl-10"
        required={required}
      />

      {showDropdown && (
        <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-30 bg-card border border-border rounded-xl shadow-lg overflow-hidden">
          {loading ? (
            <div className="px-3 py-2 text-xs text-muted-foreground flex items-center gap-2">
              <Loader2 className="h-3.5 w-3.5 animate-spin" /> Searching
              places...
            </div>
          ) : (
            <>
              {suggestions.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => onChange(s.label)}
                  className="w-full text-left px-3 py-2 text-xs text-foreground hover:bg-accent transition-colors"
                >
                  {s.label}
                </button>
              ))}

              <button
                type="button"
                onClick={() => onChange(value.trim())}
                className="w-full text-left px-3 py-2 text-xs text-secondary hover:bg-accent transition-colors border-t border-border/60"
              >
                Use typed location: "{value.trim()}"
              </button>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(value.trim())}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-3 py-2 text-xs text-muted-foreground hover:bg-accent transition-colors border-t border-border/60"
              >
                <span className="inline-flex items-center gap-1.5">
                  <Search className="h-3.5 w-3.5" /> Search this on Google Maps
                </span>
              </a>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default LocationAutocomplete;
