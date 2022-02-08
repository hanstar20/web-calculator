// const buttons = document.querySelectorAll('button');
// const formulaBox = document.getElementById('formulaBox');
// const formulaBox = document.querySelector('input');
// const formulaBox2 = document.getElementsByTagName('button');

// buttons.forEach(button => {
//   button.addEventListener('click', () => {
//     formulaBox.value = button.value
//   })});

// formulaBox.addEventListener('change', () => {
//   console.log(formulaBox)
// });


window.onload = function(){
  const buttons = document.querySelectorAll('button');
  const formulaBox = document.getElementById('formulaBox');

  formulaBox.addEventListener('input', () => {
    console.log(formulaBox.value)
  });

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      if(button.className.includes('func1')){
        formulaBox.value = formulaBox.value + button.value + '[]'
      }
      else if (button.className.includes('func2')) {
        formulaBox.value = formulaBox.value + button.value + '[,]'
      }
      else if (button.className.includes('func3')) {
        formulaBox.value = formulaBox.value + button.value + '[,,]'
      }
      // switch(button.value){
      //   case 'ABS':
      //     formulaBox.value += button.value
      //     break
      //
      // }

      console.log(button.className)
    })
    }
  )
}