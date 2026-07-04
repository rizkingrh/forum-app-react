import { useAppSelector } from '../states/hooks';

export default function LoadingBar() {
  const loadingCount = useAppSelector((state: any) => state.loadingBar?.default || 0);

  if (loadingCount <= 0) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-accent to-brand-cyan animate-pulse z-[9999]" />
  );
}
