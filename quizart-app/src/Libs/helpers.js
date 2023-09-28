export const evalHTMLcode = (str) => {
  return str
    .replaceAll("&quot;", '"')
    .replaceAll("&ldquo;", "“")
    .replaceAll("&rdquo;", "”")
    .replaceAll("&#039;", "'")
    .replaceAll("&amp;", "&")
    .replaceAll("&deg;", "°")
    .replaceAll("&ouml;", "ö")
    .replaceAll("&oacute;", "ó")
    .replaceAll("&eacute;", "é")
    .replaceAll("&uuml;", "ü")
    .replaceAll("&Uuml;", "Ü")
    .replaceAll("&micro;", "μ");
};

export const sortRandomly = (arr, max) => {
  return arr
    .map((value) => ({
      value,
      sort: Math.floor(Math.random() * max),
    }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => ({
      answer: value,
      isCorrect: null,
    }));
};
