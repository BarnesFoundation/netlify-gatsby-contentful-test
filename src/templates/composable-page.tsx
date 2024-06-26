import React, { Fragment, useEffect } from 'react';
import { graphql, PageProps } from 'gatsby';

import { Hero } from '../components/Hero';
import { Stats } from '../components/Stats';
import { TwoColumnContent } from '../components/TwoColumnContent';
import { TextContent } from '../components/Text';
import { PageWrapper } from '../components/PageWrapper';

import type { ComposablePage, Navigation as NavigationType } from '../types/app';

const componentMap = {
    ContentfulHero: Hero,
    ContentfulStats: Stats,
    Contentful2ColumnContent: TwoColumnContent,
    ContentfulText: TextContent,
};

export default function ComposablePageTemplate({ data }: PageProps) {
    const page = (data as any).contentfulPage as ComposablePage;

    if (!page) return;
    
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

    return (
        <PageWrapper navProps={mainNav}>
            <Fragment>
                {(page.sections || []).map((section, idx) => {
                    const Component = componentMap[section.__typename] as any;
                    return <Component key={idx} {...section} />;
                })}
            </Fragment>
        </PageWrapper>
    );
}

export const query = graphql`
    query ComposablePageQuery($slug: String!) {
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
        contentfulPage(slug: { eq: $slug }, customLayout: {eq: false}) {
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
                    contentful_id
                    body {
                        body
                    }
                }
                ... on Contentful2ColumnContent {
                    __typename
                    contentful_id
                    body {
                        body
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
