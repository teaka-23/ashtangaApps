/** Небольшая иконка динамика для кнопки «озвучить название». */
export function SpeakerIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width="14"
      height="14"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M4 9.5h3.2L12 6v12l-4.8-3.5H4z" fill="currentColor" />
      <path
        d="M15.2 9a4.6 4.6 0 0 1 0 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M17.8 6.6a8 8 0 0 1 0 10.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}
