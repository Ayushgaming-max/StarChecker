function luhnCheck(number) {
  let arr = (number + '').split('').reverse().map(x => parseInt(x));
  let sum = arr.map((val, i) =>
    i % 2 ? (val *= 2) > 9 ? val - 9 : val : val
  ).reduce((acc, val) => acc + val, 0);
  return sum % 10 === 0;
}

function checkCard() {
  const input = document.getElementById('cc-input').value;
  const result = document.getElementById('check-result');
  if (!input.match(/^\d{13,19}$/)) {
    result.textContent = 'Please enter a valid card number (13-19 digits).';
    result.style.color = 'orange';
    return;
  }
  if (luhnCheck(input)) {
    result.textContent = '✓ Valid card number (Luhn check passed).';
    result.style.color = 'lightgreen';
  } else {
    result.textContent = '✗ Invalid card number (Luhn check failed).';
    result.style.color = 'red';
  }
}

function generateCard() {
  const prefix = '4' + Math.floor(100000000000 + Math.random() * 900000000000);
  let base = prefix.slice(0, 15);
  let sum = 0;
  for (let i = 0; i < 15; i++) {
    let digit = parseInt(base[14 - i]);
    if (i % 2 === 0) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
  }
  const checkDigit = (10 - (sum % 10)) % 10;
  const fullCard = base + checkDigit;
  document.getElementById('generated-card').textContent = "Generated Card: " + fullCard;
}
