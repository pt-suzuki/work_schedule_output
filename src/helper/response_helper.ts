export const getJsonResponse = <T>(
  result: T
): GoogleAppsScript.Content.TextOutput => {
  const out = ContentService.createTextOutput();
  out.setMimeType(ContentService.MimeType.JSON);
  out.setContent(JSON.stringify(result));

  return out;
};
