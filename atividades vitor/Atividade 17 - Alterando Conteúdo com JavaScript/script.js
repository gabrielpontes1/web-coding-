function alterar_imagem(acao){
  if (acao==="alterar"){
  let mensagem_nova=document.getElementById("mensagem").textContent='O JavaScript alterou o conteúdo da página!';
  }
  if(acao==="voltar"){
    let mensagem_antiga=document.getElementById("mensagem").textContent='Bem-vindo à aula de Desenvolvimento Front-End!';
  }
}
