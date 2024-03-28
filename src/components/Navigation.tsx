import React from "react";
import { Link } from 'gatsby';
import type { Navigation as NavigationProps } from '../types/app';

export const Navigation: React.FC<NavigationProps> = ({ contentful_id, navigationItems }) => {
  console.log(navigationItems)
  return (
    <div className="bg-black p-12  w-full flex-col w-full text-right fixed h-120 z-10">
      <nav
        data-sb-object-id={contentful_id}
      >
        <ul className="flex flex-col md:flex-row gap-4 md:gap-6">
          {navigationItems.map((navItem, i) => (
            <li key={i} data-sb-object-id={navItem.contentful_id}>
              {navItem.linkTo && navItem.text && <Link
                to={`${navItem.text === 'Home' ? '/' : '/' + navItem.linkTo.slug}`}
                data-sb-field-path="text"
                className="text-white flex justify-start hover:text-blue-500"
              >
                {navItem.text}
              </Link>}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}