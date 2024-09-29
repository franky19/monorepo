export function scrollIntoViewObserver(element: HTMLElement) {
  return new Promise<void>(resolve => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        observer.disconnect();
        resolve();
      }
    });
    observer.observe(element);
    element.scrollIntoView({behavior: 'smooth', block: 'start'});
  });
}

interface IScrollDirection {
  top: number;
  left: number;
}

export function scrollElement(
  element: HTMLElement,
  direction: Partial<IScrollDirection>,
) {
  element.scrollTo({behavior: 'smooth', ...direction});
}
