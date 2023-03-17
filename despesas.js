let tabelaDespesas = []
// {
//     vencimento: '23/03/2023',
//     despesa: 'Compra de Lanche',
//     valor: 50,
//     status: "PAGO",
// },

// {
//     vencimento: '25/03/2023',
//     despesa: 'Conta de Luz',
//     valor: 100,
//     status: "PENDENTE",
// },
// {
//     vencimento: '21/01/2023',
//     despesa: 'Cartão de Crédito',
//     valor: 100,
//     status: "PENDENTE",
// },
// {
//     vencimento: '10/02/2023',
//     despesa: 'Casa',
//     valor: 50,
//     status: "PAGO",
// },
// {
//     vencimento: '1010232326',
//     despesa: 'Combustível',
//     valor: 50,
//     status: "PENDENTE",
// }
// ]

let corpoTabelaDespesas = document.querySelector('#corpoTabelaDespesas')
let stats = ''
let corLinha = ''
let linkDespesas = document.querySelector('#linkDespesas')
let despesas = []
let addDespesa = document.querySelector('#addDespesa')
let botaoAdicionarDespesa = document.querySelector('#botaoAdicionarDespesa')
let valorResumoAPagar = document.querySelector('#valorResumoAPagar')
let valorResumoPagas = document.querySelector('#valorResumoPagas')
let valorResumoAtrasadas = document.querySelector('#valorResumoPendentes')
let botaoSalvarDespesa = document.querySelector('#botaoSalvarDespesa')
let botaoCancelarDespesa = document.querySelector('#botaoCancelarDespesa')
let dadosData = []
let dataVencimentoDespesa = document.querySelector('#dataVencimentoDespesa')
let nomeDespesa = document.querySelector('#nomeDespesa')
let valorDespesa = document.querySelector('#valorDespesa')
let telaHome = document.querySelector('#home')

// function defineDadosData() {
//     let data = new Date()
//     let ano = data.getFullYear()
//     let mes = (data.getMonth() + 1) < 10 ? `0${(data.getMonth() + 1)}` : (data.getMonth() + 1)
//     let dia = data.getDate() < 10 ? `0${data.getDate()}` : data.getDate()

//     return dadosData = [dia, mes, ano]    
// }

function mostraModalDespesas() {
    telaHome.classList.add('esconde')
    addDespesa.classList.remove('esconde')
}

function escondeModalDespesas() {
    telaHome.classList.remove('esconde')
    addDespesa.classList.add('esconde')
}

function montarTabelaDespesas(lista) {

    cadCategorias.classList.add('esconde')
    telaHome.classList.remove('esconde')

    let linhaDespesa = ''
    let totalPago = 0
    let totalAPagar = 0

    // let totalAtrasadas = []

    if (lista.length == 0) {
        linhaDespesa = `
            <tr>
                <td colspan='4'>Não existe despesa a ser exibida.</td>          
            </tr>
        `
    } else {
        lista.forEach((obj, index) => {

            if (obj.status == "PAGO") {
                stats = "btnPago"
                corLinha = "linhaVerde"
                totalPago += obj.valor
            } else {
                stats = "btnPendente"
                corLinha = "linhaVermelha"
                totalAPagar += obj.valor
                // if (obj.data < new Date()) {
                //     totalAtrasadas.push(obj)
                //     valorResumoAtrasadas.innerHTML = totalAtrasadas.length
                // }    
            }

            linhaDespesa += `
            <tr>
                <td class="${corLinha}">${obj.data}</td>
                <td class="${corLinha}">${obj.nome}</td>
                <td class="${corLinha}">${obj.valor}</td>
                <td><input type="button" class="botao ${stats}" value=${obj.status} onclick="trocaStatus(${index})"></td>
                </tr>
                `
        })
    }
    corpoTabelaDespesas.innerHTML = linhaDespesa
    valorResumoPagas.innerHTML = totalPago.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    valorResumoAPagar.innerHTML = totalAPagar.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function trocaStatus(indice) {
    tabelaDespesas.forEach((obj, index) => {
        if (indice == index) {
            if (obj.status == "PAGO") {
                obj.status = "PENDENTE"
            } else {
                obj.status = "PAGO"
            }
        }
    })
    corpoTabelaDespesas.innerHTML = ''
    montarTabelaDespesas()
}

function adicionarDespesa() {

    escondeModalDespesas()

    let despesa = {}

    despesa.data = dataVencimentoDespesa.value
    despesa.nome = nomeDespesa.value
    despesa.valor = valorDespesa.value
    despesa.status = "PAGO"

    tabelaDespesas.push(despesa)
    montarTabelaDespesas(tabelaDespesas)
    console.log(tabelaDespesas)
}


linkDespesas.addEventListener('click', () => montarTabelaDespesas(tabelaDespesas))
botaoAdicionarDespesa.addEventListener('click', mostraModalDespesas)
botaoCancelarDespesa.addEventListener('click', escondeModalDespesas)
botaoSalvarDespesa.addEventListener('click', adicionarDespesa)

montarTabelaDespesas(tabelaDespesas)