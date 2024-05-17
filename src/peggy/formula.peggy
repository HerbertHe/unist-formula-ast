{
  const u = require("unist-builder");
}

// 公式
Formula
  = _ expr: Expression _ { return expr; }

// 表达式
Expression
  = Addition

// 加法运算
Addition
  = left:Multiplication _ "+" _ right:Addition {
      return u('addition', { left, right, position: location() });
    }
  / left:Multiplication _ "-" _ right:Addition {
      return u('subtraction', { left, right, position: location() });
    }
  / Multiplication

// 乘法运算
Multiplication
  = left:Primary _ "*" _ right:Multiplication {
      return u('multiplication', { left, right, position: location() });
    }
  / left:Primary _ "/" _ right:Multiplication {
      return u('division', { left, right, position: location() });
    }
  / Primary

// 基础表达式
Primary
  = Number
  / FunctionCall
  / "(" _ expr:Expression _ ")" { return expr; }

// 函数调用
FunctionCall
  = name:FunctionName _ "(" _ args:ArgumentList _ ")" {
      return u('function', { name, arguments: args, position: location() });
    }

// 函数名
FunctionName
  = name:[a-zA-z0-9]+ { return name.join(""); }

// 参数列表
// TODO: 支持变量声明
ArgumentList
  = head:Expression tail:(_ "," _ Expression)* {
      return [head].concat(tail.map(item => item[3]));
    }

// 数字
Number
  = digits:[0-9]+ {
      return u('number', { value: parseInt(digits.join(""), 10), position: location() });
    }

// 空格处理
_ "whitespace"
  = [ \t\n\r]*
