import type { ImageDataLike } from 'gatsby-plugin-image';
import type { EntryFields } from 'contentful';

/* ---------- Shared ---------- */

namespace CustomFields {
    export type Markdown<Key extends string> = Record<Key, EntryFields.Text>;
    export type Image = ImageDataLike & { title: string };
    export type RichText = Record<"raw", EntryFields.RichText>
}

type SystemFields<TypeName> = {
    contentful_id: string;
    __typename: TypeName;
};

/* ---------- Atoms ---------- */

export type Button = SystemFields<'ContentfulButton'> & {
    label: EntryFields.Symbol;
    url: EntryFields.Symbol;
    theme: 'default' | 'outline';
};

export type StatItem = SystemFields<'ContentfulStatItem'> & {
    label: EntryFields.Symbol;
    value: EntryFields.Symbol;
};

/* ---------- Sections ---------- */

export type Stats = SystemFields<'ContentfulStats'> & {
    heading: EntryFields.Symbol;
    body: CustomFields.Markdown<'body'>;
    theme: 'dark' | 'primary';
    stats: StatItem[];
};

export type Hero = SystemFields<'ContentfulHero'> & {
    heading: EntryFields.Symbol;
    body: CustomFields.Markdown<'body'>;
    image: CustomFields.Image;
    button: Button;
    theme: 'imgLeft' | 'imgRight';
};

export type TwoColumnContent = SystemFields<'Contentful2ColumnContent'> & {
    body: CustomFields.Markdown<'body'>;
    media: CustomFields.Image;
};

export type TextType = SystemFields<'ContentfulText'> & {
    body: CustomFields.Markdown<'body'>;
};

/* ---------- Templates ---------- */

export type ComposablePage = SystemFields<'ContentfulPage'> & {
    title: EntryFields.Symbol;
    slug: EntryFields.Symbol;
    sections: Array<Hero | Stats | TwoColumnContent | TextType>;
};

export type NavigationItem = SystemFields<'ContentfulNavigationItem'> & {
    text: EntryFields.Symbol;
    linkTo: ComposablePage;
};

export type Navigation = SystemFields<'ContentfulNavigation'> & {
    label: EntryFields.Symbol;
    navigationItems: Array<NavigationItem>;
};
