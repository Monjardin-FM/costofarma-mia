export const capitalize = (item: String) => {
  return item.replace(/(^\w{1})|(\s+\w{1})/g, (letter: string) =>
    letter.toUpperCase(),
  );
};
