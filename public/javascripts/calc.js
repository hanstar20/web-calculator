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
  let formulaArr = [];

  formulaBox.addEventListener('input', (e) => {
    // 필요 변수 선언
    const cursorPos = formulaBox.selectionStart;
    let inputString = '';
    const frontString = formulaBox.value.slice(0, cursorPos - 1);
    const backString = formulaBox.value.slice(cursorPos, formulaBox.value.length);

    // console.log('frontString', frontString);
    // console.log('backString', backString);
    // console.log('inputString', inputString);
    // console.log('cursorPos', cursorPos);

    // 3가지 input을 생각하며 진행, 일반 입력값, 백스페이스, delete
    switch (e.inputType) {
      case 'insertText':
        // 입력이 들어올 때 inputString 찾기
        inputString = formulaBox.value[cursorPos - 1];

        // 입력 받는 값이 입력 가능 값이 아니라면 막기
        if (!inputPossible.includes(inputString)) {
          formulaBox.value = formulaBox.value.slice(0, -1);
          break;
          // 입력값이 스페이스도 막기
        } else if (inputString.match(pattern)) {
          formulaBox.value = formulaBox.value.slice(0, -1);
          break;
        }

        // 함수인지 아닌지 체크하는 케이스
        // 영문 대문자 일때만 functionCheck 넣어서 유지, 함수일 때 자동완성 만들기
        if (uppperAlphabet.includes(inputString)) {
          functionCheck += inputString;
          // 그외의 숫자나
        } else {
          functionCheck = '';
        }
        console.log('체크하는 것', functionCheck);
    }
  });

  //   if (e.inputType == 'deleteContentBackward') {
  //     functionCheck = functionCheck.slice(0, -1);
  //     functionPosRenew(funcArr, cursorPos, 'backspace');
  //     console.log('funcArr', funcArr);
  //     // delete가 들어왔을 떄
  //   } else if (e.inputType == 'deleteContentForward') {
  //   }
  //   // 그 외의 insertInput이 들어올 때 작동하는 것
  //   else {
  //     // 입력이 들어올 때 inputString 찾기
  //     inputString = formulaBox.value[cursorPos - 1];
  //
  //     if (!inputPossible.includes(inputString)) {
  //       formulaBox.value = formulaBox.value.slice(0, -1);
  //     }
  //
  //     // 영문 대문자 일때만 functionCheck 넣어서 유지, 함수일 때 자동완성 만들기
  //     if (uppperAlphabet.includes(inputString)) {
  //       functionCheck += inputString;
  //     } else if (inputString.match(pattern)) {
  //       functionCheck = '';
  //     } else {
  //       functionCheck = '';
  //     }
  //
  //     // functionCheck가 함수일 때 자동완성 만들기
  //     switch (functionCheck) {
  //       case 'ABS':
  //       case 'SIN':
  //       case 'COS':
  //       case 'TAN':
  //         formulaBox.value = frontString + inputString + '[]' + backString;
  //         formulaBox.setSelectionRange(cursorPos + 1, cursorPos + 1);
  //         functionCheck = '';
  //         funcArr.push([cursorPos - 3, cursorPos, cursorPos + 1]);
  //         break;
  //       case 'ROOT':
  //       case 'ASIN':
  //       case 'ACOS':
  //       case 'ATAN':
  //         formulaBox.value = frontString + inputString + '[]' + backString;
  //         formulaBox.setSelectionRange(cursorPos + 1, cursorPos + 1);
  //         functionCheck = '';
  //         funcArr.push([cursorPos - 4, cursorPos, cursorPos + 1]);
  //         break;
  //       case 'ROUND':
  //         formulaBox.value = frontString + inputString + '[,]' + backString;
  //         formulaBox.setSelectionRange(cursorPos + 1, cursorPos + 1);
  //         functionCheck = '';
  //         funcArr.push([cursorPos - 5, cursorPos, cursorPos + 1, cursorPos + 2]);
  //         break;
  //       case 'IF':
  //         formulaBox.value = frontString + inputString + '[,,]' + backString;
  //         formulaBox.setSelectionRange(cursorPos + 1, cursorPos + 1);
  //         functionCheck = '';
  //         funcArr.push([cursorPos - 2, cursorPos, cursorPos + 1, cursorPos + 2, cursorPos + 3]);
  //         break;
  //     }
  //
  //     functionPosRenew(funcArr, cursorPos, 'insert');
  //     // console.log('체크하는 것', functionCheck);
  //     console.log('funcArr', funcArr);
  //   }
  // });
  //
  // // 버튼 클릭시 Front 동작 설정
  // buttons.forEach((button) => {
  //   button.addEventListener('click', () => {
  //     // 함수 버튼들은 그에 맞게 [] 또는 [,] 등이 붙고 나머지는 한 글자씩 생성 되도록 세팅
  //     if (button.className.includes('func1')) {
  //       formulaBox.value = formulaBox.value + button.value + '[]';
  //     } else if (button.className.includes('func2')) {
  //       formulaBox.value = formulaBox.value + button.value + '[,]';
  //     } else if (button.className.includes('func3')) {
  //       formulaBox.value = formulaBox.value + button.value + '[,,]';
  //     } else if (button.className.includes('func4')) {
  //       // pass
  //     } else if (button.className.includes('clear')) {
  //       formulaBox.value = null;
  //     } else if (button.className.includes('back')) {
  //       formulaBox.value = formulaBox.value.slice(0, -1);
  //     } else if (button.className.includes('result')) {
  //       calcFormula(formulaBox.value);
  //     } else {
  //       formulaBox.value += button.value;
  //     }
  //   });
  // });
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

function formulaStrToArr(str) {
  return;
}
