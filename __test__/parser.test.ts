import { test } from "vitest"
import { parser } from "../src/index"

test("测试 parser 输出", () => {
  const formula = "1 / 2 + SUM(1, 2, $variable)"
  console.log(JSON.stringify(parser.parse(formula)))
})
