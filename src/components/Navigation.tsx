import React from "react";
import { Link } from 'gatsby';
import type { Navigation as NavigationProps } from '../types/app';

export const Navigation: React.FC<NavigationProps> = ({ contentful_id, navigationItems }) => {
  return (
    <nav data-sb-object-id={contentful_id}>
      <ul>
        {navigationItems.map((navItem, i) => (
          <li key={i}>
            <Link
              to={`${navItem.text === 'Home' ? '/' : '/' + navItem.linkTo.slug}`}
              data-sb-field-path="navItem"
            >
              {navItem.text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}