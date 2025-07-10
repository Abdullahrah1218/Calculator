document.addEventListener('DOMContentLoaded', () => {
  const display = document.getElementById('display');
  let currentInput = '';
  let lastResult = null;

  function updateDisplay(value) {
    display.textContent = value;
  }

  function calculate(expression) {
    try {
      // Replace multiplication and division symbols with JS operators
      const sanitized = expression.replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-');
      // Evaluate expression safely
      // eslint-disable-next-line no-eval
      const result = eval(sanitized);
      return result;
    } catch {
      return 'Error';
    }
  }

  function appendInput(value) {
    if (value === '.' && currentInput.includes('.')) return;
    currentInput += value;
    updateDisplay(currentInput);
  }

  function clearInput() {
    currentInput = '';
    updateDisplay('0');
  }

  function backspace() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay(currentInput || '0');
  }

  function handleOperator(operator) {
    if (currentInput === '') return;
    const lastChar = currentInput.slice(-1);
    if (['+', '−', '×', '÷'].includes(lastChar)) {
      currentInput = currentInput.slice(0, -1) + operator;
    } else {
      currentInput += operator;
    }
    updateDisplay(currentInput);
  }

  function handleEquals() {
    if (currentInput === '') return;
    const result = calculate(currentInput);
    updateDisplay(result);
    currentInput = result.toString();
  }

  document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
      const number = button.getAttribute('data-number');
      const action = button.getAttribute('data-action');

      if (number !== null) {
        appendInput(number);
      } else if (action) {
        switch (action) {
          case 'clear':
            clearInput();
            break;
          case 'backspace':
            backspace();
            break;
          case 'add':
            handleOperator('+');
            break;
          case 'subtract':
            handleOperator('−');
            break;
          case 'multiply':
            handleOperator('×');
            break;
          case 'divide':
            handleOperator('÷');
            break;
          case 'equals':
            handleEquals();
            break;
        }
      }
    });
  });

  // Keyboard support
  document.addEventListener('keydown', (e) => {
    if ((e.key >= '0' && e.key <= '9') || e.key === '.') {
      appendInput(e.key);
    } else if (e.key === 'Backspace') {
      backspace();
    } else if (e.key === 'Escape') {
      clearInput();
    } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
      let op = e.key;
      if (op === '*') op = '×';
      if (op === '/') op = '÷';
      if (op === '-') op = '−';
      handleOperator(op);
    } else if (e.key === 'Enter' || e.key === '=') {
      e.preventDefault();
      handleEquals();
    }
  });
});
