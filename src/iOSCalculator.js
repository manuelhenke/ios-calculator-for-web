import html from "./ios-calculator.html";
import shadowCss from "./ios-calculator.scss";
import { evaluate } from "mathjs";

const template = document.createElement("template");
template.innerHTML = html;

const sheet = document.createElement("style");
sheet.innerHTML = shadowCss.toString();

export class iOSCalculator extends HTMLElement {
  static #CHARACTERS = {
    PLUS: "+",
    MINUS: "-",
    MULTIPLY: "*",
    DIVIDE: "/",
    EQUALS: "=",
    NEGATIVE: "-",
    COMMA: ",",
  };

  #currentExpression = "";
  #currentInput = "";

  // TODO: use these
  #suggestedInput = "";
  #lastOperand = "";

  /** @type {HTMLElement} */
  #calcSolution;
  /** @type {HTMLElement} */
  #resetButton;
  /** @type {HTMLElement} */
  #plusMinusButton;
  /** @type {HTMLElement} */
  #percentageButton;
  /** @type {HTMLElement[]} */
  #operandButtons;
  /** @type {HTMLElement[]} */
  #digitButtons;

  static get observedAttributes() {
    return [];
  }

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(sheet.cloneNode(true));
    shadowRoot.appendChild(template.content.cloneNode(true));

    this.#calcSolution = shadowRoot.querySelector(".calc-solution");

    this.#resetButton = shadowRoot.getElementById("reset");
    this.#plusMinusButton = shadowRoot.getElementById("plus-minus");
    this.#percentageButton = shadowRoot.getElementById("percentage");

    this.#operandButtons = Array.from(shadowRoot.querySelectorAll(".calc-button-operand"));
    this.#digitButtons = Array.from(shadowRoot.querySelectorAll(".calc-button-digit"));

    this.#resetButton.addEventListener("click", this.#onResetClick.bind(this));
    this.#plusMinusButton.addEventListener("click", this.#onPlusMinusClick.bind(this));
    this.#percentageButton.addEventListener("click", this.#onPercentageClick.bind(this));
    this.#operandButtons.forEach((operandButton) =>
      operandButton.addEventListener("click", () => this.#onOperandClick(operandButton))
    );
    this.#digitButtons.forEach((digitButton) =>
      digitButton.addEventListener("click", () => this.#onDigitClick(digitButton))
    );
  }

  connectedCallback() {
    if (this.shadowRoot) {
      this.#displaySolution();
    }
  }

  #onResetClick() {
    const textSpan = this.#resetButton.querySelector("span");

    if (textSpan.textContent === "AC") {
      // AC
      this.#currentInput = "";
      this.#currentExpression = "";
      this.#operandButtons.forEach(this.#removeActiveState);
    } else {
      // C
      this.#currentInput = "0";
      textSpan.textContent = "AC";
    }

    this.#displaySolution();
  }

  #onPlusMinusClick() {
    let number = "0";

    if (this.#currentInput.length > 0) {
      number = this.#currentInput;
    } else if (this.#currentExpression.length > 0) {
      number = this.#getCurrentSolution();
    }

    if (number.startsWith(iOSCalculator.#CHARACTERS.NEGATIVE)) {
      this.#currentInput = number.slice(1);
    } else {
      this.#currentInput = iOSCalculator.#CHARACTERS.NEGATIVE + number;
    }

    this.#displaySolution();
  }

  #onPercentageClick() {
    let number = "0";

    if (this.#currentInput.length > 0) {
      number = this.#currentInput;
    } else if (this.#currentExpression.length > 0) {
      number = this.#getCurrentSolution();
    }

    let intermediateInput = number.replace(/,/g, ".");
    intermediateInput += "/100";
    this.#currentInput = String(evaluate(intermediateInput));
    this.#currentInput = this.#currentInput.replace(".", iOSCalculator.#CHARACTERS.COMMA);
    this.#displaySolution();
  }

  /**
   * 
   * @param {HTMLElement} digitButton 
   * @returns 
   */
  #onDigitClick(digitButton) {
    const clickedDigit = digitButton.dataset.digit || "";
    console.debug("-> clickedDigit:", clickedDigit);

    if (
      clickedDigit === iOSCalculator.#CHARACTERS.NEGATIVE &&
      this.#currentInput.includes(iOSCalculator.#CHARACTERS.NEGATIVE)
    ) {
      // prevent clicking multiple times -> ,
      return;
    }

    if (!this.#endsWithOperand(this.#currentExpression)) {
      // reset expression if user starts a new calculations
      // -> clicking a number with clicking an operand beforehand
      this.#currentExpression = "";
    }

    this.#resetButton.querySelector("span").textContent = "C";
    
    if (this.#currentInput === "" && clickedDigit === iOSCalculator.#CHARACTERS.COMMA) {
      this.#currentInput = "0" + iOSCalculator.#CHARACTERS.COMMA;
    } else if (this.#currentInput === "0" && clickedDigit !== iOSCalculator.#CHARACTERS.COMMA) {
      this.#currentInput = clickedDigit;
    } else if (this.#currentInput === `${iOSCalculator.#CHARACTERS.NEGATIVE}0` && clickedDigit !== iOSCalculator.#CHARACTERS.COMMA) {
      this.#currentInput = iOSCalculator.#CHARACTERS.NEGATIVE + clickedDigit;
    } else {
      this.#currentInput += clickedDigit;
    }

    this.#displaySolution();
  }

  /**
   * 
   * @param {HTMLElement} operandButton 
   */
  #onOperandClick(operandButton) {
    this.#operandButtons.forEach(this.#removeActiveState);

    const clickedOperand = operandButton.dataset.operand;
    console.debug("-> clickedOperand:", clickedOperand);

    if (this.#currentInput) {
      this.#currentExpression += this.#currentInput;
    }

    if (this.#currentExpression.length === 0) {
      // in case user starts his calculation directly with an operand
      this.#currentExpression = "0";
    }

    if (this.#endsWithOperand(this.#currentExpression)) {
      // if the user clicks two operands in a row, remove the last one
      this.#currentExpression = this.#currentExpression.slice(0, -1);
    }

    if (clickedOperand !== iOSCalculator.#CHARACTERS.EQUALS) {
      this.#currentExpression += clickedOperand;
      this.#addActiveState(operandButton);
    } else {
      if (this.#currentExpression.endsWith(")")) {
        // clicking = multiple times in a row
        let latestOperandIndex = -1;
        for (let index = this.#currentExpression.length - 1; index > 0; index--) {
          if (this.#endsWithOperand(this.#currentExpression[index])) {
            latestOperandIndex = index;
            break;
          }
        }

        if (latestOperandIndex !== -1) {
          this.#currentExpression += this.#currentExpression.slice(latestOperandIndex, -1);
        }
      }

      this.#currentExpression = `(${this.#currentExpression})`;
    }

    this.#currentInput = "";

    this.#displaySolution();
  }

  /**
   * 
   * @param {HTMLElement} elem 
   */
  #addActiveState(elem) {
    elem.classList.add("active");
  }

  /**
   * 
   * @param {HTMLElement} elem 
   */
  #removeActiveState(elem) {
    elem.classList.remove("active");
  }

  /**
   * 
   * @param {string} str 
   * @returns 
   */
  #endsWithOperand(str) {
    const lastChar = str.slice(-1);
    return [
      iOSCalculator.#CHARACTERS.PLUS,
      iOSCalculator.#CHARACTERS.MINUS,
      iOSCalculator.#CHARACTERS.DIVIDE,
      iOSCalculator.#CHARACTERS.MULTIPLY,
    ].includes(lastChar);
  }

  #getCurrentSolution() {
    let expressionToEvaluate = this.#currentExpression || "0";

    if (this.#endsWithOperand(expressionToEvaluate)) {
      expressionToEvaluate = expressionToEvaluate.slice(0, -1);
    }

    expressionToEvaluate = expressionToEvaluate.replace(/,/g, ".");

    try {
      console.debug("expressionToEvaluate:", expressionToEvaluate);
      return evaluate(expressionToEvaluate).toString();
    } catch (err) {
      console.error(err);
      return "Error";
    }
  }

  #displaySolution() {
    console.debug("currentExpression:", this.#currentExpression);
    console.debug("currentInput:", this.#currentInput);

    let integerToDisplay;

    if (this.#currentInput.length > 0) {
      console.debug("Display input!");
      this.#operandButtons.forEach(this.#removeActiveState);
      integerToDisplay = this.#currentInput;
    } else if (this.#currentExpression.length > 0) {
      console.debug("Display expression!");

      let expressionToDisplay = this.#currentExpression || "0";

      if (!this.#endsWithOperand(expressionToDisplay)) {
        this.#operandButtons.forEach(this.#removeActiveState);
      }

      integerToDisplay = this.#getCurrentSolution();
    } else {
      integerToDisplay = "0";
    }

    integerToDisplay = integerToDisplay.replace(".", iOSCalculator.#CHARACTERS.COMMA);

    console.debug("integerToDisplay:", integerToDisplay);
    this.#calcSolution.textContent = integerToDisplay;
    this.shadowRoot.getElementById("expression").textContent = "Expression: " + this.#currentExpression;
    this.shadowRoot.getElementById("input").textContent = "Input: " + this.#currentInput;

    console.debug("==============================");
  }

  /**
   * @param {string} name 
   * @param {string} oldValue 
   * @param {string} newValue 
   */
  attributeChangedCallback(name, oldValue, newValue) {
    if (newValue != oldValue) {
      switch (name) {
      }
    }
  }
}

window.customElements.define('ios-calculator', iOSCalculator);