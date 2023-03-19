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
let filtroDespesa = document.querySelector('#filtroDespesa')
let formAddDespesa = document.querySelector('.filtragem')

function insereOptionsCategorias() {
    let options = ''
    categorias.forEach(obj => options += `<option>${obj.nome}</option>`)
    opcoesCategorias.innerHTML = options
}

function excluirDespesa(indice) {
    if (confirm('Deseja realmente excluir a despesa?')) {
        tabelaDespesas.find((obj, index) => {
            if (indice == index) {
                tabelaDespesas.splice(index, 1)
                if (testaData(obj.data)) {
                    totalAtrasadas--
                }
                montarTabelaDespesas(tabelaDespesas)
            }
        })
    }
}

function filtraDespesas() {
    let despesasFiltradas = tabelaDespesas.filter(despesa =>
        despesa.data.includes(filtroDespesa.value) ||
        despesa.nome.toLowerCase().includes(filtroDespesa.value.toLowerCase()) ||
        despesa.valor.includes(filtroDespesa.value) ||
        despesa.categoria.toLowerCase().includes(filtroDespesa.value.toLowerCase()) ||
        despesa.status.toLowerCase().includes(filtroDespesa.value.toLowerCase())
    )
    montarTabelaDespesas(despesasFiltradas)
}

function testaData(dataDespesaTabela) {
    let data = new Date()
    let [diaDataTabela, mesDataTabela, anoDataTabela] = dataDespesaTabela.split('-')
    let dataDespesa = new Date(diaDataTabela, (mesDataTabela - 1),anoDataTabela)

    return data >= dataDespesa
}

function mostraModalDespesas() {
    formAddDespesa.reset()
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
        <td colspan='6'>Não existe despesa a ser exibida.</td>          
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
            <td class="${corLinha}">${formataExibicaoDataDespesa(obj.data)}</td>
                    <td class="${corLinha}">${obj.nome}</td>
                    <td class="${corLinha}">${formataReal(obj.valor)}</td>
                    <td class="${corLinha}">${obj.categoria}</td>
                    <td><input type="button" class="botao ${stats}" value="${obj.status}" onclick="trocaStatus(${index})"></td>
                    <td><input type="button" class="botao botaoCancel" value="EXCLUIR" onclick="excluirDespesa(${index})"></td>
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

function validaDataVencimentoDespesa(data) {
    if (`${dataVencimentoDespesa.value}`.length != 10) {
        alert('[ERRO] A data informada não possui formato adequado (dd/mm/aaaa). Insira um formato válido para continuar.')
        mostraModalDespesas()
    } else {
        data = dataVencimentoDespesa.value
    }
}

function formataExibicaoDataDespesa(data) {
    anoExibicao = data.slice(0,4)
    mesExibicao = data.slice(5,7)
    diaExibicao = data.slice(8,10)
    
    return dataParaExibir = `${diaExibicao}/${mesExibicao}/${anoExibicao}`
}

function adicionarDespesa() {
    escondeModalDespesas()
    
    if (tabelaDespesas.find(obj => obj.nome == nomeDespesa.value)) {
        alert('[ERRO] A despesa informada já existe! Altere o nome da despesa para realizar a inclusão.')
        mostraModalDespesas()
        
    } else {
        
        if (categorias.find(obj => obj.nome == categoriaSelecionada.value)) {

            let despesa = {}
            
            despesa.data = dataVencimentoDespesa.value
            despesa.nome = nomeDespesa.value
            despesa.valor = valorDespesa.value
            despesa.categoria = categoriaSelecionada.value
            despesa.status = "PENDENTE"

            validaDataVencimentoDespesa(despesa.data)
            
            if (testaData(despesa.data)) {
                totalAtrasadas++
            }
            
            tabelaDespesas.push(despesa)
            montarTabelaDespesas(tabelaDespesas)
        } else {
            if(confirm('[ERRO] Não é possível adicionar uma categoria que não esteja cadastrada. Cadastre a categoria desejada antes de inserir a despesa. Deseja adicionar a categoria?')) {
                mostraModalCategoria()
            } else {
                mostraModalDespesas()
            }
        }
    }
}


linkDespesas.addEventListener('click', () => montarTabelaDespesas(tabelaDespesas))
botaoAdicionarDespesa.addEventListener('click', mostraModalDespesas)
botaoCancelarDespesa.addEventListener('click', escondeModalDespesas)
botaoSalvarDespesa.addEventListener('click', adicionarDespesa)
filtroDespesa.addEventListener('keyup', filtraDespesas)

montarTabelaDespesas(tabelaDespesas)