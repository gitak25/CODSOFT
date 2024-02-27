let string = "";
let buttons = document.querySelectorAll('.button');
let inputField = document.querySelector('input');

Array.from(buttons).forEach((button) => {
  button.addEventListener('click', (e) => {
    handleButtonClick(e.target.innerHTML);
  });
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault(); 
    evaluateInput();
  } else if (e.key === 'Backspace') {
    e.preventDefault();
    string = string.slice(0, -1); 
    inputField.value = string;
  } else if (!isNaN(Number(e.key)) || ['+', '-', '*', '/', '.'].includes(e.key)) {
    e.preventDefault(); 
    string += e.key; 
    inputField.value = string;
  }
});

function handleButtonClick(value) {
  if (value === '=') {
    evaluateInput();
  } else if (value === 'C') {
    string = "";
    inputField.value = string;
  } else if (value === '+/-') {
    string = -1 * Number(string);
    inputField.value = string;
  } else {
    string += value;
    inputField.value = string;
  }
}

function evaluateInput() {
  try {
    let result = eval(string);
    if (isNaN(result) || !isFinite(result)) {
      throw new Error('Invalid input');
    }
    string = result.toString();
    inputField.value = string;
  } 
  catch (error) {
    console.error(error.message);
    inputField.value = 'Error';   
  }
}
