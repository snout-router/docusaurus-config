export function buildSandboxUrl(id: string): string {
  const url = new URL("https://codesandbox.io/");
  url.pathname = `/s/${id}`;

  return url.toString();
}
