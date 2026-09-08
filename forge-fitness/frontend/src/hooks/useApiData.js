import { useEffect, useState } from 'react';

// Fetches data from the backend using the given fetcher function. If the
// backend isn't running or the request fails, silently falls back to the
// static placeholder data so the page never breaks or shows an empty state
// during local development or a demo without a database connected.
export function useApiData(fetcher, fallbackData) {
  const [data, setData] = useState(fallbackData);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetcher()
      .then((res) => {
        if (cancelled) return;
        if (res?.data?.length) {
          setData(res.data);
        } else {
          setUsingFallback(true);
        }
      })
      .catch(() => {
        if (!cancelled) setUsingFallback(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, loading, usingFallback };
}
