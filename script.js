const el_input = document.querySelector('.input');
const eo_output = document.querySelector('.operation .value');
const er_output = document.querySelector('.result .value');
const OPERATORS = ["+", "-", "*", "/"];
const POWER = "POWER";
const FACTORIAL = "FACTORIAL";

let data = {
    operation : [],
    formula : []
}
let ans = 0;

let calculator_buttons = [
    {
        name : "rad",
        symbol : "Rad",
        formula : false,
        type : "key"
    },
    {
        name : "deg",
        symbol : "Deg",
        formula : false,
        type : "key"
    },
    {
        name : "square-root",
        symbol : "√",
        formula : "Math.sqrt",
        type : "math_function"
    },
    {
        name : "square",
        symbol : "x²",
        formula : POWER,
        type : "math_function"
    },
    {
        name : "open-parenthesis",
        symbol : "(",
        formula : "(",
        type : "number"
    },
    {
        name : "close-parenthesis",
        symbol : ")",
        formula : ")",
        type : "number"
    },
    {
        name : "clear",
        symbol : "C",
        formula : false,
        type : "key"
    },
    {
        name : "delete",
        symbol : "⌫",
        formula : false,
        type : "key"
    },
    {
        name : "pi",
        symbol : "π",
        formula : "Math.PI",
        type : "number"
    },
    {
        name : "cos",
        symbol : "cos",
        formula : "trigo(Math.cos,",
        type : "trigo_function"
    },{
        name : "sin",
        symbol : "sin",
        formula : "trigo(Math.sin,",
        type : "trigo_function"
    },{
        name : "tan",
        symbol : "tan",
        formula : "trigo(Math.tan,",
        type : "trigo_function"
    },{
        name : "7",
        symbol : 7,
        formula : 7,
        type : "number"
    },{
        name : "8",
        symbol : 8,
        formula : 8,
        type : "number"
    },{
        name : "9",
        symbol : 9,
        formula : 9,
        type : "number"
    },
    {
        name : "division",
        symbol : "÷",
        formula : "/",
        type : "operator"
    },
    {
        name : "e",
        symbol : "e",
        formula : "Math.E",
        type : "number"
    },
    {
        name : "acos",
        symbol : "acos",
        formula : "inv_trigo(Math.acos,",
        type : "trigo_function"
    },{
        name : "asin",
        symbol : "asin",
        formula : "inv_trigo(Math.asin,",
        type : "trigo_function"
    },{
        name : "atan",
        symbol : "atan",
        formula : "inv_trigo(Math.atan,",
        type : "trigo_function"
    },
    {
        name : "4",
        symbol : 4,
        formula : 4,
        type : "number"
    },{
        name : "5",
        symbol : 5,
        formula : 5,
        type : "number"
    },{
        name : "6",
        symbol : 6,
        formula : 6,
        type : "number"
    },{
        name : "multiplication",
        symbol : "×",
        formula : "*",
        type : "operator"
    },{
        name : "factorial",
        symbol : "×!",
        formula : FACTORIAL,
        type : "math_function"
    },{
        name : "exp",
        symbol : "exp",
        formula : "Math.exp",
        type : "math_function"
    },{
        name : "ln",
        symbol : "ln",
        formula : "Math.log",
        type : "math_function"
    },{
        name : "log",
        symbol : "log",
        formula : "Math.log10",
        type : "math_function"
    },{
        name : "1",
        symbol : 1,
        formula : 1,
        type : "number"
    },{
        name : "2",
        symbol : 2,
        formula : 2,
        type : "number"
    },{
        name : "3",
        symbol : 3,
        formula : 3,
        type : "number"
    },{
        name : "subtraction",
        symbol : "–",
        formula : "-",
        type : "operator"
    },{
        name : "power",
        symbol : "x<span>y</span>",
        formula : POWER,
        type : "math_function"
    },{
        name : "ANS",
        symbol : "ANS",
        formula : "ans",
        type : "number"
    },{
        name : "percent",
        symbol : "%",
        formula : "/100",
        type : "number"
    },{
        name : "comma",
        symbol : ".",
        formula : ".",
        type : "number"
    },{
        name : "0",
        symbol : 0,
        formula : 0,
        type : "number"
    },{
        name : "calculate",
        symbol : "=",
        formula : "=",
        type : "calculate"
    },{
        name : "addition",
        symbol : "+",
        formula : "+",
        type : "operator"
    }
];


function CreateButtons() {
    const button_row = 8;
    let current_added_button = 0;

    calculator_buttons.forEach(button => {
        if (current_added_button % button_row == 0) {
            el_input.innerHTML += `<div class="row"></div>`;
        }

        const row = document.querySelector('.row:last-child');
        row.innerHTML += `<button id="${button.name}">
                            ${button.symbol}
                          </button>`;

        current_added_button++;
    });
}
CreateButtons();

let radian = true;
const rad_btn = document.getElementById("rad");
const deg_btn = document.getElementById("deg");

deg_btn.classList.add("active-angle")

function angleSwitcher(){
    rad_btn.classList.toggle("active-angle");
    deg_btn.classList.toggle("active-angle");
}

el_input.addEventListener("click", event => {
    const clicked_btn = event.target;

    calculator_buttons.forEach(button => {
        if (button.name == clicked_btn.id) {
            calculator(button);
        }
    });
});

function calculator(button) {
    if (button.type == "operator") {
        data.operation.push(button.symbol);
        data.formula.push(button.formula);
    } else if (button.type == "number") {
        data.operation.push(button.symbol);
        data.formula.push(button.formula);
    } else if (button.type == "trigo_function") { 
        data.operation.push(button.symbol + "(");
        data.formula.push(button.formula)
    } else if (button.type == "math_function") { 
        let symbol, formula

        if(button.name == "factorial"){
            symbol = "!";
            formula = button.formula;
            data.operation.push(symbol);
            data.formula.push(formula);
        }else if(button.name == "power"){
            symbol = "^(";
            formula = button.formula;
            data.operation.push(symbol);
            data.formula.push(formula);
        }else if(button.name == "square"){
            symbol = "^(";
            formula = button.formula;
            data.operation.push(symbol);
            data.formula.push(formula);
            data.operation.push("2");
            data.formula.push("2)");
        }else{
            symbol = button.symbol + "(";
            formula = button.formula + "(";
            data.operation.push(symbol);
            data.formula.push(formula);
        }
    }else if (button.type == "key") {
        if (button.name == "clear"){
            data.operation = [];
            data.formula = [];
            updateOutputResult(0)
        }else if(button.name == "delete"){
            data.operation.pop()
            data.formula.pop()
        }else if(button.name == "rad"){
            radian = true
            angleSwitcher()
        }else if(button.name == "deg"){
            radian = false
            angleSwitcher()
        }


    } else if (button.type == "calculate") {
        var formula_str = data.formula.join('');
        let result = eval(formula_str);
        updateOutputResult(result);
    }

    updateOutputOperation(data.operation.join(''));
}

function updateOutputOperation(operation) {
    eo_output.innerHTML = operation;
}

function updateOutputResult(result) {
    er_output.innerHTML = result;
}

// Não sou bom em matematica a função a seguir é uma adaptação da formula que pesquisei :)
function gamma(number) { 
    var precision_desired = 7, 
        p = [0.99999999999980993, 
            676.5203681218851, 
            -1259.1392167224028, 
            771.32342877765313, 
            -176.61502916214059, 
            12.507343278686905, 
            -0.13857109526572012, 
            9.9843695780195716e-6, 
            1.5056327351493116e-7];
    if(number < 0.5) {
      return Math.PI / Math.sin(number * Math.PI) / gamma(1 - number);
    }
    else {
      number--;
      var x = p[0];
      for(var i = 1; i < precision_desired + 2; i++) {
        x += p[i] / (number + i);
      }
      var t = number + precision_desired + 0.5;
      return Math.sqrt(2 * Math.PI) * Math.pow(t, (number + 0.5)) * Math.exp(-t) * x;
    }
}

function trigo(callback, angle){
    if(!radian){
        angle = angle*Math.PI/180;
    };
    return callback(angle)
}

function inv_trigo(callback, value){
    let angle = callback(value);

    if(!radian){
        angle = angle*180/Math.PI;
    }
    
    return angle;
}