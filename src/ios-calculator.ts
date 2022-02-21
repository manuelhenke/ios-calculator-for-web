import html from "./ios-calculator.html";
import shadowCss from "./ios-calculator.scss";
import { evaluate } from "mathjs";

const template = document.createElement("template");
template.innerHTML = html;

const sheet = document.createElement("style");
sheet.innerHTML = shadowCss.toString();

export class IOSCalculator extends HTMLElement {
  private readonly CHARACTERS = {
    PLUS: "+",
    MINUS: "-",
    MULTIPLY: "*",
    DIVIDE: "/",
    EQUALS: "=",
    NEGATIVE: "-",
    COMMA: ",",
  };

  private currentExpression = "";
  private currentInput = "";

  // TODO: use these
  private suggestedInput = "";
  private lastOperand = "";

  private calcSolution: HTMLElement;
  private resetButton: HTMLElement;
  private plusMinusButton: HTMLElement;
  private percentageButton: HTMLElement;
  private operandButtons: HTMLElement[];
  private digitButtons: HTMLElement[];

  static get observedAttributes() {
    return [];
  }

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(sheet.cloneNode(true));
    shadowRoot.appendChild(template.content.cloneNode(true));

    this.calcSolution = shadowRoot.querySelector(".calc-solution")!;

    this.resetButton = shadowRoot.getElementById("reset")!;
    this.plusMinusButton = shadowRoot.getElementById("plus-minus")!;
    this.percentageButton = shadowRoot.getElementById("percentage")!;

    this.operandButtons = Array.from(shadowRoot.querySelectorAll(".calc-button-operand"));
    this.digitButtons = Array.from(shadowRoot.querySelectorAll(".calc-button-digit"));

    this.resetButton.addEventListener("click", this.onResetClick.bind(this));
    this.plusMinusButton.addEventListener("click", this.onPlusMinusClick.bind(this));
    this.percentageButton.addEventListener("click", this.onPercentageClick.bind(this));
    this.operandButtons.forEach((operandButton) =>
      operandButton.addEventListener("click", () => this.onOperandClick(operandButton))
    );
    this.digitButtons.forEach((digitButton) =>
      digitButton.addEventListener("click", () => this.onDigitClick(digitButton))
    );
  }

  connectedCallback() {
    if (this.shadowRoot) {
      this.displaySolution();
    }
  }

  private onResetClick() {
    const textSpan = this.resetButton.querySelector("span")!;

    if (textSpan.textContent === "AC") {
      // AC
      this.currentInput = "";
      this.currentExpression = "";
      this.operandButtons.forEach(this.removeActiveState);
    } else {
      // C
      this.currentInput = "0";
      textSpan.textContent = "AC";
    }

    this.displaySolution();
  }

  private onPlusMinusClick() {
    let number = "0";

    if (this.currentInput.length > 0) {
      number = this.currentInput;
    } else if (this.currentExpression.length > 0) {
      number = this.getCurrentSolution();
    }

    if (number.startsWith(this.CHARACTERS.NEGATIVE)) {
      this.currentInput = number.slice(1);
    } else {
      this.currentInput = this.CHARACTERS.NEGATIVE + number;
    }

    this.displaySolution();
  }

  private onPercentageClick() {
    let number = "0";

    if (this.currentInput.length > 0) {
      number = this.currentInput;
    } else if (this.currentExpression.length > 0) {
      number = this.getCurrentSolution();
    }

    let intermediateInput = number.replace(/,/g, ".");
    intermediateInput += "/100";
    this.currentInput = String(evaluate(intermediateInput));
    this.currentInput = this.currentInput.replace(".", this.CHARACTERS.COMMA);
    this.displaySolution();
  }

  private onDigitClick(digitButton: HTMLElement) {
    const clickedDigit = digitButton.dataset.digit || "";
    console.debug("-> clickedDigit:", clickedDigit);

    if (
      clickedDigit === this.CHARACTERS.NEGATIVE &&
      this.currentInput.includes(this.CHARACTERS.NEGATIVE)
    ) {
      // prevent clicking multiple times -> ,
      return;
    }

    if (!this.endsWithOperand(this.currentExpression)) {
      // reset expression if user starts a new calculations
      // -> clicking a number with clicking an operand beforehand
      this.currentExpression = "";
    }

    this.resetButton.querySelector("span")!.textContent = "C";

    if (this.currentInput === "" && clickedDigit === this.CHARACTERS.COMMA) {
      this.currentInput = "0" + this.CHARACTERS.COMMA;
    } else if (this.currentInput === "0" && clickedDigit !== this.CHARACTERS.COMMA) {
      this.currentInput = clickedDigit;
    } else if (this.currentInput === `${this.CHARACTERS.NEGATIVE}0` && clickedDigit !== this.CHARACTERS.COMMA) {
      this.currentInput = this.CHARACTERS.NEGATIVE + clickedDigit;
    } else {
      this.currentInput += clickedDigit;
    }

    this.displaySolution();
  }

  private onOperandClick(operandButton: HTMLElement) {
    this.operandButtons.forEach(this.removeActiveState);

    const clickedOperand = operandButton.dataset.operand;
    console.debug("-> clickedOperand:", clickedOperand);

    if (this.currentInput) {
      this.currentExpression += this.currentInput;
    }

    if (this.currentExpression.length === 0) {
      // in case user starts his calculation directly with an operand
      this.currentExpression = "0";
    }

    if (this.endsWithOperand(this.currentExpression)) {
      // if the user clicks two operands in a row, remove the last one
      this.currentExpression = this.currentExpression.slice(0, -1);
    }

    if (clickedOperand !== this.CHARACTERS.EQUALS) {
      this.currentExpression += clickedOperand;
      this.addActiveState(operandButton);
    } else {
      if (this.currentExpression.endsWith(")")) {
        // clicking = multiple times in a row
        let latestOperandIndex = -1;
        for (let index = this.currentExpression.length - 1; index > 0; index--) {
          if (this.endsWithOperand(this.currentExpression[index])) {
            latestOperandIndex = index;
            break;
          }
        }

        if (latestOperandIndex !== -1) {
          this.currentExpression += this.currentExpression.slice(latestOperandIndex, -1);
        }
      }

      this.currentExpression = `(${this.currentExpression})`;
    }

    this.currentInput = "";

    this.displaySolution();
  }

  private addActiveState(elem: HTMLElement) {
    elem.classList.add("active");
  }

  private removeActiveState(elem: HTMLElement) {
    elem.classList.remove("active");
  }

  private endsWithOperand(str: string) {
    const lastChar = str.slice(-1);
    return [
      this.CHARACTERS.PLUS,
      this.CHARACTERS.MINUS,
      this.CHARACTERS.DIVIDE,
      this.CHARACTERS.MULTIPLY,
    ].includes(lastChar);
  }

  private getCurrentSolution() {
    let expressionToEvaluate = this.currentExpression || "0";

    if (this.endsWithOperand(expressionToEvaluate)) {
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

  private displaySolution() {
    console.debug("currentExpression:", this.currentExpression);
    console.debug("currentInput:", this.currentInput);

    let integerToDisplay;

    if (this.currentInput.length > 0) {
      console.debug("Display input!");
      this.operandButtons.forEach(this.removeActiveState);
      integerToDisplay = this.currentInput;
    } else if (this.currentExpression.length > 0) {
      console.debug("Display expression!");

      let expressionToDisplay = this.currentExpression || "0";

      if (!this.endsWithOperand(expressionToDisplay)) {
        this.operandButtons.forEach(this.removeActiveState);
      }

      integerToDisplay = this.getCurrentSolution();
    } else {
      integerToDisplay = "0";
    }

    integerToDisplay = integerToDisplay.replace(".", this.CHARACTERS.COMMA);

    console.debug("integerToDisplay:", integerToDisplay);
    this.calcSolution.textContent = integerToDisplay;
    this.shadowRoot!.getElementById("expression")!.textContent = "Expression: " + this.currentExpression;
    this.shadowRoot!.getElementById("input")!.textContent = "Input: " + this.currentInput;

    console.debug("==============================");
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (newValue != oldValue) {
      switch (name) {
      }
    }
  }
}

customElements.define("ios-calculator", IOSCalculator);
