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

  formulaBox.addEventListener('input', () => {
    console.log(formulaBox.value);
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
