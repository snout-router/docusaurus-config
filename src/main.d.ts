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

export function buildUrl(id: string): string;
