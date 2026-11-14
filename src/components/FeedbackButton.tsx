import { useCallback, useState } from 'react';
import { startFeedback, type FeedbackContext } from '../feedback';
import { t, useLocale } from '../i18n';
import { haptic } from '../platform';

interface Props {
  context?: FeedbackContext;
  className?: string;
}

export function FeedbackButton({ context, className }: Props) {
  const locale = useLocale();
  const [hint, setHint] = useState<string | null>(null);

  const onClick = useCallback(async () => {
    haptic('light');
    const copied = await startFeedback(context);
    setHint(
      copied ? t(locale, 'feedbackCopied') : t(locale, 'feedbackOpened'),
    );
    window.setTimeout(() => setHint(null), 3500);
  }, [context, locale]);

  return (
    <div className={`feedback-btn${className ? ` ${className}` : ''}`}>
      <button type="button" className="feedback-btn__action" onClick={() => void onClick()}>
        {t(locale, 'feedback')}
      </button>
      {hint && (
        <p className="feedback-btn__hint" role="status">
          {hint}
        </p>
      )}
    </div>
  );
}
