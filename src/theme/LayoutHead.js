import Head from '@docusaurus/Head'
import ThemeLayoutHead from '@theme-init/LayoutHead'
import React from 'react'

export default function LayoutHead (props) {
  return <>
    <ThemeLayoutHead {...props} />

    <Head>
      <link rel='apple-touch-icon' href='https://snout.dev/apple-touch-icon-180x180.png' />
      <link rel='icon' type='image/png' href='https://snout.dev/favicon-32x32.png' sizes='32x32' />
      <link rel='icon' type='image/png' href='https://snout.dev/favicon-16x16.png' sizes='16x16' />
      <link rel='mask-icon' href='https://snout.dev/safari-mask-icon.svg' color='hsl(350, 100%, 85%)' />
    </Head>
  </>
}
