const formulario=document.getElementById("formulairo");
document.getElementById("formulario").reset();
//nao recarrega apos o submit do butao
formulario.addEventListener("submit", function(event) {
    event.preventDefault();
})