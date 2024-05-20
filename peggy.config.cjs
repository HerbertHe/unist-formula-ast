module.exports = {
  format: "es",
  input: "src/peggy/formula.peggy",
  output: "src/peggy/formula-parser.ts",
  plugins: ["ts-pegjs"],
  tspegjs: {
    customHeader: `import { u } from "unist-builder";`,
  },
}
