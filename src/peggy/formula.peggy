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

// TODO 支持比较运算

// 基础表达式
Primary
  = Number
  / String
  / Variable
  / FunctionCall
  / "(" _ expr:Expression _ ")" { return expr; }

// 函数调用
FunctionCall
  = name:FunctionName _ "(" _ args:ArgumentList _ ")" {
      return u('Function', { data: name, children: args, position: handlePosition(location()) });
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
  / String
  / FunctionCall
  / Number

// 变量类型
Variable
  = "$" [a-zA-Z_0-9][a-zA-Z0-9_\-]* {
    return u("Variable", { data: text(), position: handlePosition(location()) });
  }

// 字符串类型
String
  = '"' [^"]+ '"' {
    return u("String", { data: text(), position: handlePosition(location()) })
  }

// 整数
Integer
  = [0-9]+ {
    return u('Number', { data: parseInt(text(), 10), position: handlePosition(location()) });
  }

// 小数
Float
  = [0-9]+[\.][0-9]+ {
    return u('Number', { data: parseFloat(text(), 10), position: handlePosition(location()) });
  }

// 百分数
Percentage
  = [0-9]+[%] {
    return u("Number", { data: text(), position: handlePosition(location()) })
  }
  / [0-9]+[\.][0-9]+ {
    return u("Number", { data: text(), position: handlePosition(location()) })
  }

// 数字类型
Number
  = Percentage
  / Float
  / Integer

// 空格处理
_ "whitespace"
  = [ \t\n\r]*
