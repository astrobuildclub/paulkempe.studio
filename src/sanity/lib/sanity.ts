import { stegaClean } from "@sanity/client/stega";
import { loadQuery } from "./load-query";

export async function getSiteSettings() {
  // Het singleton-document uit de Studio (deskStructure: documentId "siteSettings").
  const { data } = await loadQuery<any>({
    query: `*[_type == "siteSettings" && _id == "siteSettings"][0]`,
  });
  // Settings gaan vooral naar meta-tags, JSON-LD, lang, tijdzone en icoonnamen:
  // daar mogen geen stega-tekens in. Drafts zie je in de preview wel.
  return stegaClean(data);
}
