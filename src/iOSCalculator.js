import { evaluate } from 'mathjs';
import html from './ios-calculator.html';
import shadowCss from './ios-calculator.scss';

const template = document.createElement('template');
template.innerHTML = html;

const sheet = document.createElement('style');
sheet.innerHTML = shadowCss.toString();

const CHARACTERS = {
  PLUS: '+',
  MINUS: '-',
  MULTIPLY: '*',
  DIVIDE: '/',
  EQUALS: '=',
  NEGATIVE: '-',
  COMMA: ',',
};

/**
 * @param {HTMLElement} elem
 */
function addActiveState(elem) {
  elem.classList.add('active');
}

/**
 * @param {HTMLElement} elem
 */
function removeActiveState(elem) {
  elem.classList.remove('active');
}

/**
 * @param {string} str
 * @returns {boolean}
 */
function endsWithOperand(str) {
  const lastChar = str.slice(-1);
  return [
    CHARACTERS.PLUS,
    CHARACTERS.MINUS,
    CHARACTERS.DIVIDE,
    CHARACTERS.MULTIPLY,
  ].includes(lastChar);
}

export class iOSCalculator extends HTMLElement {
  #currentExpression = '';

  #currentInput = '';

  // TODO: use these
  #suggestedInput = '';

  #lastOperand = '';

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
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(sheet.cloneNode(true));
    shadowRoot.appendChild(template.content.cloneNode(true));

    this.#calcSolution = shadowRoot.querySelector('.calc-solution');

    this.#resetButton = shadowRoot.getElementById('reset');
    this.#plusMinusButton = shadowRoot.getElementById('plus-minus');
    this.#percentageButton = shadowRoot.getElementById('percentage');

    this.#operandButtons = Array.from(
      shadowRoot.querySelectorAll('.calc-button-operand')
    );
    this.#digitButtons = Array.from(
      shadowRoot.querySelectorAll('.calc-button-digit')
    );

    this.#resetButton.addEventListener('click', this.#onResetClick.bind(this));
    this.#plusMinusButton.addEventListener(
      'click',
      this.#onPlusMinusClick.bind(this)
    );
    this.#percentageButton.addEventListener(
      'click',
      this.#onPercentageClick.bind(this)
    );
    this.#operandButtons.forEach(operandButton =>
      operandButton.addEventListener('click', event =>
        this.#onOperandClick(event, operandButton)
      )
    );
    this.#digitButtons.forEach(digitButton =>
      digitButton.addEventListener('click', event =>
        this.#onDigitClick(event, digitButton)
      )
    );
  }

  connectedCallback() {
    if (this.shadowRoot) {
      this.#displaySolution();
    }
  }

  /**
   * @param {PointerEvent} event
   */
  #onResetClick(event) {
    event.preventDefault();
    const textSpan = this.#resetButton.querySelector('span');

    if (textSpan.textContent === 'AC') {
      // AC
      this.#currentInput = '';
      this.#currentExpression = '';
      this.#operandButtons.forEach(removeActiveState);
    } else {
      // C
      this.#currentInput = '0';
      textSpan.textContent = 'AC';
    }

    this.#displaySolution();
  }

  /**
   * @param {PointerEvent} event
   */
  #onPlusMinusClick(event) {
    event.preventDefault();
    let number = '0';

    if (this.#currentInput.length > 0) {
      number = this.#currentInput;
    } else if (this.#currentExpression.length > 0) {
      number = this.#getCurrentSolution();
    }

    if (number.startsWith(CHARACTERS.NEGATIVE)) {
      this.#currentInput = number.slice(1);
    } else {
      this.#currentInput = CHARACTERS.NEGATIVE + number;
    }

    this.#displaySolution();
  }

  /**
   * @param {PointerEvent} event
   */
  #onPercentageClick(event) {
    event.preventDefault();
    let number = '0';

    if (this.#currentInput.length > 0) {
      number = this.#currentInput;
    } else if (this.#currentExpression.length > 0) {
      number = this.#getCurrentSolution();
    }

    let intermediateInput = number.replace(/,/g, '.');
    intermediateInput += '/100';
    this.#currentInput = String(evaluate(intermediateInput));
    this.#currentInput = this.#currentInput.replace('.', CHARACTERS.COMMA);
    this.#displaySolution();
  }

  /**
   * @param {PointerEvent} event
   * @param {HTMLElement} digitButton
   * @returns
   */
  #onDigitClick(event, digitButton) {
    event.preventDefault();
    const clickedDigit = digitButton.dataset.digit || '';

    if (
      clickedDigit === CHARACTERS.NEGATIVE &&
      this.#currentInput.includes(CHARACTERS.NEGATIVE)
    ) {
      // prevent clicking multiple times -> ,
      return;
    }

    if (!endsWithOperand(this.#currentExpression)) {
      // reset expression if user starts a new calculations
      // -> clicking a number with clicking an operand beforehand
      this.#currentExpression = '';
    }

    this.#resetButton.querySelector('span').textContent = 'C';

    if (this.#currentInput === '' && clickedDigit === CHARACTERS.COMMA) {
      this.#currentInput = `0${CHARACTERS.COMMA}`;
    } else if (
      this.#currentInput === '0' &&
      clickedDigit !== CHARACTERS.COMMA
    ) {
      this.#currentInput = clickedDigit;
    } else if (
      this.#currentInput === `${CHARACTERS.NEGATIVE}0` &&
      clickedDigit !== CHARACTERS.COMMA
    ) {
      this.#currentInput = CHARACTERS.NEGATIVE + clickedDigit;
    } else {
      this.#currentInput += clickedDigit;
    }

    this.#displaySolution();
  }

  /**
   * @param {PointerEvent} event
   * @param {HTMLElement} operandButton
   */
  #onOperandClick(event, operandButton) {
    event.preventDefault();
    this.#operandButtons.forEach(removeActiveState);

    const clickedOperand = operandButton.dataset.operand;

    if (this.#currentInput) {
      this.#currentExpression += this.#currentInput;
    }

    if (this.#currentExpression.length === 0) {
      // in case user starts his calculation directly with an operand
      this.#currentExpression = '0';
    }

    if (endsWithOperand(this.#currentExpression)) {
      // if the user clicks two operands in a row, remove the last one
      this.#currentExpression = this.#currentExpression.slice(0, -1);
    }

    if (clickedOperand !== CHARACTERS.EQUALS) {
      this.#currentExpression += clickedOperand;
      addActiveState(operandButton);
    } else {
      if (this.#currentExpression.endsWith(')')) {
        // clicking = multiple times in a row
        let latestOperandIndex = -1;
        for (
          let index = this.#currentExpression.length - 1;
          index > 0;
          index -= 1
        ) {
          if (endsWithOperand(this.#currentExpression[index])) {
            latestOperandIndex = index;
            break;
          }
        }

        if (latestOperandIndex !== -1) {
          this.#currentExpression += this.#currentExpression.slice(
            latestOperandIndex,
            -1
          );
        }
      }

      this.#currentExpression = `(${this.#currentExpression})`;
    }

    this.#currentInput = '';

    this.#displaySolution();
  }

  #getCurrentSolution() {
    let expressionToEvaluate = this.#currentExpression || '0';

    if (endsWithOperand(expressionToEvaluate)) {
      expressionToEvaluate = expressionToEvaluate.slice(0, -1);
    }

    expressionToEvaluate = expressionToEvaluate.replace(/,/g, '.');

    try {
      return evaluate(expressionToEvaluate).toString();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      return 'Error';
    }
  }

  #displaySolution() {
    let integerToDisplay;

    if (this.#currentInput.length > 0) {
      this.#operandButtons.forEach(removeActiveState);
      integerToDisplay = this.#currentInput;
    } else if (this.#currentExpression.length > 0) {
      const expressionToDisplay = this.#currentExpression || '0';

      if (!endsWithOperand(expressionToDisplay)) {
        this.#operandButtons.forEach(removeActiveState);
      }

      integerToDisplay = this.#getCurrentSolution();
    } else {
      integerToDisplay = '0';
    }

    integerToDisplay = integerToDisplay.replace('.', CHARACTERS.COMMA);

    this.#calcSolution.textContent = integerToDisplay;
  }
}

window.customElements.define('ios-calculator', iOSCalculator);
