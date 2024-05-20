{
  // handle position
  function handlePosition(location) {
    delete location.source
    return location
  }
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
      return u('Addition', { children: [left, right], position: handlePosition(location()) });
    }
  / left:Multiplication _ "-" _ right:Addition {
      return u('Subtraction', { children: [left, right], position: handlePosition(location()) });
    }
  / Multiplication

// 乘法运算
Multiplication
  = left:Primary _ "*" _ right:Multiplication {
      return u('Multiplication', { children: [left, right], position: handlePosition(location()) });
    }
  / left:Primary _ "/" _ right:Multiplication {
      return u('Division', { children: [left, right], position: handlePosition(location()) });
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
      return u('Function', { value: name, children: args, position: handlePosition(location()) });
    }

// 函数名
FunctionName
  = name:[a-zA-z0-9]+ { return name.join(""); }

// 参数列表
ArgumentList
  = head:Argument tail:(_ "," _ Argument)* {
      return [head].concat(tail.map(item => item[3]));
    }

// 参数类型
Argument
  = Expression
  / Variable
  / FunctionCall
  / Number

// 变量类型
Variable
  = "$" [a-zA-Z_][a-zA-Z0-9_]* {
    return u("Variable", { value: text(), position: handlePosition(location()) });
  }

// 数字
Number
  = digits:[0-9\.]+ {
      return u('Number', { value: parseFloat(digits.join(""), 10), position: handlePosition(location()) });
    }

// 空格处理
_ "whitespace"
  = [ \t\n\r]*
