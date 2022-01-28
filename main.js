let txt = document.getElementById("text");
//let tokenString = "";
let data = {
  userInput: txt.value,
  splittedInput: [],
};

function splitUserInput(stringData) {
  let splittedData = stringData.split(/([*\/+-])/);
  console.log(splittedData); // ['2','+','4','-','7']
  data.splittedInput = splittedData;
  console.log(typeof splittedData); //object

  return splittedData;
}
//function splitOperation(operation) {
//return operation.match(/(\d+(\.\d+)?|[+\-*/])/g);
//}

function Compute(data) {
  let token = splitUserInput(data);

  /* 
    token.push(data.splittedData);
  
    console.log(typeof(token))
  console.log('THIS IS THE LORD OF THE RINGS '+ token);

*/

  Array.prototype.peek = function () {
    if (this.length === 0) {
      throw new Error("out of bounds");
    }
    return this[this.length - 1];
  };

  let operator = ["+", "-", "*", "/", "^", "x"];

  let operatorArray = ["$"];
  console.log("First pushed operator " + operatorArray);

  let outputArray = [];

  //token = 3*4+(2+9/3)*5
  //token = ["3", "*", "4", "+", "(", "2", "+", "9", "/", "3", ")", "*", "5"];
  //token = 3*4+(2+9/3/4*6)*5+9
  /*
      token = [
        "3",
        "*",
        "4",
        "+",
        "(",
        "2",
        "+",
        "9",
        "/",
        "3",
        "/",
        "4",
        "*",
        "6",
        ")",
        "*",
        "5",
        "+",
        "9",
      ];
      */
  const lastOperator = operator.peek();
  console.log(lastOperator); // ^

  // define a precedent function

  function prec(token) {
    if (token == "$") {
      return 0;
    }
    if (token == "(") {
      return 1;
    }
    if (token == "+") {
      return 2;
    }
    if (token == "-") {
      return 2;
    }
    if (token == "*" || "x") {
      return 3;
    }
    if (token == "/") {
      return 3;
    }
  }

  // Creating a peek method on the array to check the last added element.

  token.forEach((token) => {
    let isNumber = false;

    if (
      token.includes("0") ||
      token.includes("1") ||
      token.includes("2") ||
      token.includes("3") ||
      token.includes("4") ||
      token.includes("5") ||
      token.includes("6") ||
      token.includes("7") ||
      token.includes("8") ||
      token.includes("9")
    ) {
      isNumber = true;
    }

    if (isNumber) {
      outputArray.push(token);
      console.log("Ebe this is the outputs array " + outputArray);
    }
    if (token == "(") {
      operatorArray.push(token);
    }

    let topOp = operatorArray.peek();
    console.log("Hi Panda " + prec(topOp));

    if (token == ")") {
      while (topOp !== "(") {
        console.log(" I am about to pop " + topOp);
        let temp = operatorArray.pop(topOp);
        console.log(" I just popped " + topOp);
        outputArray.push(temp);
        console.log("popped " + outputArray);

        outputArray.push(operatorArray.pop(topOp));
        break;
      }
      return;
    }

    if (operator.includes(token)) {
      while (prec(topOp) >= prec(token)) {
        //operatorArray.pop(topOp);
        //append topOp to outputArray
        let tempOp = operatorArray.pop(topOp);
        // console.log('THis is the temp op ' + tempOp);

        outputArray.push(tempOp);
        break;
        //continue;

        // console.log(outputArray)
        //console.log(operatorArray + 'done after popping')
      }

      operatorArray.push(token);
      console.log("Yes I did MF!!!!..." + operatorArray);
      //return;
    }

    //token = ["3", "*", "4", "+", "(", "2", "+", "9", "/", "3", ")", "*", "5"];
  });

  let filteredOperator = operatorArray.filter((e) => e !== "$" && e !== "(");
  console.log(filteredOperator);
  // need to reverse it before pushing
  let reversedfilteredOperator = filteredOperator.reverse();
  outputArray.push.apply(outputArray, reversedfilteredOperator);
  //outputArray.join(reversedfilteredOperator);
  console.log("This is the output Array " + outputArray);
  console.log(operatorArray);
  console.log("final result should be 34*293/4/6*+5*+9+");
  console.log(outputArray);

  //token = 3*4+(2+9/3/4*6)*5+9

  //Postfix to result Algorithm

  const numoutputArray = outputArray.map((v) => (isNaN(v) ? v : Number(v)));
  console.log(numoutputArray);
  let resultArray = [];
  const operators = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    x: (a, b) => a * b,
    "/": (a, b) => a / b,
  };

  for (const value of numoutputArray) {
    if (value in operators) {
      (b = resultArray.pop()), (a = resultArray.pop());
      resultArray.push(operators[value](a, b));
      continue;
    }
    resultArray.push(value);
  }

  console.log(resultArray);
  let resultRounded = Math.round(resultArray * 100) / 100;
  theResult.textContent = resultRounded;

  //Creating the Async Function

  const getUrl = (num) => `http://numbersapi.com/${num}`;
  const getFacts = async (num) => {
    try {
      const resp = await fetch(getUrl(num));
      const data = await resp.text();
      //console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  // You have to wrap the dom manipulation with an async function
  (async () => {
    let theQuote = document.getElementById("quote");
    let quoteNumber = Math.round(resultArray)    // or else directly pushing resultArray will result in sth else
    theQuote.textContent = await getFacts(quoteNumber);
  })();

  console.log("HERE " + getFacts(resultArray)); // [object promise]

  return resultArray;
}

let btnEqual = document.getElementById("equals");
btnEqual.addEventListener(
  "click",
  (event) => Compute(txt.value)
  // (event) => getFacts
);

let theResult = document.getElementById("result");
