
// const achaPar = (arr) => {
//   const _return = arr.filter((acc)=> !(acc % 2))
// }

const returnPar = (text) => {
  const _arr = text.split('par ')[1]
  const arr = JSON.parse(_arr);
  return arr.filter((acc)=> !(acc % 2));
}

const comando = "par [1,2,3]";
console.log(returnPar(comando));