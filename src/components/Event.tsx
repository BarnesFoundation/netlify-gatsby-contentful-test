import React from 'react';
import Markdown from 'markdown-to-jsx';

import type { Event as EventProps } from '../types/app';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

export const Event: React.FC<EventProps> = ({ contentful_id, image, title, date, details }) => {
  const imageData = image ? getImage(image) : null;
  const start = new Date(date).toLocaleDateString()

  return (
    <div data-sb-object-id={contentful_id}>
      <div className="px-12 py-24 bg-gray-200">
        <div className={`flex mx-auto max-w-6xl gap-12 flex-row`}>
          <div className="max-w-xl py-20 mx-auto lg:shrink-0">
            <h1 className="mb-6 text-5xl leading-tight" data-sb-field-path="title">{title}</h1>
            <div className="mb-6 text-lg" data-sb-field-path="date">
              {start}
            </div>
          </div>
          <div className="relative hidden w-full overflow-hidden rounded-md lg:block">
            {imageData && <GatsbyImage image={imageData} alt={image.title} data-sb-field-path="image" />}
          </div>
        </div>
      </div>

      <div className="px-12 bg-gray-50">
      <div className='max-w-6xl mx-auto'>
        {details && (
          <Markdown options={{ forceBlock: true }} className="my-12 text-lg flex flex-col gap-8" data-sb-field-path="details">
            {details.details}
          </Markdown>
        )}
      </div>
    </div>
    </div>
  );
};
