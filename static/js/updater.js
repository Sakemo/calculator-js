class UpdaterClass{
    OutputOperation(operation){
        OUTPUT_OPERATION_EL.innerHTML = operation
    }

    OutputResult(result){
        OUTPUT_RESULT_EL.innerHTML = result
    }

    Search(array, keyword){
        let SearchResult = [];

        array.forEach((element, index) => {
            if(element == keyword){
                SearchResult.push(index);
            };
        });

        return SearchResult;
    };

    PowerBaseGetter(DataFormula, PowerSearchResult){
        let PowerBases = [];

        PowerSearchResult.forEach(powerIndex =>{
            let base = [];
            let parent = 0;
            let pIndex = powerIndex -1;

            while(pIndex >= 0){

                if(DataFormula[pIndex] == '('){
                    parent--;
                };
                if(DataFormula[pIndex] == ')' ){
                    parent++;
                };

                let IsOperator = false;
                OPERATORS.forEach(OPERATOR =>{
                    if(DataFormula[pIndex] == OPERATOR){
                        IsOperator = true
                    };
                })

                let IsPower = DataFormula[pIndex] == POWER;

                if((IsOperator && parent == 0) || IsPower){
                    break;
                };

                base.unshift(DataFormula[pIndex]);
                pIndex--;
            }

            PowerBases.push(base.join(''));
        });

        return PowerBases;

    };

    NumbersGetter(DataFormula, FactoSearchResult){
        let numbers = [];
        let FactQueue = 0;

        FactoSearchResult.forEach(FactIndex =>{
            let number = [];
            let nIndex = FactIndex + 1;
            let nInput = DataFormula[nIndex];
        
            if(nIndex == FACTORIAL){
                FactQueue += 1;
                return;
            };

            let FirstFactorialIndex = FactIndex - FactQueue;
            let pIndex = FirstFactorialIndex - 1;
            let parent = 0;

            while(pIndex >= 0){

                if(DataFormula[pIndex] == '('){
                    parent--;
                };
                if(DataFormula[pIndex] == ')' ){
                    parent++;
                };

                let IsOperator = false;
                OPERATORS.forEach(OPERATOR =>{
                    if(DataFormula[pIndex] == OPERATOR){
                        IsOperator = true
                    };
                })

                if((IsOperator && parent == 0)){
                    break;
                };

                number.unshift(DataFormula[pIndex]);
                pIndex--;
            }

            let numberStr = number.join('');
            const Factorial = "OPERATIONS.factorial("
            const closeParent = ")"
            let Time = FactQueue + 1;

            let toReplace = number + FACTORIAL.repeat(Time);
            let replacement = Factorial.repeat(Time) + numberStr + closeParent.repeat(Time);

            numbers.push({
                toReplace : toReplace,
                replacement : replacement
            });

            FactQueue = 0;

        });

        return numbers;

    };

};