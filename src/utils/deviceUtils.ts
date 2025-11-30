// Utility function to detect mobile devices
export const isMobileDevice = (): boolean => {
  // Check for mobile user agent
  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
  
  // List of mobile device patterns
  const mobilePatterns = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i
 ];
  
  // Check if any pattern matches
  return mobilePatterns.some(pattern => pattern.test(userAgent));
};

// Utility function to detect screen size
export const isMobileScreen = (): boolean => {
  // Use screen width as fallback if window is not available
  const width = typeof window !== 'undefined' ? window.innerWidth : 360;
  return width < 768; // Consider devices under 768px as mobile
};