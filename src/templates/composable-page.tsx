import React, { useEffect } from 'react';
import { graphql, PageProps } from 'gatsby';

import { Hero } from '../components/Hero';
import { Stats } from '../components/Stats';

import type { ComposablePage } from '../types/app';
import { TwoColumnContent } from '../components/TwoColumnContent';
import { TextContent } from '../components/Text';


const componentMap = {
    ContentfulHero: Hero,
    ContentfulStats: Stats,
    Contentful2ColumnContent: TwoColumnContent,
    ContentfulText: TextContent,
};

export default function ComposablePageTemplate({ data }: PageProps) {
    const page = (data as any).contentfulPage as ComposablePage;

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

    console.log("page:", page)

    return (
        <div>
            {(page.sections || []).map((section, idx) => {
                const Component = componentMap[section.__typename] as any;
                console.log(section, Component)
                return <Component key={idx} {...section} />;
            })}
        </div>
    );
}

export const query = graphql`
    query ComposablePageQuery($slug: String!) {
        contentfulPage(slug: { eq: $slug }) {
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
                }
                ... on ContentfulStats {
                    __typename
                    heading
                    contentful_id
                    body {
                        body
                    }
                    stats {
                        contentful_id
                        value
                        label
                    }
                    theme
                }
                ... on ContentfulText {
                    __typename
                    content {
                        raw
                    }
                }
                ... on Contentful2ColumnContent {
                    __typename
                    text {
                        raw
                    }
                    media {
                        gatsbyImage(layout: FULL_WIDTH, width: 800)
                        title
                    }
                }
            }
        }
    }
`;
