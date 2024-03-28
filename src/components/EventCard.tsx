import React from "react";
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { Link } from 'gatsby';
import { Event as EventProps } from "../types/app";

export const EventCard: React.FC<EventProps> = ({ contentful_id, title, date, slug, image }) => {
  const imageData = image ? getImage(image) : null;
  const start = new Date(date).toLocaleDateString()

  return (
    <Link to={slug}>
      {imageData && <GatsbyImage image={imageData} alt={image.title} data-sb-field-path="image" />}
      <div>
        <h3>{title}</h3>
        <h4>{start}</h4>
      </div>
    </Link>
  )
}