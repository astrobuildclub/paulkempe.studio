/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="@sanity/astro/module" />

declare namespace App {
  interface Locals {
    // Gezet door src/middleware.ts: preview-cookie én in de iframe van de Presentation tool.
    visualEditing: boolean;
  }
}
