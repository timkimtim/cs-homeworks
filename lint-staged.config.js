module.exports = {
  "**/*.{js,jsx,ts,tsx}": (filenames) => [
    `tsc`,
    `eslint --fix ${filenames.join(" ")}`,
    `prettier --write ${filenames.join(" ")}`,
  ],
};
