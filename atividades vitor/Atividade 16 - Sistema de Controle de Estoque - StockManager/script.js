let produtos = {
    101: { "nome": "Teclado Mecânico", "valor": 180, "stock": 15, "stockminimo": 5 },
    102: { "nome": "Mouse Gamer", "valor": 120, "stock": 8, "stockminimo": 4 },
    103: { "nome": "Monitor 24", "valor": 850, "stock": 3, "stockminimo": 5 },
    104: { "nome": "Headset USB", "valor": 250, "stock": 12, "stockminimo": 6 },
    105: { "nome": "Webcam Full HD", "valor": 320, "stock": 2, "stockminimo": 3 }
};
let historico = [];

function moeda(valor) {
    return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function pedir_codigo(estoque) {
    while (true) {
        let codigo = prompt("digite o codigo do item");
        if (codigo === null) {
            return null;
        }
        codigo = codigo.trim();
        if (Object.hasOwn(estoque, codigo)) {
            return codigo;
        }
        console.table(estoque);
        alert("codigo nao encontrado, digite um codigo valido");
    }
}

function pedir_inteiro(mensagem) {
    while (true) {
        let texto = prompt(mensagem);
        if (texto === null) {
            return null;
        }
        texto = texto.trim();
        let numero = Number(texto);
        if (texto !== "" && Number.isInteger(numero) && numero > 0) {
            return numero;
        }
        alert("digite um numero inteiro maior que zero");
    }
}

function registrar(lista, estoque, item, tipo, quantidade) {
    lista.push({
        "codigo": item,
        "produto": estoque[item].nome,
        "tipo": tipo,
        "quantidade": quantidade,
        "saldo": estoque[item].stock
    });
}

function abaixo_stock(item, estoque) {
    if (estoque[item].stock <= estoque[item].stockminimo) {
        console.log(`${estoque[item].nome} precisa de reposicao: estoque ${estoque[item].stock}, minimo ${estoque[item].stockminimo}`);
    }
}

function cadastro(stock) {
    while (true) {
        let Cadastro_de_produtos = prompt("digite as seguintes informaçoes separadas por virgulas: código, nome, valor unitário, quantidade disponível e estoque mínimo");
        if (Cadastro_de_produtos === null) {
            break;
        }

        let [codigo, nome, valor, quantidade, stock_minimo] = Cadastro_de_produtos.split(",");

        if (stock_minimo === undefined) {
            alert("cadastro recusado: faltam informacoes");
            continue;
        }

        codigo = codigo.trim();
        nome = nome.trim();
        valor = valor.trim();
        quantidade = quantidade.trim();
        stock_minimo = stock_minimo.trim();

        if (codigo === "" || nome === "" || valor === "" || quantidade === "" || stock_minimo === "") {
            alert("cadastro recusado: nenhum campo pode ficar vazio");
            continue;
        }

        valor = Number(valor.replace(",", "."));
        quantidade = Number(quantidade);
        stock_minimo = Number(stock_minimo);

        if (isNaN(valor) || valor <= 0) {
            alert("cadastro recusado: valor invalido");
            continue;
        }
        if (!Number.isInteger(quantidade) || quantidade < 0) {
            alert("cadastro recusado: quantidade invalida");
            continue;
        }
        if (!Number.isInteger(stock_minimo) || stock_minimo < 0) {
            alert("cadastro recusado: estoque minimo invalido");
            continue;
        }
        if (Object.hasOwn(stock, codigo)) {
            alert("cadastro recusado: esse codigo ja existe");
            continue;
        }

        stock[codigo] = { "nome": nome, "valor": valor, "stock": quantidade, "stockminimo": stock_minimo };
        alert("produto cadastrado: " + nome);

        let repetir_cadastro = prompt("deseja cadastrar outro item? digite S|N");
        while (repetir_cadastro !== null && !["s", "n"].includes(repetir_cadastro.trim().toLowerCase())) {
            repetir_cadastro = prompt("digite S ou N");
        }
        if (repetir_cadastro === null || repetir_cadastro.trim().toLowerCase() === "n") {
            break;
        }
    }
}

function modificar_stock(estoque, lista) {
    let item = pedir_codigo(estoque);
    if (item === null) {
        return;
    }

    while (true) {
        let modificacao = prompt("digite a quantidade e se deseja adicionar ou retirar do stock, separados por virgula (ex: 5,adicionar)");
        if (modificacao === null) {
            return;
        }

        let [valor_modificacao, somar_ou_subtrair] = modificacao.split(",");

        if (somar_ou_subtrair === undefined) {
            alert("use o formato quantidade,adicionar ou quantidade,retirar");
            continue;
        }

        valor_modificacao = valor_modificacao.trim();
        somar_ou_subtrair = somar_ou_subtrair.trim().toLowerCase();
        let quantidade = Number(valor_modificacao);

        if (valor_modificacao === "" || !Number.isInteger(quantidade) || quantidade <= 0) {
            alert("a quantidade deve ser um numero inteiro maior que zero");
            continue;
        }
        if (!["adicionar", "retirar"].includes(somar_ou_subtrair)) {
            alert("digite adicionar ou retirar");
            continue;
        }

        if (somar_ou_subtrair === "adicionar") {
            estoque[item].stock = estoque[item].stock + quantidade;
            registrar(lista, estoque, item, "entrada", quantidade);
        }
        else {
            if (quantidade > estoque[item].stock) {
                alert(`operacao recusada: ${estoque[item].nome} tem apenas ${estoque[item].stock} unidade(s)`);
                return;
            }
            estoque[item].stock = estoque[item].stock - quantidade;
            registrar(lista, estoque, item, "saida", quantidade);
        }

        abaixo_stock(item, estoque);
        console.table(estoque[item]);
        return;
    }
}

function relatorio(estoque) {
    let tipos = 0;
    let total_unidades = 0;
    let valor_total = 0;
    let maior_valor = -1;
    let maior_nome = "";
    let reposicao = "";

    for (let item in estoque) {
        let valor_produto = estoque[item].valor * estoque[item].stock;
        tipos++;
        total_unidades += estoque[item].stock;
        valor_total += valor_produto;

        if (valor_produto > maior_valor) {
            maior_valor = valor_produto;
            maior_nome = estoque[item].nome;
        }
        if (estoque[item].stock <= estoque[item].stockminimo) {
            reposicao += "\n  - " + estoque[item].nome;
        }
    }

    if (reposicao === "") {
        reposicao = "\n  (nenhum)";
    }

    alert(
        "RELATORIO GERENCIAL\n\n" +
        `Produtos diferentes: ${tipos}\n` +
        `Total de unidades: ${total_unidades}\n` +
        `Valor total do estoque: ${moeda(valor_total)}\n` +
        `Maior valor armazenado: ${maior_nome} (${moeda(maior_valor)})\n` +
        `Precisam de reposicao:${reposicao}`
    );
}

function mostrar_historico(lista) {
    if (lista.length === 0) {
        alert("nenhuma movimentacao registrada ainda");
        return;
    }
    console.table(lista);
}

function simular_venda(estoque, lista) {
    let carrinho = {};

    while (true) {
        let item = pedir_codigo(estoque);
        if (item === null) {
            alert("venda cancelada, nenhum estoque foi alterado");
            return;
        }
        let quantidade = pedir_inteiro(`quantidade de ${estoque[item].nome}`);
        if (quantidade === null) {
            alert("venda cancelada, nenhum estoque foi alterado");
            return;
        }
        carrinho[item] = (carrinho[item] || 0) + quantidade;

        let outro = prompt("adicionar outro item? digite S|N");
        while (outro !== null && !["s", "n"].includes(outro.trim().toLowerCase())) {
            outro = prompt("digite S ou N");
        }
        if (outro === null || outro.trim().toLowerCase() === "n") {
            break;
        }
    }

    for (let item in carrinho) {
        if (carrinho[item] > estoque[item].stock) {
            alert(`venda recusada: ${estoque[item].nome} tem ${estoque[item].stock} unidade(s) e foram pedidas ${carrinho[item]}. nenhum estoque foi alterado`);
            return;
        }
    }

    let total = 0;
    for (let item in carrinho) {
        total += carrinho[item] * estoque[item].valor;
        estoque[item].stock = estoque[item].stock - carrinho[item];
        registrar(lista, estoque, item, "saida (venda)", carrinho[item]);
        abaixo_stock(item, estoque);
    }

    alert("venda concluida! valor total: " + moeda(total));
}

let continuar = true;
let item;
while (continuar) {
    let menu = Number(prompt(
        "digite um dos seguintes numeros para acessar as funcoes:\n" +
        "1 - cadastrar itens\n" +
        "2 - verificar stock\n" +
        "3 - visualizar determinado item no stock\n" +
        "4 - modificar stock (adicionar ou retirar)\n" +
        "5 - relatorio gerencial\n" +
        "6 - historico de movimentacoes\n" +
        "7 - simular venda\n" +
        "0 - sair"
    ));

    switch (menu) {
        case 1:
            cadastro(produtos);
            console.table(produtos);
            break;

        case 2:
            console.table(produtos);
            for (item in produtos) {
                abaixo_stock(item, produtos);
            }
            break;

        case 3:
            item = pedir_codigo(produtos);
            if (item !== null) {
                console.table({ [item]: produtos[item] });
            }
            break;

        case 4:
            modificar_stock(produtos, historico);
            break;

        case 5:
            relatorio(produtos);
            break;

        case 6:
            mostrar_historico(historico);
            break;

        case 7:
            simular_venda(produtos, historico);
            break;

        case 0:
            continuar = false;
            break;

        default:
            alert("opcao invalida");
    }
}
