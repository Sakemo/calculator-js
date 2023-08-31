const UPDATE = new UpdaterClass
const MATH = new MathClass
const OPERATIONS = new OperationsClass
const BUTTONS_PER_ROW = 8;
const INPUT_EL = document.querySelector('.input');
const OUTPUT_OPERATION_EL = document.querySelector('.output .operation .value');
const OUTPUT_RESULT_EL = document.querySelector('.output .result .value');
const OPERATORS = ["+", "-", "*","/"];
const POWER = "POWER(";
const FACTORIAL = "FACTORIAL(";
var CACHE = {
    OPERATION : [],
    FORMULA : []
};
var DATA = {
    OPERATION : [],
    FORMULA : []
};
var ANS = 0;
