export type BasicCalculationNodeType =
  | "Addition"
  | "Subtraction"
  | "Multiplication"
  | "Division"

export type BasicNodeType = "Number" | "Variable" | "Function"

export enum BasicNodeEnum {
  Number = "Number",
  Variable = "Variable",
  Function = "Function",
  Addition = "Addition",
  Subtraction = "Subtraction",
  Multiplication = "Multiplication",
  Division = "Division",
}

export interface IBasicNodePositionItem {
  line: number
  column: number
  offset: number
}

export interface IBasicNodePosition {
  start: IBasicNodePositionItem
  end: IBasicNodePositionItem
}

export interface IBasicNode {
  type: BasicNodeType | BasicCalculationNodeType
  value?: string | number
  position: IBasicNodePosition
  children?: IBasicNode[]
}

export interface IBasicCalculationNode extends IBasicNode {
  type: BasicCalculationNodeType
  children: IBasicNode[]
}

export interface INumberNode extends IBasicNode {
  type: "Number"
  value: number
}

export interface IVariableNode extends IBasicNode {
  type: "Variable"
  value: string
}

export type FuntionCallArgumentType = IBasicNode

export interface IFuntionCallNode extends IBasicNode {
  type: "Function"
  value: string
  children: FuntionCallArgumentType[]
}

export type SupportedNodeType =
  | IBasicNode
  | IBasicCalculationNode
  | INumberNode
  | IVariableNode
  | IFuntionCallNode
