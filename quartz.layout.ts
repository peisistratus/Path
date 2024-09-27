import { PageLayout, SharedLayout } from "./quartz/cfg";
import * as Component from "./quartz/components";
import { JSX } from "preact"; // or react, depending on your setup

const CustomHead = (): JSX.Element => {
  return (
    <>
      {Component.Head()}
      <script
        defer
        src="https://cloud.umami.is/script.js"
        data-website-id="531f6609-9767-4690-9352-449099288545"
      ></script>
    </>
  );
};

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: CustomHead(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      X: "https://x.com/peisistratus",
    },
  }),
};

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer()),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer()),
  ],
  right: [],
}
