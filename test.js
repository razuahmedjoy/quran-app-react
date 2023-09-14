const second = () => {
    console.log('second');
}

const third = () => {
    console.log('third ');
}

const first = () => {
    console.log("Entered in First");
    
    setTimeout(second,0);

    third();
}

first();