class TestUtils {
  /**
   * Renders a given element with provided attributes
   * and returns a promise which resolves as soon as
   * rendered element becomes available.
   * @param {string} tag
   * @param {object} attributes
   * @returns {Promise<HTMLElement>}
   */
  static render(tag: string, attributes = {}): Promise<HTMLElement> {
    TestUtils._renderToDocument(tag, attributes);
    return TestUtils._waitForComponentToRender(tag);
  }

  /**
   * Replaces document's body with provided element
   * including given attributes.
   * @param {string} tag
   * @param {object} attributes
   */
  static _renderToDocument(tag: string, attributes: object) {
    const htmlAttributes = TestUtils._mapObjectToHTMLAttributes(attributes);
    document.body.innerHTML = `<${tag} ${htmlAttributes}></${tag}>`;
  }

  /**
   * Converts an object to HTML string representation of attributes.
   *
   * For example: `{ foo: "bar", baz: "foo" }`
   * becomes `foo="bar" baz="foo"`
   *
   * @param {object} attributes
   * @returns {string}
   */
  static _mapObjectToHTMLAttributes(attributes: object): string {
    return Object.entries(attributes).reduce((previous, current) => {
      return previous + ` ${current[0]}="${current[1]}"`;
    }, "");
  }

  /**
   * Returns a promise which resolves as soon as
   * requested element becomes available.
   * @param {string} tag
   * @returns {Promise<HTMLElement>}
   */
  static async _waitForComponentToRender(tag: string): Promise<HTMLElement> {
    return new Promise((resolve) => {
      function requestComponent() {
        const element: HTMLElement | null = document.querySelector(tag);
        if (element) {
          resolve(element);
        } else {
          window.requestAnimationFrame(requestComponent);
        }
      }
      requestComponent();
    });
  }
}

describe("iOS Calculator", () => {
  const scenarios = [
    {
      name: "Init with 0",
      solution: "0",
    },
    {
      name: "Basic addition",
      steps: "2+2=",
      solution: "4",
    },
    {
      name: "Basic subtraction",
      steps: "4-2=",
      solution: "2",
    },
    {
      name: "Basic division",
      steps: "500/20=",
      solution: "25",
    },
    {
      name: "Basic multiplication",
      steps: "50*12=",
      solution: "600",
    },
    {
      name: "Order of operations",
      steps: "60-30/3*5+7=",
      solution: "17",
    },
    {
      name: "Show pressed input",
      steps: "465",
      solution: "465",
    },
    {
      name: "Show pressed comma input",
      steps: "465,452",
      solution: "465,452",
    },
    {
      name: "Start input with comma",
      steps: ",452",
      solution: "0,452",
    },
    {
      name: "Start with operand",
      steps: "+452",
      solution: "452",
    },
    {
      name: "Calc with intermediate solution",
      steps: "1+2=*3=",
      solution: "9",
    },
    {
      name: "Multiple Equals",
      steps: "1+2+3=====",
      solution: "18",
    },
    {
      name: "Start new input after pressing equal",
      steps: "1+2+3=====4",
      solution: "4",
    },
    {
      name: "Start new calculation after pressing equal",
      steps: "1+2+3=====4+3=",
      solution: "7",
    },
    {
      name: "Input multiple 0",
      steps: "0000000",
      solution: "0",
    },
    {
      name: "Input multiple 0 after negative",
      steps: "±0000000",
      solution: "-0",
    },
    {
      name: "Plus-Minus input",
      steps: "4±",
      solution: "-4",
    },
    {
      name: "Plus-Minus input multiple times",
      steps: "4±±±±",
      solution: "4",
    },
    {
      name: "Plus-Minus without input",
      steps: "±",
      solution: "-0",
    },
    {
      name: "Plus-Minus intermediate solution", // TODO:
      steps: "±",
      solution: "-0",
    },
    {
      name: "Percentage input",
      steps: "400%",
      solution: "4",
    },
    {
      name: "Percentage negative input",
      steps: "4±%",
      solution: "-0,04",
    },
    {
      name: "Percentage input multiple times",
      steps: "2597045%%%%",
      solution: "0,02597045",
    },
    {
      name: "Percentage without input",
      steps: "%",
      solution: "0",
    },
  ];

  const stepToSelector = (step: string): string => {
    switch (step) {
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
      case ",":
        return `[data-digit="${step}"]`;
      case "+":
      case "-":
      case "*":
      case "/":
      case "=":
        return `[data-operand="${step}"]`;
      case "C":
      case "AC":
        return `#reset`;
      case "±":
        return `#plus-minus`;
      case "%":
        return `#percentage`;
      default:
        return `#${step}`;
    }
  };

  const testScenario = async (
    steps: string = "",
    expectedSolution: string = "0"
  ) => {
    const { shadowRoot } = await TestUtils.render("ios-calculator");
    if (!shadowRoot) {
      fail("Shadow Root not found");
      return;
    }

    for (const step of steps) {
      const targetSelector = stepToSelector(step);
      const targetButton: HTMLElement | null =
        shadowRoot.querySelector(targetSelector);

      if (!targetButton) {
        fail(`Button with query ${step} not found.`);
        continue;
      }

      targetButton.click();
    }

    const solution = shadowRoot.querySelector(".calc-solution");
    if (solution) {
      expect(solution.textContent).toBe(expectedSolution);
    } else {
      fail("Solution html element not found");
    }
  };

  scenarios.forEach((scenario, index) => {
    it(scenario.name || "scenario " + index, () => {
      testScenario(scenario.steps, scenario.solution);
    });
  });
});
