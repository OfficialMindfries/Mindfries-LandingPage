"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../sanity.config";

/* The Studio runs entirely in the browser, so its config is only imported here. */
export default function Studio() {
  return <NextStudio config={config} />;
}
