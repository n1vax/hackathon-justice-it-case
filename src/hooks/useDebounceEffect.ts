import { useEffect } from "react";

export const useDebouncedEffect = <F extends () => void>(effect: F, deps: any[], delay: number) => {
  useEffect(() => {
    const handler = setTimeout(() => effect(), delay);

    return () => clearTimeout(handler);
  }, [...deps || [], delay]);
}