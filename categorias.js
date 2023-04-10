// let corpoTabelaCategorias = document.querySelector('#corpoTabelaCategorias')
let botaoAddCategoria = document.querySelector('#botaoAddCategoria')
let addEditCategoria = document.querySelector('#addEditCategoria')
let botaoCancelAddCategoria = document.querySelector('#botaoCancelAddCategoria')
let nomeCategoria = document.querySelector('#nomeCategoria')
let botaoSalvarCategoria = document.querySelector('#botaoSalvarCategoria')
let listaCategoriasLocalStorage = JSON.parse(localStorage.getItem('listaCategoriasLocalStorage'))
let categorias = listaCategoriasLocalStorage ?? []
let id = ''
let linkCategorias = document.querySelector('#linkCategorias')
let cadCategorias = document.querySelector('#cadCategorias')
let filtroCategoria = document.querySelector('#filtroCategoria')

document.querySelector('form').addEventListener('submit', (event)=>{event.preventDefault()})

function defineID() {
    let data = new Date()
    let ano = data.getFullYear()
    let mes = (data.getMonth() + 1) < 10 ? `0${(data.getMonth() + 1)}` : (data.getMonth() + 1)
    let dia = data.getDate() < 10 ? `0${data.getDate()}` : data.getDate()
    let horas = data.getHours() < 10 ? `0${data.getHours()}` : data.getHours()
    let minutos = data.getMinutes() < 10 ? `0${data.getMinutes()}` : data.getMinutes()
    let segundos = data.getSeconds() < 10 ? `0${data.getSeconds()}` : data.getSeconds()

    return `${ano}${mes}${dia}_${horas}${minutos}${segundos}`
}

function mostraModalCategoria() {
    addEditCategoria.classList.remove('esconde')
    nomeCategoria.value = ''
    botaoSalvarCategoria.setAttribute("onclick", "addCategoria()")
    nomeCategoria.focus()
}

function escondeModalCategoria() {
    addEditCategoria.classList.add('esconde')
    filtroCategoria.focus()
}

function addCategoria() {
    let categoria = {}
    if (nomeCategoria.value.trim().length < 2) {
        msg('[ERRO] Não é possível adicionar a categoria. O nome da categoria deve conter ao menos 2 caracteres que não devem ser espaços em branco.', 'falha')
    } else {
        categoria.nome = nomeCategoria.value
        categoria.id = defineID()
        if (categorias.find(obj => obj.nome.toLowerCase().trim() == nomeCategoria.value.toLowerCase().trim())) {
            msg(`[ERRO] A categoria ${nomeCategoria.value} já existe.`,'alerta')
        } else {
            categorias.push(categoria)
            addEditCategoria.classList.add('esconde')
            listarCategorias(categorias)
            msg('Categoria criada com sucesso!', 'sucesso')
            // escondeMensagem()
        }
    }
}

function listarCategorias(lista) {

    escondeModalDespesas()
    escondeModalCategoria()

    cadCategorias.classList.remove('esconde')
    telaHome.classList.add('esconde')

    let listaCategorias = ''
    if (lista.length == 0) {
        listaCategorias = `
            <tr>
                <td colspan='3'>Não existe categoria a ser exibida.</td>          
            </tr>
        `
    } else {

        lista.forEach(categoria => {
            listaCategorias += `
                <tr>
                    <td>${categoria.id}</td>
                    <td>${categoria.nome}</td>
                    <td id="botoesDeAcaoCat">
                        <input class="botao" type="button" value="EDITAR" onclick="abreEdicaoCategoria('${categoria.id}')">
                        <input class="botao botaoCancel" type="button" value="EXCLUIR" onclick="excluirCategoria('${categoria.id}')">
                    </td>                
                </tr>
            `
        })
    }
    corpoTabelaCategorias.innerHTML = listaCategorias
    atualizaCategoriasLocalStorage(lista)
}

function atualizaCategoriasLocalStorage(lista) {
    localStorage.setItem('listaCategoriasLocalStorage', JSON.stringify(lista))
}

function filtraCategorias() {
    let categoriasFiltradas = categorias.filter(cat => 
        cat.nome.toLowerCase().trim().includes(filtroCategoria.value.toLowerCase().trim()) || cat.id.includes(filtroCategoria.value.trim()))
    listarCategorias(categoriasFiltradas)
}

function abreEdicaoCategoria(id) {
    mostraModalCategoria()
    nomeCategoria.value = categorias.find(obj => obj.id == id).nome
    botaoSalvarCategoria.setAttribute('onclick', `editarCategoria('${id}')`)
}

function editarCategoria(id) {
    categorias.map(obj => {
        if (obj.id == id) {

            if (categorias.find(obj => obj.nome == nomeCategoria.value)) {
                msg(`[ERRO] A categoria ${nomeCategoria.value} já existe.`, 'alerta')
            } else {
                obj.nome = nomeCategoria.value
                escondeModalCategoria()
                listarCategorias(categorias)
                msg('A categoria foi editada.', 'sucesso')
            }
        }
    })

}

function excluirCategoria(id) {
    if (confirm('Deseja realmente excluir a categoria?')) {
        categorias.find((obj, index) => {
            if (tabelaDespesas.find(despesa => despesa.categoria == obj.nome)) {
                msg(`Não é possíel excluir a categoria "${obj.nome}". Existem despesas atreladas a ela. Exclua as depesas para que a categoria possa ser excluída.`, 'falha')
            } else {
                if (obj.id == id) {
                    categorias.splice(index, 1)
                    listarCategorias(categorias)
                    msg('Categoria excluída com sucesso!', 'sucesso')
                }
            }
        })
    }
}

botaoAddCategoria.addEventListener('click', () => mostraModalCategoria())
botaoCancelAddCategoria.addEventListener('click', escondeModalCategoria)
linkCategorias.addEventListener('click', () => {
    listarCategorias(categorias)
    
})
filtroCategoria.addEventListener('keyup', filtraCategorias)
