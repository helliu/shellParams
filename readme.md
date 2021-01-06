# shellparams

Lib to manage parameters and actions in Node Console applications.


## Installing
```
npm install shellparams
```

## Syntax
```js
let ShellParams = require("shellparams");

ShellParams.create()
.parameters( <PARAM1...ETC>, <ACTION> )
.default( <DEFAULT_ACTION> );
```

## Example

```js
let ShellParams = require("shellparams");

ShellParams.create()
.parameters("create", () => console.log("create selection") )
.parameters("create", "project", () => console.log("creating project"))
.parameters("sum", sumNumbers)
.default(() => console.log("Invalid input."));


function sumNumbers(input1, input2){
   let number1 = Number(input1);
   let number2 = Number(input2);

   let sum = number1 + number2;

   console.log("the sum result is: " + sum);
}
```

Will generate:
```
$ myApp create
$ create selection
```

```
$ myApp create project
$ creating project
```

```
$ myApp sum 2 4
$ the sum result is: 6
```

```
$ myApp adfasdfa
$ Invalid input.
```