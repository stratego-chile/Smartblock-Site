import { useState, useEffect } from 'react';

/**
 * The window dimensions in pixels
 */
export type Dimensions = {
  /**
   * Window width in pixels
   */
  width: number | null;
  /**
   * Window height in pixels
   */
  height: number | null;
}

/**
 * Custom hook to get the window dimensions
 * @returns The actual window dimensions in pixels
 */
const useWindowDimensions = (): Dimensions => {

  const hasWindow = typeof window !== 'undefined';

  function getWindowDimensions (): Dimensions {
    const width = hasWindow ? window.innerWidth : null;
    const height = hasWindow ? window.innerHeight : null;
    return {
      width,
      height
    };
  }

  const [windowDimensions, setWindowDimensions] = useState<Dimensions>(getWindowDimensions());

  useEffect(() => {
    if (hasWindow) {

      const handleResize = () => {
        setWindowDimensions(getWindowDimensions());
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [hasWindow]);

  return windowDimensions;
};

export default useWindowDimensions;
