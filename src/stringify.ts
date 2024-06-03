import { visit } from "unist-util-visit"
import { BasicNodeEnum, type SupportedNodeType } from "./types"

/**
 * Stringify the ast node
 * @param {SupportedNodeType} node ast node
 * @returns 
 */
export const stringify = (node: SupportedNodeType) => {
  let result: string = ""
  visit(node, (node: SupportedNodeType) => {
    const { type, children, data } = node
    switch (type) {
      case BasicNodeEnum.Addition: {
        result += `${stringify(children[0])}+${stringify(children[1])}`
        break
      }
      case BasicNodeEnum.Subtraction: {
        result += `${stringify(children[0])}-${stringify(children[1])}`
        break
      }
      case BasicNodeEnum.Multiplication: {
        result += `${stringify(children[0])}*${stringify(children[1])}`
        break
      }
      case BasicNodeEnum.Division: {
        result += `${stringify(children[0])}/${stringify(children[1])}`
        break
      }
      case BasicNodeEnum.Number: {
        result += data
        break
      }
      case BasicNodeEnum.Variable: {
        result += data
        break
      }
      case BasicNodeEnum.String: {
        result += data
        break
      }
      case BasicNodeEnum.Function: {
        result += `${data}(${children
          .map((child) => stringify(child))
          .join("")})`
        break
      }
    }
  })
  return result.trim()
}
