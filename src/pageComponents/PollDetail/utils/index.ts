export const getShareText = (title: string) => {
  function decodeHtmlEntity(str: string) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(str, 'text/html');
    return doc.documentElement.textContent;
  }
  const decoded = decodeHtmlEntity(title);
  return `${decoded}\n
🔥 The campaign is in progress.\n
🌈 Cast your vote to express your opinion!\n
`;
};
