import { Feather, Wrench, Rocket } from 'lucide-react';
import { Theme } from '@/types';
import TieFighterIcon from '@/components/icons/TieFighterIcon';

// One icon per theme, all sharing lucide's stroke conventions (Empire's TIE
// fighter is bespoke since no library icon fits; the rest reuse the same
// icon set used throughout the site instead of introducing a new style).
export const themeIcons: Record<Theme, React.ComponentType<{ className?: string }>> = {
  empire: TieFighterIcon,
  jedi: Feather,
  outerrim: Wrench,
  hyperspace: Rocket,
};
