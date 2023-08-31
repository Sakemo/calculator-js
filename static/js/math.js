class MathClass{
    constructor(){
        this.buttonActions = {
            "operator" : this.Operator,
            "number" : this.Number,
            "trigonometry" : this.Trigonometry,
            "math_function" : this.MathFunction,
            "key" : this.HandleKey,
            "calculate" : this.Calculate
        };
        this.HandleData = this.HandleData.bind(this);   
        this.SimpleData = this.SimpleData.bind(this);
    };

    SimpleData(symbol, formula){
        DATA.OPERATION.push(symbol);
        DATA.FORMULA.push(formula);
        this.Operation = DATA.OPERATION.join('');
        this.Formula = DATA.FORMULA.join('');
        UPDATE.OutputOperation(this.Operation)
    }

    HandleData(button){
        if (button.type == 'operator' || button.type == 'number'){
            DATA.OPERATION.push(button.symbol);
            DATA.FORMULA.push(button.formula);
        }
        this.Operation = DATA.OPERATION.join('');
        this.Formula = DATA.FORMULA.join('');
        UPDATE.OutputOperation(this.Operation)

        if (button.type == 'calculate'){
            let PowerSearchResult = UPDATE.Search(DATA.FORMULA, POWER);
            let FactoSearchResult = UPDATE.Search(DATA.FORMULA, FACTORIAL);
            const bases = UPDATE.PowerBaseGetter(DATA.FORMULA, PowerSearchResult);
            const numbers = UPDATE.NumbersGetter(DATA.FORMULA, FactoSearchResult);
            console.log(numbers)
            bases.forEach(base =>{
                let toReplace = base + POWER;
                let replacement = "Math.pow(" + base + ","; 
                this.Formula = this.Formula.replace(toReplace, replacement);
            })
            numbers.forEach(factorial =>{
                this.Formula = this.Formula.replace(factorial.toReplace, factorial.replacement);
                this.Formula = this.Formula.replace('FACTORIAL(', '');

            })

            console.log(this.Formula)

            try{     
                this.result = eval(this.Formula);
            }catch(error){
                if (error instanceof SyntaxError){
                    this.result = "Syntax Error"
                    UPDATE.OutputResult(this.result);
                    return
                }
            }

            ANS = this.result;
            CACHE.OPERATION.push(ANS);
            CACHE.FORMULA.push(ANS);
            UPDATE.OutputResult(this.result);
            return;

        }else if(button.type == 'key' && button.name == 'clear'){
            this.result = 0;
            UPDATE.OutputOperation('');
            UPDATE.OutputResult(this.result);
        };

    };

    calculator(button){
        const type = button.type;
        const action = this.buttonActions[type];

        if (action){
            this.HandleData(button);
            action.call(this, button);
        };
    };

    Operator(button){
    }

    Number(button){
        if(button.name == 'ANS'){
            ANS = CACHE.OPERATION[CACHE.OPERATION.length-1]
            DATA.FORMULA.pop();
            DATA.FORMULA.push(ANS);
        }
    }

    Trigonometry(button){
        let symbol = button.symbol + "(";
        let formula = button.formula;
        this.SimpleData(symbol, formula);
    }

    MathFunction(button){
        if (button.name == 'factorial'){
            let symbol = '!';
            let formula = button.formula;
            this.SimpleData(symbol, formula);
        }else if(button.name == 'power'){
            let symbol = '^(';
            let formula = button.formula;
            this.SimpleData(symbol, formula)
        }else if(button.name == 'square'){
            let symbol = '^(';
            let formula = button.formula;
            this.SimpleData(symbol, formula)
            this.SimpleData('2)','2)')
        }else{
            let symbol = button.symbol + '(';
            let formula = button.formula + '(';
            this.SimpleData(symbol, formula);
        }
    }
    
    HandleKey(button){
        if (button.name == "clear"){
            DATA.OPERATION = [];
            DATA.FORMULA = [];
        }else if(button.name == "delete"){
            DATA.OPERATION.pop();
            DATA.FORMULA.pop();
            this.Operation = DATA.OPERATION.join('');
            UPDATE.OutputOperation(this.Operation);
        };
    };

    Calculate(button){
    };
};

class OperationsClass extends MathClass{
    trigo(callback, angle){
        if(!RADIAN){
            angle = angle * Math.PI/180;
        };
        return callback(angle);
    };

    inv_trigo(callback, value){
        let angle = callback(value);
        if(!RADIAN){
            angle = angle * 180/Math.PI;
        }
        return angle;
    };

    factorial(number){
        if(number % 1 != 0){
            return this.gamma(number+1);
        }
        if(number === 0 || number === 1){
            return 1;
        }else{
            let result = 1;
            for(let i = 1; i <= number; i++){
                result *= i;
                if(result === Infinity){
                    return Infinity;
                };            
            };
            return result
        };
    };

    gamma(number) { 
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

};