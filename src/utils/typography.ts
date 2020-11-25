import Typography from "typography";
const fairyGates = require("typography-theme-fairy-gates");

fairyGates.overrideThemeStyles = (theme: any) => ({
  'h2,h3': {
    marginBottom: theme.rhythm(1/4),
  }
});

const typography = new Typography(fairyGates);

export const { scale, rhythm, options } = typography
export default typography;