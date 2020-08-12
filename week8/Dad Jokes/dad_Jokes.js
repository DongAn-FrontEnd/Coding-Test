
const jokeEl = document.getElementById('joke');
const get_joke = document.getElementById('get_joke');

get_joke.addEventListener('click',generateJoke);

generateJoke();

// async function generateJoke(){
//     const jokeRes = await axios.get("https://icanhazdadjoke.com/",{
//         headers : {
//             Accept : "application/json",
//         },
//     });
//     const joke = await jokeRes.data;
//     jokeEl.innerHTML = joke.joke;
//     console.log(joke.joke);
// }

/*
    json파일만 받는다고 지정을 안하니까 html파일이 통째로 넘어와서 적용이 안됐었음.
    axios로 받아올 경우 json() 함수는 사용하지X json의 data만 지정해서. 
*/

async function generateJoke() {
  const jokeRes = await fetch("https://icanhazdadjoke.com/", {
    headers: {
      Accept: "application/json",
    },
  });
  const joke = await jokeRes.json();
  jokeEl.innerHTML = joke.joke;
}
