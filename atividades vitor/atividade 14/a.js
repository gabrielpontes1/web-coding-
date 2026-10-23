let nome;
let idade;
let curso;
let nota1;
let nota2;


nome = prompt("digite seu nome ")
console.log(nome)

idade = prompt("digite sua idade")
console.log(idade)

curso = prompt("digite seu curso")
console.log(curso)

nota1 = parseInt (prompt("digite sua primeira nota"))
console.log(nota1)

nota2 = parseInt (prompt("digite sua segunda nota"))
console.log(nota2)

let resultado = (nota1+nota2) /2;
console.log(resultado)

if (resultado<=7) {
    console.log("reprovado")
}
else {
    console.log("aprovado")
}