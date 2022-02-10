window.onload = function () {
  setCalcView();
  setViewChange();
};

function setViewChange() {
  const referenceBtn = document.getElementById('referenceBtn');

  referenceBtn.addEventListener('click', () => {
    window.location.href = '/reference';
  });
}

function setCalcView() {
  const buttons = document.querySelectorAll('button');
  const formulaBox = document.getElementById('formulaBox');

  const uppperAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  // 스페이스를 인식하기 위한 정규표현식
  const pattern = /\s/g;
  let formula = [];
  let functionCheck = '';

  formulaBox.addEventListener('input', (e) => {
    // 필요 변수 선언
    const cursorPos = formulaBox.selectionStart;
    const inputString = formulaBox.value[cursorPos - 1];
    const frontString = formulaBox.value.slice(0, cursorPos - 1);
    const backString = formulaBox.value.slice(cursorPos, formulaBox.value.length);

    // console.log('frontString', frontString);
    // console.log('backString', backString);
    console.log('inputString', inputString);

    // backspace, delete가 들어 왔을 때는 따로 동작 X
    if ((e.inputType == 'deleteContentBackward') | (e.inputType == 'deleteContentForward')) {
      return;
    }
    // 그 외의 insertInput이 들어올 때 작동하는 것
    else {
      // 영문 대문자 일때만 functionCheck 넣어서 유지, 함수일 때 자동완성 만들기
      if (uppperAlphabet.includes(inputString)) {
        functionCheck += inputString;
      } else if (inputString.match(pattern)) {
        functionCheck = '';
      } else {
        functionCheck = '';
      }

      // functionCheck가 함수일 때 자동완성 만들기
      switch (functionCheck) {
        case 'ABS':
        case 'ROOT':
        case 'SIN':
        case 'COS':
        case 'TAN':
        case 'ASIN':
        case 'ACOS':
        case 'ATAN':
          formulaBox.value = frontString + inputString + '[]' + backString;
          formulaBox.setSelectionRange(cursorPos + 1, cursorPos + 1);
          functionCheck = '';
          break;
        case 'ROUND':
          formulaBox.value = frontString + inputString + '[,]' + backString;
          formulaBox.setSelectionRange(cursorPos + 1, cursorPos + 1);
          functionCheck = '';
          break;
        case 'IF':
          formulaBox.value = frontString + inputString + '[,,]' + backString;
          formulaBox.setSelectionRange(cursorPos + 1, cursorPos + 1);
          functionCheck = '';
          break;
      }

      console.log('체크하는 것', functionCheck);
    }
  });

  // 버튼 클릭시 Front 동작 설정
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      // 함수 버튼들은 그에 맞게 [] 또는 [,] 등이 붙고 나머지는 한 글자씩 생성 되도록 세팅
      if (button.className.includes('func1')) {
        formulaBox.value = formulaBox.value + button.value + '[]';
      } else if (button.className.includes('func2')) {
        formulaBox.value = formulaBox.value + button.value + '[,]';
      } else if (button.className.includes('func3')) {
        formulaBox.value = formulaBox.value + button.value + '[,,]';
      } else if (button.className.includes('func4')) {
        // pass
      } else if (button.className.includes('clear')) {
        formulaBox.value = null;
      } else if (button.className.includes('back')) {
        formulaBox.value = formulaBox.value.slice(0, -1);
      } else if (button.className.includes('result')) {
        calcFormula(formulaBox.value);
      } else {
        formulaBox.value += button.value;
      }
    });
  });
}

// 계산식을 백엔드로 보내고 계산 결과를 받는 함수
function calcFormula(formula) {
  $.ajax(
    {
      url: '/api/calc',
      type: 'post',
      async: false,
      data: { formula: formula },

      success: function (result) {
        document.getElementById('resultBox').value = result['result'];
      },
    },
    'json',
  );
}
