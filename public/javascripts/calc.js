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
  const inputPossible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789+-*/()';
  // 스페이스를 인식하기 위한 정규표현식
  const pattern = /\s/g;
  let funcArr = [];
  let functionCheck = '';

  formulaBox.addEventListener('input', (e) => {
    // 필요 변수 선언
    const cursorPos = formulaBox.selectionStart;
    let inputString = '';
    const frontString = formulaBox.value.slice(0, cursorPos - 1);
    const backString = formulaBox.value.slice(cursorPos, formulaBox.value.length);

    // console.log('frontString', frontString);
    // console.log('backString', backString);
    // console.log('inputString', inputString);
    console.log('cursorPos', cursorPos);

    // backspace가 들어 왔을 때는 따로 동작 X
    if (e.inputType == 'deleteContentBackward') {
      functionCheck = functionCheck.slice(0, -1);
      functionPosRenew(funcArr, cursorPos, 'backspace');
      console.log('funcArr', funcArr);
      // delete가 들어왔을 떄
    } else if (e.inputType == 'deleteContentForward') {
    }
    // 그 외의 insertInput이 들어올 때 작동하는 것
    else {
      // 입력이 들어올 때 inputString 찾기
      inputString = formulaBox.value[cursorPos - 1];

      if (!inputPossible.includes(inputString)) {
        formulaBox.value = formulaBox.value.slice(0, -1);
      }

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
        case 'SIN':
        case 'COS':
        case 'TAN':
          formulaBox.value = frontString + inputString + '[]' + backString;
          formulaBox.setSelectionRange(cursorPos + 1, cursorPos + 1);
          functionCheck = '';
          funcArr.push([cursorPos - 3, cursorPos, cursorPos + 1]);
          break;
        case 'ROOT':
        case 'ASIN':
        case 'ACOS':
        case 'ATAN':
          formulaBox.value = frontString + inputString + '[]' + backString;
          formulaBox.setSelectionRange(cursorPos + 1, cursorPos + 1);
          functionCheck = '';
          funcArr.push([cursorPos - 4, cursorPos, cursorPos + 1]);
          break;
        case 'ROUND':
          formulaBox.value = frontString + inputString + '[,]' + backString;
          formulaBox.setSelectionRange(cursorPos + 1, cursorPos + 1);
          functionCheck = '';
          funcArr.push([cursorPos - 5, cursorPos, cursorPos + 1, cursorPos + 2]);
          break;
        case 'IF':
          formulaBox.value = frontString + inputString + '[,,]' + backString;
          formulaBox.setSelectionRange(cursorPos + 1, cursorPos + 1);
          functionCheck = '';
          funcArr.push([cursorPos - 2, cursorPos, cursorPos + 1, cursorPos + 2, cursorPos + 3]);
          break;
      }

      functionPosRenew(funcArr, cursorPos, 'insert');
      // console.log('체크하는 것', functionCheck);
      console.log('funcArr', funcArr);
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

function functionPosRenew(funcArr, CursorPos, method) {
  if (funcArr.length == 0) {
    return;
  }
  switch (method) {
    case 'insert':
      for (let i = 0; i < funcArr.length; i++) {
        for (let j = 0; j < funcArr[i].length; j++) {
          if (funcArr[i][j] >= CursorPos - 1) {
            funcArr[i][j] += 1;
          }
        }
      }
      break;
    case 'backspace':
      for (let i = 0; i < funcArr.length; i++) {
        for (let j = 0; j < funcArr[i].length; j++) {
          if (funcArr[i][j] >= CursorPos) {
            funcArr[i][j] -= 1;
          }
        }
      }
      break;
  }
}

function funcCheck(inputString) {
  const regExp = [
    [/\bABS(?!\[)\b/, 'ABS[]'],
    [/\bROOT(?!\[)\b/, 'ROOT[]'],
    [/\bSIN(?!\[)\b/, 'SIN[]'],
  ];

  let cursorPos = -1;
  let changeString = inputString;

  regExp.forEach(function (item, index, array) {
    console.log('item', item);
    console.log('inputString.search(item)');
    if (inputString.search(item[0]) != -1) {
      cursorPos = inputString.search(item[0]);
      changeString = inputString.replace(item[0], item[1]);
    }
  });

  console.log('changeString', changeString);
  return [changeString, cursorPos];
}
