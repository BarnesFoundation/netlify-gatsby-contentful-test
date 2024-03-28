import React from 'react';
import Markdown from 'markdown-to-jsx';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import type { TwoColumnContent as TwoColumnContentProps } from '../types/app';

export const TwoColumnContent: React.FC<TwoColumnContentProps> = ({ body, media, contentful_id }) => {
  const image = media ? getImage(media) : null;

  return (
    <div className="px-12 bg-gray-50" data-sb-object-id={contentful_id}>
      <div className='max-w-6xl mx-auto flex flew-row gap-12'>
        {media && (
          <div className="w-1/2 rounded-md lg:block relative flex-grow">
            {image && <GatsbyImage image={image} alt={media.title} data-sb-field-path="media" />}
          </div>
        )}
        {body && (
          <Markdown
            options={{ forceBlock: true }}
            className="my-12 text-lg flex flex-col gap-8 w-1/2"
            data-sb-field-path="body"
          >
            {body.body}
          </Markdown>
        )}
      </div>
    </div>
  )
};
