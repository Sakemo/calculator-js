function CreateButtons(){
    let CurrentButtons = 0;

    calculator_buttons.forEach(button => {
        if(CurrentButtons % BUTTONS_PER_ROW == 0){
            INPUT_EL.innerHTML += `<div class='row'></div>`;
        }

        const row = document.querySelector(`.row:last-child`)
        row.innerHTML += `<button id=${button.name}>
                            ${button.symbol}
                          </button>`

        CurrentButtons ++;

    });
}

CreateButtons()

INPUT_EL.addEventListener('click', event =>{
    const target = event.target;
    calculator_buttons.forEach(button => {
        if(button.name == target.id){
            MATH.calculator(button);
        }
    })
})