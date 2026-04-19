export type DocsTheme = {
  id: string;
  label: string;
  scheme: 'dark' | 'light';
};

export const docsThemes: DocsTheme[] = [
  { id: 'default-dark', label: 'Default Dark', scheme: 'dark' },
  { id: 'default-light', label: 'Default Light', scheme: 'light' },
  { id: 'ayu-dark', label: 'Ayu Dark', scheme: 'dark' },
  { id: 'ayu-light', label: 'Ayu Light', scheme: 'light' },
  { id: 'catppuccin-frappe', label: 'Catppuccin Frappe', scheme: 'dark' },
  { id: 'catppuccin-latte', label: 'Catppuccin Latte', scheme: 'light' },
  { id: 'catppuccin-macchiato', label: 'Catppuccin Macchiato', scheme: 'dark' },
  { id: 'catppuccin-mocha', label: 'Catppuccin Mocha', scheme: 'dark' },
  { id: 'dracula', label: 'Dracula', scheme: 'dark' },
  { id: 'everforest-dark', label: 'Everforest Dark', scheme: 'dark' },
  { id: 'everforest-light', label: 'Everforest Light', scheme: 'light' },
  { id: 'gruvbox-dark', label: 'Gruvbox Dark', scheme: 'dark' },
  { id: 'gruvbox-light', label: 'Gruvbox Light', scheme: 'light' },
  { id: 'horizon', label: 'Horizon', scheme: 'dark' },
  { id: 'kanagawa-dragon', label: 'Kanagawa Dragon', scheme: 'dark' },
  { id: 'kanagawa-lotus', label: 'Kanagawa Lotus', scheme: 'light' },
  { id: 'kanagawa-wave', label: 'Kanagawa Wave', scheme: 'dark' },
  { id: 'material', label: 'Material', scheme: 'dark' },
  { id: 'monokai', label: 'Monokai', scheme: 'dark' },
  { id: 'night-owl', label: 'Night Owl', scheme: 'dark' },
  { id: 'nord', label: 'Nord', scheme: 'dark' },
  { id: 'one-dark', label: 'One Dark', scheme: 'dark' },
  { id: 'one-light', label: 'One Light', scheme: 'light' },
  { id: 'rose-pine', label: 'Rose Pine', scheme: 'dark' },
  { id: 'rose-pine-moon', label: 'Rose Pine Moon', scheme: 'dark' },
  { id: 'solarized-dark', label: 'Solarized Dark', scheme: 'dark' },
  { id: 'solarized-light', label: 'Solarized Light', scheme: 'light' },
  { id: 'tokyo-night', label: 'Tokyo Night', scheme: 'dark' },
];

export const docsThemeIds = docsThemes.map((theme) => theme.id);

export const docsLightThemeIds = docsThemes
  .filter((theme) => theme.scheme === 'light')
  .map((theme) => theme.id);

export const docsDefaultThemes = {
  dark: 'horizon',
  light: 'horizon',
} as const;

