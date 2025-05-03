function toBinary(str) {
  return str.split('').map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join('');
}

function fromBinary(bin) {
  return bin.match(/.{8}/g).map(b => String.fromCharCode(parseInt(b, 2))).join('');
}

function hideMessage() {
  const message = document.getElementById('message').value;
  const coverText = document.getElementById('coverText').value;

  const binary = toBinary(message);
  let result = '';
  let j = 0;

  for (let i = 0; i < coverText.length; i++) {
    result += coverText[i];
    if (j < binary.length) {
      result += binary[j] === '1' ? '\u200B' : '\u200C'; // Zero-width space and non-joiner
      j++;
    }
  }

  document.getElementById('result').value = result;
}

function revealMessage() {
  const text = document.getElementById('result').value;
  const hiddenBits = [];

  for (let i = 1; i < text.length; i++) {
    const char = text[i];
    if (char === '\u200B') hiddenBits.push('1');
    else if (char === '\u200C') hiddenBits.push('0');
  }

  const message = fromBinary(hiddenBits.join(''));
  alert("Hidden Message: " + message);
}