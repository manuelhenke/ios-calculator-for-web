/*jshint esversion: 6 */

$(document).ready(function ($) {
    $('.ios-calculator').each(function (index, element) {
        $(element).html(calculatorHtml);
        let currentSolution = null;
        let currentDigits = 0;
        let currentFloatingPosition = 0;
        let currentOperand = null;

        updateSolution();

        $(element).find('.calc-button-func').click(function (e) {
            e.preventDefault();
            const func = $(this).data('func');

            switch (func) {
                case 'reset':
                    currentSolution = 0;
                    currentDigits = null;
                    currentFloatingPosition = 0;
                    currentOperator = null;
                    break;
                case 'plus-minus':
                    currentDigits = -currentDigits;
                    break;
                case 'percentage':
                    currentDigits /= 100;
                    break;
                default:
                    console.warn('Invalid button functionality: ' + func);
                    break;
            }

            updateSolution();
        });

        $(element).find('.calc-button-operand').click(function (e) {
            e.preventDefault();

            switch (currentOperand) {
                case 'multiply':
                    currentSolution = currentSolution * currentDigits;
                    break;
                case 'divide':
                    currentSolution = currentSolution / currentDigits;
                    break;
                case 'plus':
                    currentSolution = currentSolution + currentDigits;
                    break;
                case 'minus':
                    currentSolution = currentSolution - currentDigits;
                    break;
                default:
                    // First operand clicked
                    currentSolution = currentDigits;
                    break;
            }
            
            currentDigits = null;
            currentFloatingPosition = 0;


            const clickedOperand = $(this).data('operand');
            console.log(clickedOperand);

            currentOperand = clickedOperand === 'solution' ? null : clickedOperand;

            updateSolution();

            if (clickedOperand !== 'solution') {
                $(this).addClass('active');
            }
        });

        $(element).find('.calc-button-digit').click(function (e) {
            e.preventDefault();
            const digit = $(this).data('digit');
            console.log(digit);

            if (digit === ',') {
                currentFloatingPosition++;
            } else {
                if (currentFloatingPosition) {
                    currentDigits = currentDigits + parseInt(digit) * Math.pow(0.1, currentFloatingPosition);
                    currentFloatingPosition++;
                } else {
                    currentDigits = currentDigits * 10 + parseInt(digit);
                }
            }

            updateSolution();
        });

        function updateSolution() {
            $(element).find('.calc-button').removeClass('active');

            let currentInteger;

            if (currentDigits !== null) {
                currentInteger = currentDigits;
            } else {
                currentInteger = currentSolution;
            }


            if (currentFloatingPosition === 1 && currentDigits) {
                currentInteger = currentInteger + ",";
            }

            currentInteger = currentInteger.toString().replace(".", ",");

            $(element).find('.calc-solution').text(currentInteger);
        }

    });
});

const calculatorHtml = `
<div class="calc">
    <div class="calc-solution"></div>
    <div class="calc-buttons-container">
        <div class="calc-buttons-row">
            <div data-func="reset" class="calc-button calc-button-func">AC</div>
            <div data-func="plus-minus" class="calc-button calc-button-func">+/-</div>
            <div data-func="percentage" class="calc-button calc-button-func">%</div>
            <div data-operand="divide" class="calc-button calc-button-operand">÷</div>
        </div>
        <div class="calc-buttons-row">
            <div data-digit="7" class="calc-button calc-button-digit">7</div>
            <div data-digit="8" class="calc-button calc-button-digit">8</div>
            <div data-digit="9" class="calc-button calc-button-digit">9</div>
            <div data-operand="multiply" class="calc-button calc-button-operand">x</div>
        </div>
        <div class="calc-buttons-row">
            <div data-digit="4" class="calc-button calc-button-digit">4</div>
            <div data-digit="5" class="calc-button calc-button-digit">5</div>
            <div data-digit="6" class="calc-button calc-button-digit">6</div>
            <div data-operand="minus" class="calc-button calc-button-operand">-</div>
        </div>
        <div class="calc-buttons-row">
            <div data-digit="1" class="calc-button calc-button-digit">1</div>
            <div data-digit="2" class="calc-button calc-button-digit">2</div>
            <div data-digit="3" class="calc-button calc-button-digit">3</div>
            <div data-operand="plus" class="calc-button calc-button-operand">+</div>
        </div>
        <div class="calc-buttons-row">
            <div data-digit="0" class="calc-button calc-button-double calc-button-digit">0</div>
            <div data-digit="," class="calc-button calc-button-digit">,</div>
            <div data-operand="solution" class="calc-button calc-button-operand">=</div>
        </div>
    </div>
</div>`;