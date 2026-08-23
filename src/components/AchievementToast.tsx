import { Toaster } from 'sonner';

export const AchievementToast = () => {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        className: 'bg-zinc-950 border-2 border-amber-500 text-zinc-100 rounded-none clip-angled oswald',
        style: {
          borderRadius: 0,
        },
      }}
    />
  );
};
