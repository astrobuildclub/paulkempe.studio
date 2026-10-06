// Haal alle Sanity-content via deze functie op, nooit direct via sanityClient.fetch.
// Visual Editing (drafts + stega) staat alleen aan in de iframe van de
// Presentation tool; zie src/middleware.ts en ~/Code/_standards/SANITY.md.
import { type QueryParams } from "sanity";
import { sanityClient } from "sanity:client";
import { isVisualEditing } from "./visual-editing";

const token = import.meta.env.SANITY_API_READ_TOKEN;

export async function loadQuery<QueryResponse>({
  query,
  params,
}: {
  query: string;
  params?: QueryParams;
}) {
  const visualEditingEnabled = isVisualEditing();

  if (visualEditingEnabled && !token) {
    throw new Error(
      "The `SANITY_API_READ_TOKEN` environment variable is required during Visual Editing.",
    );
  }

  const perspective = visualEditingEnabled ? "drafts" : "published";

  const { result, resultSourceMap } = await sanityClient.fetch<QueryResponse>(
    query,
    params ?? {},
    {
      filterResponse: false,
      perspective,
      resultSourceMap: visualEditingEnabled ? "withKeyArraySelector" : false,
      stega: visualEditingEnabled,
      ...(visualEditingEnabled ? { token } : {}),
    },
  );

  return {
    data: result,
    sourceMap: resultSourceMap,
    perspective,
  };
}
