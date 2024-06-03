import { describe, it } from "vitest"
import { validateForCodeMirror } from "../src/validate"

describe("测试语法验证函数", () => {
  it("测试 Code Mirror 验证函数", () => {
    const formula = "SUMsdd"
    validateForCodeMirror(formula)
    console.log("测试")
  })
})
