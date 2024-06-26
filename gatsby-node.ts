import path from 'path';

import type { GatsbyNode } from 'gatsby';

type ContentfulPage = {
    contentful_id: string;
    slug: string;
};

type PageQueryResult = {
    errors?: any;
    data?: { allContentfulPage: { nodes: ContentfulPage[] } };
};

type EventQueryResult = {
    errors?: any;
    data?: { allContentfulEvent: { nodes: ContentfulPage[] } };
};

export const createPages: GatsbyNode['createPages'] = async ({ graphql, actions }) => {
    const { createPage } = actions;

    // Create pages from standard template
    const ComposablePage = path.resolve(`src/templates/composable-page.tsx`);
    const result: PageQueryResult = await graphql(`
        query PageGeneratorQuery {
            allContentfulPage(filter: {customLayout: {eq: false}}) {
                nodes {
                    contentful_id
                    slug
                }
            }
        }
    `);

    result.data?.allContentfulPage.nodes.forEach((edge: ContentfulPage) => {
        createPage({
            path: `${edge.slug}`,
            component: ComposablePage,
            context: { slug: edge.slug }
        });
    });

        // Create pages for each event from template
        const EventTemplate = path.resolve(`src/templates/event-template.tsx`);
        const eventResult: EventQueryResult = await graphql(`
            query EventGeneratorQuery {
                allContentfulEvent {
                    nodes {
                        contentful_id
                        slug
                    }
                }
            }
        `);
    
        eventResult.data?.allContentfulEvent.nodes.forEach((edge: ContentfulPage) => {
            createPage({
                path: `events/${edge.slug}`,
                component: EventTemplate,
                context: { slug: edge.slug }
            });
        });
};
