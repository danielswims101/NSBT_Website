import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { LANGUAGES } from "@/content/site";

type Prefs = {
  lang: string;
  setLang: (id: string) => void;
  reading: boolean;
  setReading: (v: boolean) => void;
  typeScale: number;
  setTypeScale: (v: number) => void;
  contrast: boolean;
  setContrast: (v: boolean) => void;
  askOpen: boolean;
  setAskOpen: (v: boolean) => void;
};

const Ctx = createContext<Prefs | null>(null);

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw == null ? fallback : (JSON.parse(raw) as T);
  } catch {
    return fallback;
  }
}

export function SitePrefsProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState("en");
  const [reading, setReadingState] = useState(false);
  const [typeScale, setTypeScaleState] = useState(1);
  const [contrast, setContrastState] = useState(false);
  const [askOpen, setAskOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setLangState(read("nsbt-lang", "en"));
    setReadingState(read("nsbt-reading", false));
    setTypeScaleState(read("nsbt-type", 1));
    setContrastState(read("nsbt-contrast", false));
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.lang = "en";
    document.documentElement.dataset.lang = "en";
    document.documentElement.dataset.reading = reading ? "true" : "false";
    document.documentElement.dataset.contrast = contrast ? "true" : "false";
    document.documentElement.style.setProperty("--nsbt-type", String(typeScale));
    window.localStorage.setItem("nsbt-lang", JSON.stringify(lang));
    window.localStorage.setItem("nsbt-reading", JSON.stringify(reading));
    window.localStorage.setItem("nsbt-type", JSON.stringify(typeScale));
    window.localStorage.setItem("nsbt-contrast", JSON.stringify(contrast));
  }, [lang, reading, typeScale, contrast, ready]);

  const setLang = useCallback((id: string) => setLangState(id), []);
  const setReading = useCallback((v: boolean) => setReadingState(v), []);
  const setTypeScale = useCallback(
    (v: number) => setTypeScaleState(Math.min(1.4, Math.max(0.9, v))),
    [],
  );
  const setContrast = useCallback((v: boolean) => setContrastState(v), []);

  const value = useMemo(
    () => ({
      lang,
      setLang,
      reading,
      setReading,
      typeScale,
      setTypeScale,
      contrast,
      setContrast,
      askOpen,
      setAskOpen,
    }),
    [lang, setLang, reading, setReading, typeScale, setTypeScale, contrast, setContrast, askOpen],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useSitePrefs() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useSitePrefs");
  return ctx;
}

export { LANGUAGES };
