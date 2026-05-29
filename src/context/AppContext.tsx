'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import type { Lang } from '@/lib/i18n';

export interface Filters {
  specialty?: string | null;
  location?: string | null;
  urgency?: string | null;
  budget?: string | null;
  verifiedOnly?: boolean;
  availableNow?: boolean;
  minRating?: number | null;
  languages?: string[];
}

interface AppContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  filters: Filters;
  setFilters: (filters: Filters) => void;
}

const AppContext = createContext<AppContextValue>({
  lang: 'es',
  setLang: () => {},
  filters: {},
  setFilters: () => {},
});

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('es');
  const [filters, setFilters] = useState<Filters>({});

  return (
    <AppContext.Provider value={{ lang, setLang, filters, setFilters }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
