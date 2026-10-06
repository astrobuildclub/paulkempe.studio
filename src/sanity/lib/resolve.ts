// ./src/sanity/lib/resolve.ts
// Koppelt documenten aan URL's voor de Presentation tool.

import { defineDocuments, defineLocations } from "sanity/presentation";
import type { PresentationPluginOptions } from "sanity/presentation";

export const resolve: PresentationPluginOptions["resolve"] = {
  // Welk document hoort bij de pagina die in de preview openstaat.
  mainDocuments: defineDocuments([
    {
      route: "/",
      filter: `_type == "pages" && pageType == "homepage"`,
    },
    {
      route: "/about",
      filter: `_type == "pages" && pageType == "about"`,
    },
    {
      route: "/post/:slug",
      filter: `_type == "post" && slug.current == $slug`,
    },
  ]),
  // Op welke pagina's een document zichtbaar is.
  locations: {
    pages: defineLocations({
      select: {
        title: "title",
        pageType: "pageType",
      },
      resolve: (doc) => {
        // Homepage, about en contact staan alle drie op de homepage.
        const locations = [{ title: "Home", href: "/" }];
        if (doc?.pageType === "about") {
          locations.push({ title: doc?.title || "About", href: "/about" });
        }
        return { locations };
      },
    }),
    // Add more locations for other post types
    post: defineLocations({
      select: {
        title: "title",
        slug: "slug.current",
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || "Untitled",
            href: `/post/${doc?.slug}`,
          },
          { title: "Posts", href: "/" },
        ],
      }),
    }),
  },
};
