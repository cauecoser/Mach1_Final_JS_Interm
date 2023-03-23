let tabelaDespesas = []
let corpoTabelaDespesas = document.querySelector('#corpoTabelaDespesas')
let stats = ''
let corLinha = ''
let linkDespesas = document.querySelector('#linkDespesas')
let listaDespesasLocalStorage = JSON.parse(localStorage.getItem('listaDespesasLocalStorage'))
let despesas = listaDespesasLocalStorage ?? []
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
let mensagem = document.querySelector('#mensagem')
let paragrafoMensagem = document.querySelector('#paragrafoMensagem')

function msg(texto, tipo) {
    mensagem.classList.add(`${tipo}`)
    mensagem.innerHTML = texto
    mensagem.classList.remove('esconde')
    setTimeout(() => {
        mensagem.innerHTML = ''
        mensagem.classList.remove(`${tipo}`)
    }, 3000);
}

function insereOptionsCategorias() {
    let options = ''
    categorias.forEach(obj => options += `<option>${obj.nome}</option>`)
    opcoesCategorias.innerHTML = options
}

function contaDespesasAtrasadas(data, tipo) {
    if (tipo == 'soma' && testaData(data)) {
        totalAtrasadas++
        return true
    } else if (tipo == 'sub' && testaData(data)) {
        totalAtrasadas--
        return false
    } else {
        return false
    }
}

function excluirDespesa(indice) {
    if (confirm('Deseja realmente excluir a despesa?')) {
        tabelaDespesas.find((obj, index) => {
            if (indice == index) {
                tabelaDespesas.splice(index, 1)
                contaDespesasAtrasadas(obj.data, 'sub')
                montarTabelaDespesas(tabelaDespesas)
                msg('Despesa excluída com sucesso!', 'sucesso')
            }
        })
    }
}

function filtraDespesas() {
    let despesasFiltradas = tabelaDespesas.filter(despesa =>
        despesa.data.includes(filtroDespesa.value) ||
        despesa.nome.toLowerCase().trim().includes(filtroDespesa.value.toLowerCase().trim()) ||
        despesa.valor.includes(filtroDespesa.value) ||
        despesa.categoria.toLowerCase().trim().includes(filtroDespesa.value.toLowerCase().trim()) ||
        despesa.status.toLowerCase().includes(filtroDespesa.value.toLowerCase())
    )
    montarTabelaDespesas(despesasFiltradas)
}

function testaData(dataDespesaTabela) {
    let data = new Date()
    let [anoDataTabela, mesDataTabela, diaDataTabela] = dataDespesaTabela.split('-')
    let dataDespesa = new Date(anoDataTabela, (mesDataTabela - 1), diaDataTabela)

    return data >= dataDespesa
}

function mostraModalDespesas() {
    telaHome.classList.add('esconde')
    addDespesa.classList.remove('esconde')
    categoriaSelecionada.focus()
}

function escondeModalDespesas() {
    telaHome.classList.remove('esconde')
    addDespesa.classList.add('esconde')
    filtroDespesa.focus()
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
                totalPago += Number(obj.valor.replace('.', '').replace(',', '.'))
            } else {
                stats = "btnPendente"
                corLinha = "linhaVermelha"
                totalAPagar += Number(obj.valor.replace('.', '').replace(',', '.'))
            }

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
    atualizaDespesasLocalStorage(lista)

    valorResumoAtrasadas.innerHTML = totalAtrasadas
    corpoTabelaDespesas.innerHTML = linhaDespesa
    valorResumoPagas.innerHTML = Number(totalPago).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    valorResumoAPagar.innerHTML = Number(totalAPagar).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function atualizaDespesasLocalStorage(lista) {
    localStorage.setItem('listaDespesasLocalStorage', JSON.stringify(lista))
}

function formataReal(campo, apenasNumeros) {
    if (apenasNumeros) {
        let aux = ''
        aux = campo.replace(/\D/g, '')
        aux = (aux / 100).toFixed(2) + ''
        aux = aux.replace(".", ",")
        aux = aux.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
        return aux
    }
    return `R$ ${campo}`
}

function trocaStatus(indice) {
    tabelaDespesas.forEach((obj, index) => {
        if (indice == index) {
            if (obj.status == "PAGO") {
                obj.status = "PENDENTE"
                contaDespesasAtrasadas(obj.data, 'soma')
            } else {
                obj.status = "PAGO"
                contaDespesasAtrasadas(obj.data, 'sub')
            }
        }
    })
    montarTabelaDespesas(tabelaDespesas)
}

function validaDataVencimentoDespesa(data) {
    if (`${data}`.length != 10) {
        msg('[ERRO] A data informada não possui formato adequado (dd/mm/aaaa). Insira um formato válido para continuar.', 'falha')
        return false
    }
    return true
}

function formataExibicaoDataDespesa(data) {
    anoExibicao = data.slice(0, 4)
    mesExibicao = data.slice(5, 7)
    diaExibicao = data.slice(8, 10)

    return dataParaExibir = `${diaExibicao}/${mesExibicao}/${anoExibicao}`
}

function adicionarDespesa() {
    escondeModalDespesas()

    if (nomeDespesa.value.trim().length < 2) {
        msg('[ERRO] O nome da despesa deve conter pelo menos 2 caracteres que não podem ser espaços em branco. Altere o nome da despesa para realizar a inclusão.', 'falha')
        mostraModalDespesas()
    } else if (valorDespesa.value.length == 0) {
        msg('[ERRO] O valor da despesa deve ser preenchido!.', 'alerta')
        mostraModalDespesas()
    } else {
        if (categorias.find(obj => obj.nome == categoriaSelecionada.value)) {

            let despesa = {}

            despesa.data = dataVencimentoDespesa.value
            despesa.nome = nomeDespesa.value
            despesa.valor = valorDespesa.value
            despesa.categoria = categoriaSelecionada.value
            despesa.status = "PENDENTE"

            if (!validaDataVencimentoDespesa(despesa.data)) {
                mostraModalDespesas()
                return false
            }

            contaDespesasAtrasadas(despesa.data, 'soma')

            tabelaDespesas.push(despesa)
            montarTabelaDespesas(tabelaDespesas)
            msg('Despesa incluída com sucesso!', 'sucesso')
        } else {
            if (confirm('[ERRO] Não é possível adicionar na despesa uma categoria que não esteja cadastrada. Cadastre a categoria desejada antes de inserir a despesa. Deseja adicionar a categoria?')) {
                mostraModalCategoria()
                nomeCategoria.value = categoriaSelecionada.value
            } else {
                mostraModalDespesas()
            }
        }
    }
}


linkDespesas.addEventListener('click', () => {
    montarTabelaDespesas(tabelaDespesas)
    // atualizaCategoriasLocalStorage(tabelaDespesas)???
})
botaoAdicionarDespesa.addEventListener('click', () => {
    mostraModalDespesas()
    insereOptionsCategorias()
})
botaoCancelarDespesa.addEventListener('click', escondeModalDespesas)
botaoSalvarDespesa.addEventListener('click', adicionarDespesa)
filtroDespesa.addEventListener('keyup', filtraDespesas)
valorDespesa.addEventListener('keyup', () => {
    valorDespesa.value = formataReal(valorDespesa.value, true)
})

montarTabelaDespesas(tabelaDespesas)