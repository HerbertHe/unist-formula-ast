export type BasicCalculationNodeType =
  | "Addition"
  | "Subtraction"
  | "Multiplication"
  | "Division"

export type BasicNodeType = "Number" | "Variable" | "String" | "Function"

export enum BasicNodeEnum {
  Number = "Number",
  Variable = "Variable",
  String = "String",
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
  data?: string | number
  position: IBasicNodePosition
  children?: IBasicNode[]
}

export interface IBasicCalculationNode extends IBasicNode {
  type: BasicCalculationNodeType
  children: IBasicNode[]
}

export interface INumberNode extends IBasicNode {
  type: "Number"
  data: number
}

export interface IVariableNode extends IBasicNode {
  type: "Variable"
  data: string
}

export interface IStringNode extends IBasicNode {
  type: "String"
  data: string
}

export type FuntionCallArgumentType = IBasicNode

export interface IFuntionCallNode extends IBasicNode {
  type: "Function"
  data: string
  children: FuntionCallArgumentType[]
}

export type SupportedNodeType =
  | IBasicNode
  | IBasicCalculationNode
  | INumberNode
  | IVariableNode
  | IStringNode
  | IFuntionCallNode

  export interface ISyntaxError {
    name: string
    message: string
    location?: IBasicNodePosition
  }