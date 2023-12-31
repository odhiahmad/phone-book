export const colors = {
  main: "#7E9D7D",
  second: "#7E9D7A",
  // BLACK
  black50: "#606060",
  black30: "#D0D0D0",
  black20: "#F4F7F9",
  black10: "#F9F9F9",
  // WHITE
  white100: "#FFFFFF",
};

const main = 14;

export const sizes = {
  main: `${main}px`,
  h1: `${32 / main}rem`,
  // PADDING
  bodyPadding: `${24 / main}rem`,
  topbarHeight: 60,
};

export const zIndexs = {
  topbar: 50,
};

export const windows = {
  medium: (styles: string) => `
      @media screen and (min-width: 600px) {
        ${styles}
      }
    `,
};
