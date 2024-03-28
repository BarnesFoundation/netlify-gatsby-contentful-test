import React from 'react';
import Markdown from 'markdown-to-jsx';

import { Button } from './Button';

import type { Hero as HeroProps } from '../types/app';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

export const Hero = (props: HeroProps) => {
    const image = props.image ? getImage(props.image) : null;

    return (
        <div className="px-12 py-24 bg-gray-200" data-sb-object-id={props.contentful_id}>
            <div className={`flex mx-auto max-w-6xl gap-12 ${props.theme === 'imgRight' ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className="max-w-xl py-20 mx-auto lg:shrink-0">
                    <h1 className="mb-6 text-5xl leading-tight" data-sb-field-path="heading">{props.heading}</h1>
                    {props.body && (
                        <Markdown options={{ forceBlock: true }} className="mb-6 text-lg" data-sb-field-path="body">
                            {props.body.body}
                        </Markdown>
                    )}
                    {props.button && <Button {...props.button} />}
                </div>
                <div className="relative hidden w-full overflow-hidden rounded-md lg:block">
                    {image && <GatsbyImage image={image} alt={props.image.title} data-sb-field-path="image" />}
                </div>
            </div>
        </div>
    );
};
