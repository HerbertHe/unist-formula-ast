import { visit } from "unist-util-visit"
import { BasicNodeEnum, type SupportedNodeType } from "./types"

export const stringify = (node: SupportedNodeType) => {
  let result: string = ""
  visit(node, (node: SupportedNodeType) => {
    const { type, children, value } = node
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
        result += value
        break
      }
      case BasicNodeEnum.Variable: {
        result += value
        break
      }
      case BasicNodeEnum.Function: {
        result += `${value}(${children
          .map((child) => stringify(child))
          .join("")})`
        break
      }
    }
  })
  return result.trim()
}
