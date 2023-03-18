let tabelaDespesas = []
let corpoTabelaDespesas = document.querySelector('#corpoTabelaDespesas')
let stats = ''
let corLinha = ''
let linkDespesas = document.querySelector('#linkDespesas')
let despesas = []
let addDespesa = document.querySelector('#addDespesa')
let botaoAdicionarDespesa = document.querySelector('#botaoAdicionarDespesa')
let valorResumoAPagar = document.querySelector('#valorResumoAPagar')
let valorResumoPagas = document.querySelector('#valorResumoPagas')
let valorResumoAtrasadas = document.querySelector('#valorResumoAtrasadas')
let botaoSalvarDespesa = document.querySelector('#botaoSalvarDespesa')
let botaoCancelarDespesa = document.querySelector('#botaoCancelarDespesa')
let dadosData = []
let dataVencimentoDespesa = document.querySelector('#dataVencimentoDespesa')
let nomeDespesa = document.querySelector('#nomeDespesa')
let valorDespesa = document.querySelector('#valorDespesa')
let telaHome = document.querySelector('#home')
let opcoesCategorias = document.querySelector('#opcoesCategorias')
let categoriaSelecionada = document.querySelector('#categoriaSelecionada')

let totalAtrasadas = 0

function testaData(dataDespesaTabela) {
    let data = new Date()
    let [anoDataTabela, mesDataTabela, diaDataTabela] = dataDespesaTabela.split('-')
    let dataDespesa = new Date(anoDataTabela, (mesDataTabela - 1), diaDataTabela)

    return data >= dataDespesa
}

function mostraModalDespesas() {
    insereOptionsCategorias()

    telaHome.classList.add('esconde')
    addDespesa.classList.remove('esconde')
}

function escondeModalDespesas() {
    telaHome.classList.remove('esconde')
    addDespesa.classList.add('esconde')
}

function montarTabelaDespesas(lista) {

    escondeModalDespesas()
    addEditCategoria.classList.add('esconde')
    cadCategorias.classList.add('esconde')
    telaHome.classList.remove('esconde')

    let linhaDespesa = ''
    let totalPago = 0
    let totalAPagar = 0

    if (lista.length == 0) {
        linhaDespesa = `
        <tr>
                <td colspan='5'>Não existe despesa a ser exibida.</td>          
            </tr>
        `
    } else {
        lista.forEach((obj, index) => {

            if (obj.status == "PAGO") {
                stats = "btnPago"
                corLinha = "linhaVerde"
                totalPago += Number(obj.valor)
            } else {
                stats = "btnPendente"
                corLinha = "linhaVermelha"
                totalAPagar += Number(obj.valor)
            }
            valorResumoAtrasadas.innerHTML = totalAtrasadas

            linhaDespesa += `
                <tr>
                    <td class="${corLinha}">${obj.data}</td>
                    <td class="${corLinha}">${obj.nome}</td>
                    <td class="${corLinha}">${formataReal(obj.valor)}</td>
                    <td class="${corLinha}">${obj.categoria}</td>
                    <td><input type="button" class="botao ${stats}" value="${obj.status}" onclick="trocaStatus(${index})"></td>
                </tr>
            `
        })
    }
    corpoTabelaDespesas.innerHTML = linhaDespesa
    valorResumoPagas.innerHTML = formataReal(totalPago)
    valorResumoAPagar.innerHTML = formataReal(totalAPagar)
}

function formataReal(campo) {
    return Number(campo).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function trocaStatus(indice) {
    tabelaDespesas.forEach((obj, index) => {
        if (indice == index) {
            if (obj.status == "PAGO") {
                obj.status = "PENDENTE"

                if (testaData(obj.data)) {
                    totalAtrasadas++
                }
            } else {
                obj.status = "PAGO"
                if (testaData(obj.data)) {
                    totalAtrasadas--
                }
            }
        }
    })
    montarTabelaDespesas(tabelaDespesas)
}

function adicionarDespesa() {

    escondeModalDespesas()

    let despesa = {}

    despesa.data = dataVencimentoDespesa.value
    despesa.nome = nomeDespesa.value
    despesa.valor = valorDespesa.value
    despesa.categoria = categoriaSelecionada.value
    despesa.status = "PENDENTE"

    if (testaData(despesa.data)) {
        totalAtrasadas++
    }

    tabelaDespesas.push(despesa)
    montarTabelaDespesas(tabelaDespesas)
}


linkDespesas.addEventListener('click', () => montarTabelaDespesas(tabelaDespesas))
botaoAdicionarDespesa.addEventListener('click', mostraModalDespesas)
botaoCancelarDespesa.addEventListener('click', escondeModalDespesas)
botaoSalvarDespesa.addEventListener('click', adicionarDespesa)

montarTabelaDespesas(tabelaDespesas)