// Export style files
// Note: MUI theme styles are NOT automatically imported to avoid side effects
// Users should import MUI styles explicitly when needed via useMUIStyles hook or direct import

// Explicit export for MUI theme styles (does not auto-import)
export const loadMUITheme = () => import('./MUI-theme.scss');

export {};
