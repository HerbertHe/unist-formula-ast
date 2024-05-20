import { visit } from "unist-util-visit"
import { parser } from "./parser"

const validateTree = () => {
    
}

/**
 * Validate the formula and return errors for CodeMirror
 * @param {string} formula
 */
export const validateForCodeMirror = (formula: string) => {
  try {
    // parse to get tree
    const tree = parser.parse(formula)

  } catch (err) {
    // TODO handle the error
    if (err instanceof parser.PeggySyntaxError) {
        // Peggy Syntax Error
    }
  }
}
