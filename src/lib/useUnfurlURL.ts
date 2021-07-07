import { useEffect, useState } from 'react';
import { UnfurlURL } from 'interfaces';
import { unfurlUrl } from 'api/misc';

export default function useUnfurlURL() {
  const [parsedUrls, setParsedUrls] = useState<string[]>([]);
  const [unfurledUrls, setUnfurledUrls] = useState<UnfurlURL[]>([]);
  const [isError, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const unfurl = async () => {
      try {
        setIsLoading(true);
        const response = await Promise.all(
          parsedUrls.map((url) =>
            unfurlUrl({
              url,
            }),
          ),
        );

        setUnfurledUrls(response as UnfurlURL[]);
      } catch (err) {
        console.log('Url unfurl error: ' + err.message);
        setError(true);
        setUnfurledUrls([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (parsedUrls.length) unfurl();
    else setUnfurledUrls([]);

    return () => {
      setError(false);
      setIsLoading(false);
    };
  }, [parsedUrls]);

  return [unfurledUrls, parsedUrls, setParsedUrls, isLoading, isError] as const;
}
