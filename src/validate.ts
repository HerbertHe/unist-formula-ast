import { visit } from "unist-util-visit"
import { parser } from "./parser"

const validateTree = () => {
  // TODO validate
}

const transformUnistErrorsToCodeMirrorMarkers = () => {
  // TODO validate
}

/**
 * Validate the formula and return errors for CodeMirror
 * @param {string} formula
 */
export const validateForCodeMirror = (formula: string) => {
  try {
    // First, parse to get tree
    const tree = parser.parse(formula)
    // Next, validate tree to get errors
    // Next, transfrom unist errors to CodeMirror Markers
    // Then, the CodeMirror can use the markers to render for the users
  } catch (err) {
    // TODO handle the error
    if (err instanceof parser.PeggySyntaxError) {
      // Peggy Syntax Error
    }
  }
}
