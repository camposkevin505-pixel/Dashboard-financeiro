let transacoes =
JSON.parse(localStorage.getItem("transacoes")) || [];

const lista = document.getElementById("lista");

const receitasEl = document.getElementById("receitas");
const despesasEl = document.getElementById("despesas");
const saldoEl = document.getElementById("saldo");

const ctx = document.getElementById("grafico");

let grafico;

function salvar(){
    localStorage.setItem(
        "transacoes",
        JSON.stringify(transacoes)
    );
}

function adicionarTransacao(){

    const data =
    document.getElementById("data").value;

    const valor =
    Number(document.getElementById("valor").value);

    const categoria =
    document.getElementById("categoria").value;

    const tipo =
    document.getElementById("tipo").value;

    if(!data || valor <= 0){
        alert("Preencha os campos");
        return;
    }

    transacoes.push({
        data,
        valor,
        categoria,
        tipo
    });

    salvar();
    atualizar();
}

function remover(index){

    transacoes.splice(index,1);

    salvar();
    atualizar();
}

function atualizar(){

    lista.innerHTML = "";

    let receitas = 0;
    let despesas = 0;

    let categorias = {};

    transacoes.forEach((t,index)=>{

        if(t.tipo === "receita"){
            receitas += t.valor;
        }else{
            despesas += t.valor;

            categorias[t.categoria] =
            (categorias[t.categoria] || 0)
            + t.valor;
        }

        lista.innerHTML += `
        <tr>
            <td>${t.data}</td>
            <td>${t.categoria}</td>
            <td>${t.tipo}</td>
            <td>R$ ${t.valor.toFixed(2)}</td>
            <td>
                <button
                class="excluir"
                onclick="remover(${index})">
                X
                </button>
            </td>
        </tr>
        `;
    });

    receitasEl.innerText =
    `R$ ${receitas.toFixed(2)}`;

    despesasEl.innerText =
    `R$ ${despesas.toFixed(2)}`;

    saldoEl.innerText =
    `R$ ${(receitas-despesas).toFixed(2)}`;

    atualizarGrafico(categorias);
}

function atualizarGrafico(categorias){

    const labels = Object.keys(categorias);
    const valores = Object.values(categorias);

    if(grafico){
        grafico.destroy();
    }

    grafico = new Chart(ctx,{
        type:'doughnut',
        data:{
            labels:labels,
            datasets:[{
                data:valores
            }]
        }
    });
}

const dashboard =
document.getElementById("dashboard");

const loginScreen =
document.getElementById("loginScreen");

dashboard.style.display = "none";

function login(){

    const usuario =
    document.getElementById("usuario").value;

    const senha =
    document.getElementById("senha").value;

    if(
        usuario === "Yas" &&
        senha === "yasmin0909"
    ){

        loginScreen.style.display = "none";
        dashboard.style.display = "block";

    }else{

        document.getElementById(
            "erroLogin"
        ).innerText =
        "Usuário ou senha incorretos";

    }
}

atualizar();