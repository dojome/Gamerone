import React from 'react';
import Image from 'components/common/Image';

import { UnfurlURL } from 'interfaces';

import './style.scss';

export interface UrlPreviewInterface {
  urls: UnfurlURL[];
}

function UrlPreview({ urls }: UrlPreviewInterface) {
  return urls.length > 0 ? (
    <div className="url-preview">
      <ul>
        {urls.map((site, index) => (
          <li key={index}>
            <a href={site.url} target="_blank" rel="noopener noreferrer">
              <h4>{site.title}</h4>
              <Image src={site.thumbnailUrl} alt={site.title} useCdn={false} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <></>
  );
}

export default React.memo(UrlPreview);
