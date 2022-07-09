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

declare module "@snout/docusaurus-config/sandbox" {
  export function buildUrl(id: string): string;
}
