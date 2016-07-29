let Route = require('./Route');
let readlineSync = require('readline-sync');

let result = new Route().execute("main");
console.log(result);
let route = new Route();
let resultText;
do {
    let input= readlineSync.question();

    resultText = route.execute(input);
    console.log(resultText);
} while (resultText!=="Thank U!Good Bye!");