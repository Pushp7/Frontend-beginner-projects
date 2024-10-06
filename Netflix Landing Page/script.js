function toggle(){
    const flag = 0
    const accordion = document.getElementsByClassName('fAQ-accordion') //returns array of all the accordion
    // console.log(accordion);
    for(let i = 0; i < accordion.length; i++){
        accordion[i].addEventListener('click', function(){
            if(flag==0){
                document.getElementsByClassName("toggleBtn").style.display = "block";
                flag = 1;
            }
            else{
                document.getElementsByClassName("toggleBtn").style.display = "none";
                flag = 0;
            }
        })
    }

}

toggle()