import { useEffect, useRef } from 'react';

function useResponsiveHidden() {
  const asideContentRef = useRef(null);

  useEffect(() => {
    const resizeObserverCallback = (entries:any) => {
      const element = entries[0];
      const contentWidth = element.contentRect.width;
      const hiddenElements = Array.from(
        document.getElementsByClassName('responsive-hidden')
      ) as HTMLElement[];

      hiddenElements.forEach((e) => {
        e.style.display = contentWidth < 100 ? 'none' : 'block';
      });
    };

    const resizeObserver = new ResizeObserver(resizeObserverCallback);

    // Observar el cambio de tamaño del elemento asideContent
    if (asideContentRef.current) {
      resizeObserver.observe(asideContentRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return asideContentRef;
}

export default useResponsiveHidden;
