export function debounce(callback: Function, wait: number, immediate = false) {
  let timeout: NodeJS.Timeout;

  return function(this: any, ...args: any[]) {
    const callNow = immediate && !timeout;
    const next = () => callback.apply(this, args);

    clearTimeout(timeout);
    timeout = setTimeout(next, wait);

    if (callNow) {
      next();
    }
  };
}
