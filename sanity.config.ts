import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";

/* Sanity Studio, served by Next at /studio */
export default defineConfig({
  name: "mindfries",
  title: "Mindfries Blog",
  basePath: "/studio",
  projectId,
  dataset,
  apiVersion,
  plugins: [structureTool()],
  schema: { types: schemaTypes },
});
