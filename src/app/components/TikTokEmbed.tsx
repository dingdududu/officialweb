'use client';
import { useEffect } from 'react';

interface TikTokEmbedProps {
  videoId: string;
  username: string;
}

export default function TikTokEmbed({ videoId, username }: TikTokEmbedProps) {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.tiktok.com/embed.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      const existingScript = document.querySelector('script[src="https://www.tiktok.com/embed.js"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <div className="mt-8 px-4 sm:px-6">
      <div className="flex justify-center">
        <blockquote 
          className="tiktok-embed" 
          cite={`https://www.tiktok.com/@${username}/video/${videoId}`}
          data-video-id={videoId}
          style={{ maxWidth: '350px', minWidth: '325px' }}
        >
          <section>
            <a 
              target="_blank" 
              title={`@${username}`}
              href={`https://www.tiktok.com/@${username}`}
              rel="noopener noreferrer"
            >
              @{username}
            </a>
            <p>Services showcase video</p>
          </section>
        </blockquote>
      </div>
    </div>
  );
}