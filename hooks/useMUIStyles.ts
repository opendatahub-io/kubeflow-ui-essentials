import { useEffect, useRef } from 'react';
import { loadMUITheme } from '~/style';

/**
 * Hook to dynamically load MUI styles when needed
 * @param shouldLoad - Whether to load the MUI styles
 * @returns void
 */
export const useMUIStyles = (shouldLoad: boolean): void => {
  const stylesLoadedRef = useRef(false);

  useEffect(() => {
    if (shouldLoad && !stylesLoadedRef.current) {
      // Dynamically import MUI styles
      loadMUITheme()
        .then(() => {
          stylesLoadedRef.current = true;
        })
        .catch((error) => {
          console.warn('Failed to load MUI styles:', error);
        });
    }
  }, [shouldLoad]);
}; 