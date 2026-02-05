import { usePathname } from 'next/navigation';

export function useActivePath() {
  const pathname = usePathname();

  const checkActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard';
    }
    return pathname.startsWith(href);
  };

  return { checkActive, pathname };
}
