// s/o to https://the-winter.github.io/codingjs

// https://the-winter.github.io/codingjs/exercise.html?name=sleepIn&title=Warmup-1
function sleepIn(weekday, vacation) {
    return !weekday || vacation;
}

// https://the-winter.github.io/codingjs/exercise.html?name=monkeyTrouble&title=Warmup-1
function monkeyTrouble(aSmile, bSmile) {
    return aSmile === bSmile;
}

// https://the-winter.github.io/codingjs/exercise.html?name=sumDouble&title=Warmup-1
function sumDouble(a, b){
    if (a === b) 
    {
        return (a + b) * 2;
    } 
    else {
        return a + b;
    }
}

// https://the-winter.github.io/codingjs/exercise.html?name=frontBack&title=Warmup-1
function frontBack(str){
    if (str.length <= 1) 
    {
        return str;
    }
      
    let charOne = str[0];
    let charLast = str[str.length - 1];
      
    return charLast + str.slice(1, str.length - 1) + charOne;
}

// https://the-winter.github.io/codingjs/exercise.html?name=intMax&title=Warmup-1
function intMax(a, b, c){
    return Math.max(a, b, c);
}
