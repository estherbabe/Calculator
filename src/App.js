import React from "react";
import { NumericFormat } from "react-number-format";
import "./styles.css";

export default function App() {
  const [initialState, setInitialState] = React.useState("");
  const [newState, setNewState] = React.useState("");
  const [output, setOutput] = React.useState("0");
  const [operator, setOperator] = React.useState(null);
  const [equals, setEquals] = React.useState(false);

  // function clickBtn(event) {
  //   setOutput(output + event.target.name);
  // }
  // function clear() {
  //   setOutput("");
  // }
  // function del() {
  //   setOutput(output.slice(0, output.length - 1));
  // }

  function outputValue(event) {
    //returns the decimal when its after a number or when clicked
    if (initialState.includes(".") && event.target.value === ".") return;
    //sets the initial state to an empty string when equals state is true
    if (equals) {
      setInitialState("");
    }
    //checks if theres a new state, then proceeds to set the new state
    // to concatenate the prev new state with another new state
    newState
      ? setNewState((preNewState) => preNewState + event.target.value)
      : setNewState(event.target.value);
    setEquals(false);
  }
  //backspacing
  function del() {
    setNewState(output.slice(0, output.length - 1));
  }
  //checks if there are changes(side effects) made to new state
  //and sets output to the new state
  React.useEffect(() => {
    setOutput(newState);
  }, [newState]);
  //sets output to 0 if theres no state
  React.useEffect(() => {
    setOutput("0");
  }, []);
  //resets our initial state and new state to an
  //empty string and our output to 0 when AC is clicked
  function clear() {
    setInitialState("");
    setNewState("");
    setOutput("0");
  }

  function operatorSign(event) {
    setEquals(false);
    setOperator(event.target.value);
    if (newState === "") return;
    if (initialState !== "") {
      return total();
    } else {
      setInitialState(newState);
      setNewState("");
    }
  }

  function total(event) {
    if (event?.target.value === "=") {
      setEquals(true);
    }
    let calc;
    if (operator === "÷") {
      calc = String(parseFloat(initialState) / parseFloat(newState));
    } else if (operator === "+") {
      calc = String(parseFloat(initialState) + parseFloat(newState));
    } else if (operator === "X") {
      calc = String(parseFloat(initialState) * parseFloat(newState));
    } else if (operator === "-") {
      calc = String(parseFloat(initialState) - parseFloat(newState));
    } else return;

    setOutput("");
    setInitialState(calc);
    setNewState("");
  }

  const percent = () => {
    initialState
      ? setNewState(String((parseFloat(newState) / 100) * initialState))
      : setNewState(String(parseFloat(newState) / 100));
  };

  return (
    <div className="container">
      <div className="calc_output">
        {output !== "" || output === "0" ? (
          <NumericFormat
            value={output}
            displayType={"text"}
            thousandSeparator={true}
          />
        ) : (
          <NumericFormat
            value={initialState}
            displayType={"text"}
            thousandSeparator={true}
          />
        )}
      </div>
      <div className="calc_buttons">
        <input onClick={clear} type="button" value="AC" id="highlight" />
        <input onClick={del} type="button" value="C" id="highlight" />
        <input
          onClick={percent}
          name="%"
          type="button"
          value="%"
          id="highlight"
        />
        <input
          onClick={operatorSign}
          name="÷"
          type="button"
          value="÷"
          id="highlight"
        />
        <input onClick={outputValue} name="7" type="button" value="7" />
        <input onClick={outputValue} name="8" type="button" value="8" />
        <input onClick={outputValue} name="9" type="button" value="9" />
        <input
          onClick={operatorSign}
          name="*"
          type="button"
          value="X"
          id="highlight"
        />
        <input onClick={outputValue} name="4" type="button" value="4" />
        <input onClick={outputValue} name="5" type="button" value="5" />
        <input onClick={outputValue} name="6" type="button" value="6" />
        <input
          onClick={operatorSign}
          name="+"
          type="button"
          value="+"
          id="highlight"
        />
        <input onClick={outputValue} name="1" type="button" value="1" />
        <input onClick={outputValue} name="2" type="button" value="2" />
        <input onClick={outputValue} name="3" type="button" value="3" />
        <input
          onClick={operatorSign}
          name="-"
          type="button"
          value="-"
          id="highlight"
        />
        <input onClick={outputValue} name="0" type="button" value="0" />
        <input onClick={outputValue} name="." type="button" value="." />
        <input onClick={total} id="equals" type="button" value="=" />
      </div>
    </div>
  );
}
