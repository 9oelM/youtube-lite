export function decodeHtml(input: string): string | null {
  const doc = new DOMParser().parseFromString(input, `text/html`)
  return doc.documentElement.textContent
}
