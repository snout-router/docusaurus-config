import { DocusaurusConfig } from "@docusaurus/types";
import { ThemeConfig } from "@docusaurus/preset-classic";
import { Options } from "@docusaurus/plugin-client-redirects";

declare module "@theme/Sandbox" {
  interface Props {
    codeMirror?: boolean;
    height: string;
    hideDevTools?: boolean;
    id: string;
    inline?: boolean;
    previewWindow?: string;
  }

  export default function Sandbox(props: Props): JSX.Element;
}

type FooterLinks = NonNullable<NonNullable<ThemeConfig["footer"]>["links"]>;
type NavbarItems = NonNullable<NonNullable<ThemeConfig["navbar"]>["items"]>;
type Redirects = Options["redirects"];

export declare function createConfig(options: {
  rootPath: string;
  title: string;

  footerLinks?: FooterLinks;
  navbarItems?: NavbarItems;
  redirects?: Redirects;
}): DocusaurusConfig;
