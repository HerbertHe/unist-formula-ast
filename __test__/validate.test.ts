import { describe, it } from "vitest"
import { validateFormulaSyntaxTree } from "../src/validate"

describe("测试语法验证函数", () => {
  it("测试 Code Mirror 验证函数", () => {
    const formula = "SUMsdd"
    const result = validateFormulaSyntaxTree(formula)
    console.log(result?.message)
  })
})
