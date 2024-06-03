import { linter, type Diagnostic } from "@codemirror/lint"
import type {} from "@codemirror/state"

import { parser } from "./parser"
import { ISyntaxError } from "./types"

/**
 * Validate Formula Syntax Tree
 * @param formula 
 * @returns 
 */
export const validateFormulaSyntaxTree = (formula: string) => {
  try {
    parser.parse(formula)
    return null
  } catch (err) {
    if (err instanceof parser.PeggySyntaxError) {
      // Peggy Syntax Error
      const return_err = JSON.parse(
        JSON.stringify(err),
      ) as parser.PeggySyntaxError
      delete return_err.location.source
      return return_err as ISyntaxError
    }
    return {
      name: "Error",
      message: JSON.stringify(err),
    } as ISyntaxError
  }
}

/**
 * Formula Syntax Linter for Code Mirror
 */
export const formulaSyntaxLinter = linter((view) => {
  let diagnostics: Diagnostic[] = []
  const error = validateFormulaSyntaxTree(view.state.doc.toString())
  if (!error) return []

  if (!!error.location) {
    diagnostics.push({
      from: error.location.start.offset,
      to: error.location.end.offset,
      message: error.message,
      severity: "error"
    })
  }

  return diagnostics
})
