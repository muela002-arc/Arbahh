"use client";

type ToastNotificationProps = {
  message: string;
  show: boolean;
};

export default function ToastNotification({ message, show }: ToastNotificationProps) {
  return (
    <div
      aria-live="polite"
      className={`fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-full bg-slate-950 px-5 py-3 text-sm font-bold text-white shadow-soft transition-opacity dark:bg-white dark:text-slate-950 ${
        show ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      {message}
    </div>
  );
}
