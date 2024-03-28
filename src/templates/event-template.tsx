import React, { Fragment, useEffect } from 'react';
import { graphql, PageProps } from 'gatsby';

import { PageWrapper } from '../components/PageWrapper';
import { Event as EventComponent } from "../components/Event";

import type { Event as EventType, Navigation as NavigationType } from '../types/app';

export default function EventTemplate({ data }: PageProps) {
  const event = (data as any).contentfulEvent as EventType;

  if (!event) return;

  const navigationMenus = ((data as any).allContentfulNavigation.nodes) as NavigationType[];
  const mainNav = navigationMenus.find((nav) => nav.label === "Main Navigation");

  useEffect(() => {
    const handleContentChange = async (event: Event) => {
      event.preventDefault();
      await fetch("/__refresh", { method: "POST" });
    };

    window.addEventListener("stackbitObjectsChanged", handleContentChange);

    return () => {
      window.removeEventListener("stackbitObjectsChanged", handleContentChange);
    };
  }, []);

  console.log(event);

  return (
    <PageWrapper navProps={mainNav}>
      <Fragment>
        <EventComponent {...event} />
      </Fragment>
    </PageWrapper>
  );
}

export const query = graphql`
    query EventQuery($slug: String!) {
        allContentfulNavigation {
            nodes {
                contentful_id
                label
                navigationItems {
                    contentful_id
                    text
                    linkTo {
                        slug
                    }
                }
            }
        }
        contentfulEvent(slug: { eq: $slug }) {
            contentful_id
            slug
            title
            date
            image {
                gatsbyImage(layout: FULL_WIDTH, width: 800)
                title
            }
            details {
                details
            }
        }
    }
`;
