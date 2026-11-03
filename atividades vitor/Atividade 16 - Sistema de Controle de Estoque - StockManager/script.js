function cadastro(stock){
    while (true){
    
    let Cadastro_de_produtos=prompt("digite  as seguintes informaçoes código, nome, valor unitário, quantidade disponível e estoque mínimo separado por virgulas");
    let [codigo,nome,valor,quantidade,stock_minimo]=Cadastro_de_produtos.split(",");

    while (!nome){nome=String(prompt("digite um nome"));}
    while (valor<0 || !Number.isInteger(valor)){valor=Number(prompt("digite um valor valido"));}
    while (quantidade<0 || !Number.isInteger(quantidade)){quantidade=Number(prompt("digite uma quantidade valida"));}
    while (stock_minimo<0 || !Number.isInteger(stock_minimo)){stock_minimo=Number(prompt("digite um valor valido"))}
    while(produtos[codigo] || codigo.trim()){codigo=prompt("digite um codigo nao existente");}
    
    stock[codigo]={"nome":nome,"valor":Number(valor),"stock":Number(quantidade),"stockminimo":Number(stock_minimo)};
    

    let repetir_cadastro=prompt("deseja cadastra outro item digite S|N");
    repetir_cadastro=repetir_cadastro.toLowerCase();

    if(repetir_cadastro==="n"){break;}

    }
}
function abaixo_stock(item){
    if(produtos[item].stock <= produtos[item].stockminimo){
        
        console.log(`${produtos[item].nome} precisa de mais stock esta ${produtos[item].stockminimo - produtos[item].stock} abaixo do minimo`)
}

}
let produtos ={
    101:{"nome":"teclado mecanico","valor":180,"stock":15,"stockminimo":5},
    102:{"nome":"mouse gamer","valor":13,"stock":8,"stockminimo":4},
    103:{"nome":"monitor 24","valor":13,"stock":3,"stockminimo":5},
    104:{"nome":"headset usb","valor":13,"stock":12,"stockminimo":6},
    105:{"nome":"webcam full HD","valor":13,"stock":2,"stockminimo":3},
    };
let cotinuar=true
let item;
while (cotinuar){
    let menu=Number(prompt("digite um dos seguintes numeros para acessar as funcoes (1 cadastra itens) (2 verificar stock) (3 visualizar determinado item no stock) (4 modificar stock)"));
    
    switch(menu){
        case 1 :
            cadastro(produtos);
            console.table({ ...produtos });
            break;

        case 2:
            console.table(produtos);
            for(item in produtos){
                console.table(produtos[item])
                abaixo_stock(item)
            }
            break;

        case 3:
            item=prompt("digite o codigo do item");

            while (!produtos[item]){
                console.log(produtos);
                item=prompt("digite um codigo valido");

            }
            console.log(produtos[item]);
            break;
        case 4:
            item=prompt("digite o codigo do item");

            while (!produtos[item]){
                console.log(produtos);
                item=prompt("digite um codigo valido");
            }

            let modificacao=prompt("valor da modificação,deseja adicionar ou retirar do stock(separado por virgulas)");
            let [valor_modificacao,somar_ou_subtrair]=modificacao.split(",");
            valor_modificacao = Number(prompt(valor_modificacao));
            somar_ou_subtrair=somar_ou_subtrair.toLowerCase();
            
            while (valor_modificacao<0 || !Number.isInteger(valor_modificacao)){
                valor_modificacao=Number(prompt("digite um valor maior ou igual zero"));
            }
            
            while (!["adicionar","retirar"].includes(somar_ou_subtrair))
                {
                somar_ou_subtrair=prompt("digite retirar ou adicionar")
                somar_ou_subtrair=somar_ou_subtrair.toLowerCase();
            }
            
            somar_ou_subtrair=somar_ou_subtrair.toLowerCase();
            if(somar_ou_subtrair==="adicionar"){
                produtos[item].stock=valor_modificacao+produtos[item].stock;
            }

            else if(somar_ou_subtrair==="retirar"){
                while (true){
                    
                    if(valor_modificacao<=produtos[item].stock){    
                        produtos[item].stock=produtos[item].stock-valor_modificacao;
                        break;
                    }
                    else{
                        valor_modificacao=Number(prompt("digite um valor menor ou igual ao stock"))
                    }
                }
                    }
            abaixo_stock(item)
            console.table(produtos[item])
            break;
        case 5:
            cotinuar=false;
            break;
    }
    }
    
    
