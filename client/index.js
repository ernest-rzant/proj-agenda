/* eslint-disable no-console */

// Incorporando estilos
// a mi bundle
import './styles/style.css';
import './styles/mystyle.css';

console.log('🎁 Frond-End Working!!!');

// default parameters
const show = (m = '😝') => {
  console.log(m);
};
show();

// Promises
function resolveAfter2Seconds() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('funtion resolve');
    }, 10000);
  });
}

async function asyncCall() {
  console.log('Calling async funtion!!!');
  const result = await resolveAfter2Seconds();
  console.log(result); // Imprime "funtion resolve" en la consola
}

asyncCall();
