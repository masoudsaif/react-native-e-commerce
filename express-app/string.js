export const capitalize = (a) =>
  a
    .split(" ")
    .map((b) => b.charAt(0).toUpperCase() + b.slice(1).toLowerCase())
    .join(" ");

module.exports = {
  capitalize,
};
