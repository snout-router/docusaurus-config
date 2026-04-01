import Head from "@docusaurus/Head";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import ThemeLayoutHead from "@theme-init/LayoutHead";
import React, { ComponentProps } from "react";

type Props = ComponentProps<typeof ThemeLayoutHead>;

export default function LayoutHead(props: Props) {
  const {
    siteConfig: { url },
  } = useDocusaurusContext();

  return (
    <>
      <ThemeLayoutHead {...props} />

      <Head>
        <link
          rel="apple-touch-icon"
          href={`${url}/apple-touch-icon-180x180.png`}
        />
        <link
          rel="icon"
          type="image/png"
          href={`${url}/favicon-32x32.png`}
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href={`${url}/favicon-16x16.png`}
          sizes="16x16"
        />
        <link
          rel="mask-icon"
          href={`${url}/safari-mask-icon.svg`}
          color="hsl(350, 100%, 85%)"
        />
      </Head>
    </>
  );
}
