import React from 'react';
import Markdown from 'markdown-to-jsx';
import type { TextType as TextProps } from '../types/app';

export const TextContent: React.FC<TextProps> = ({ body, contentful_id }) => {
  return (
    <div className="px-12 bg-gray-50" data-sb-object-id={contentful_id}>
      <div className='max-w-6xl mx-auto'>
        {body && (
          <Markdown options={{ forceBlock: true }} className="mb-6 text-lg flex flex-col gap-8" data-sb-field-path="body">
            {body.body}
          </Markdown>
        )}
      </div>
    </div>
  )
};