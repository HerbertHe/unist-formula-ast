import { it, describe } from "vitest"
import { parser } from "../src/index"

describe("测试 parser", () => {
  it("测试基本公式", () => {
    const formula = "SUM(1, 2, $variable)"
    console.log(JSON.stringify(parser.parse(formula)))
  })

  it("测试无参数公式", () => {
    const formula = "TODAY()"
    console.log(JSON.stringify(parser.parse(formula)))
  })

  it("测试混合 parser", () => {
    const formula = "1 / 2 + SUM(1, 2, $variable)"
    console.log(JSON.stringify(parser.parse(formula)))
  })

  it("测试业务变量", () => {
    const formula = "$1-NAME"
    console.log(JSON.stringify(parser.parse(formula)))
  })

  it("测试小数", () => {
    const formula = "1.56"
    console.log(JSON.stringify(parser.parse(formula)))
  })

  it("测试整数", () => {
    const formula = "111"
    console.log(JSON.stringify(parser.parse(formula)))
  })

  it("测试负数", () => {
    const formula = "ABS(-1)"
    console.log(JSON.stringify(parser.parse(formula)))
  })

  it("测试负浮点数", () => {
    const formula = "ABS(-1.34)"
    console.log(JSON.stringify(parser.parse(formula)))
  })

  it("测试百分数", () => {
    const formula = "111%"
    console.log(JSON.stringify(parser.parse(formula)))
  })

  it("测试负百分数", () => {
    const formula = "-111.33%"
    console.log(JSON.stringify(parser.parse(formula)))
  })

  it("测试字符串", () => {
    const formula = `"test string"`
    console.log(JSON.stringify(parser.parse(formula)))
  })

  it("测试数组", () => {
    const formula = `JOIN(["aa", "bb"], "-")`
    console.log(JSON.stringify(parser.parse(formula)))
  })
})
