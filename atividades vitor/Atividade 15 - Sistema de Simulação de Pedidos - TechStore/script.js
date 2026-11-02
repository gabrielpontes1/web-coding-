function simular() {
    const produtos = {
        101: { nome: "teclado mecanico", valor: 180 },
        102: { nome: "mouse gamer", valor: 120 },
        103: { nome: "monitor 24", valor: 850 },
        104: { nome: "headset", valor: 250 },
        105: { nome: "webcam Full HD", valor: 320 },
    };
    const frete = [
        {local:"recife",valor:15},
        {local: "Olinda", valor: 20 },
        {local: "Jaboatão dos Guararapes", valor: 25 },
        {local: "Demais localidades", valor: 40 }
    ];

    let nome;
    let idade;
    let local;
    while (!nome || nome.trim() === ""){
        nome=String(prompt("digite seu nome"))
    }

    while (!idade || !Number.isInteger(idade)){
        idade=Number(prompt("digite sua idade"))
    }

    if (idade<18){
        console.log("Clientes menores de 18 anos não podem concluir a  compra.")
        return;
    } 

    let cidade=Number(prompt("para o calculo do frete digite o numero de sua cidade  0 recife ,1 olinda,2 Jaboatão dos Guararapes,3 Demais localidades "))


    for(let tentativas=0;tentativas <3;tentativas++){
        if(!Number.isInteger(cidade) || cidade > 3 || cidade <0){
        cidade =Number(prompt("digite um dos numeros anteriores dos fretes"))
        }
        else{
            break
        }
    }

    if(cidade===3){local = prompt("digite sua cidade")}


    let item = prompt("digite o codigo do item que deseja e a quantidade(separado virgulas)");
    let [codigo, quantidade] =item.split(",")

    quantidade =Number(quantidade)

    for(let tentativas=0;tentativas <3;tentativas++){
        if(!Number.isInteger(quantidade) || quantidade <= 0){
        quantidade =Number(prompt("digite uma quantidade maior que 0"))
        }
        else{
            break
        }
    }


    while (!produtos[codigo]) {
        codigo = (prompt("codigo invalido, digite um valor valido:"));
    }

    let valor_cliente= produtos[codigo].valor * quantidade
    let desconto=0

    if(valor_cliente >= 300 && valor_cliente < 700) {
        desconto=5
    }

    else if(valor_cliente >=700 && valor_cliente < 1500){
        desconto=10
    }

    else if(valor_cliente >=1500){
        desconto=15
    }

    let valor_do_desconto=valor_cliente *desconto/100
    let valor_com_desconto=valor_cliente - valor_do_desconto
    

    let valor_final=valor_com_desconto+frete[cidade].valor
    if (valor_com_desconto>=1000){
        console.log("valores acima de 1000 tem frete gratis")
        valor_final=valor_com_desconto
        frete[cidade].valor=0
    }
    let resumo=` 
        nome:${nome} cidade: ${local}
        produto: ${produtos[codigo].nome}
        quantidade: ${quantidade}
        subtotal ${valor_cliente}
        desconto ${valor_do_desconto}
        frete: ${frete[cidade].valor}
        valor final: ${valor_final}
        Simulação concluída com sucesso:
    `
    return(resumo)
}

console.log(simular());
