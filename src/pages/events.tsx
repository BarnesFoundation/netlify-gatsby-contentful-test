import React, { Fragment, useEffect } from 'react';
import { graphql, PageProps, useStaticQuery } from 'gatsby';

import { Hero } from '../components/Hero';
import { Stats } from '../components/Stats';
import { TwoColumnContent } from '../components/TwoColumnContent';
import { TextContent } from '../components/Text';
import { PageWrapper } from '../components/PageWrapper';

import type { ComposablePage, Event as EventType, Navigation as NavigationType } from '../types/app';
import { EventCard } from '../components/EventCard';

const componentMap = {
  ContentfulHero: Hero,
  ContentfulStats: Stats,
  Contentful2ColumnContent: TwoColumnContent,
  ContentfulText: TextContent,
};

export default function Events() {
  const data = useStaticQuery(query);
  const page = (data as any).contentfulPage as ComposablePage;
  const navigationMenus = ((data as any).allContentfulNavigation.nodes) as NavigationType[];
  const mainNav = navigationMenus.find((nav) => nav.label === "Main Navigation");
  const events = (data as any).allContentfulEvent.nodes as EventType[];

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

  return (
    <PageWrapper navProps={mainNav}>
      <Fragment>
        {(page.sections || []).map((section, idx) => {
          const Component = componentMap[section.__typename] as any;
          return <Component key={idx} {...section} />;
        })}
        <div className='flex flex-row flex-wrap justify-center gap-24 max-w-5xl mx-auto my-24'>
          {(events || []).map((event, i) => (
            <EventCard key={i} {...event} />
          ))}
        </div>
      </Fragment>
    </PageWrapper>
  );
}

const query = graphql`
    query EventPageQuery {
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
        contentfulPage(slug: { eq: "events" }) {
            title
            contentful_id
            slug
            sections {
                ... on ContentfulHero {
                    __typename
                    contentful_id
                    body {
                        body
                    }
                    button {
                        url
                        theme
                        contentful_id
                        label
                    }
                    heading
                    image {
                        gatsbyImage(layout: FULL_WIDTH, width: 800)
                        title
                    }
                    theme
                }
            }
        }
        allContentfulEvent(sort: {date: ASC}) {
          nodes {
              date
              slug
              title
          }
      }
    }
`;
