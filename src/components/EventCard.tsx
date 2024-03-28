import React from "react";
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { Link } from 'gatsby';
import { Event as EventProps } from "../types/app";

export const EventCard: React.FC<EventProps> = ({ contentful_id, title, date, slug, image }) => {
  const imageData = image ? getImage(image) : null;
  const start = new Date(date).toLocaleDateString()

  return (
    <div data-sb-object-id={contentful_id}>
      <Link to={`/events/${slug}`} data-sb-field-path="slug">
        <div className="px-6 py-2 border border-gray-400 rounded-md shadow shadow-gray-400 w-52">
          <div className="w-full py-6 flex flex-col justify-start h-40">
            {imageData && <GatsbyImage image={imageData} alt={image.title} data-sb-field-path="image" />}
          </div>
          <div>
            <h3
              data-sb-field-path="title"
              className="text-lg font-semibold h-16"
            >{title}</h3>
            <h4 data-sb-field-path="date" className="pb-6 pt-2">{start}</h4>
          </div>
        </div>
      </Link>
    </div>
  )
}