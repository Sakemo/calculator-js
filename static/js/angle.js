var RADIAN = true;
const RADIAN_BUTTON = document.getElementById('rad');
const DEGREE_BUTTON = document.getElementById('deg');
function AngleSwitcher(rad_btn, deg_btn){
    rad_btn.classList.toggle("active-angle");
    deg_btn.classList.toggle("active-angle");
}

RADIAN_BUTTON.classList.add('active-angle');
RADIAN_BUTTON.addEventListener('click', event => {
    if(RADIAN == false){
        RADIAN = true;
    }else{
        RADIAN = false;
    }
    AngleSwitcher(RADIAN_BUTTON, DEGREE_BUTTON)
});DEGREE_BUTTON.addEventListener('click', event => {
    if(RADIAN == false){
        RADIAN = true;
    }else{
        RADIAN = false;
    }
    AngleSwitcher(RADIAN_BUTTON, DEGREE_BUTTON)
})