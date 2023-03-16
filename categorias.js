let corpoTabelaCategorias = document.querySelector('#corpoTabelaCategorias')
let botaoAddCategoria = document.querySelector('#botaoAddCategoria')
let addEditCategoria = document.querySelector('#addEditCategoria')
let botaoAddCancelAddCategoria = document.querySelector('#botaoCancelAddCategoria')
let nomeCategoria = document.querySelector('#nomeCategoria')
let botaoSalvarCategoria = document.querySelector('#botaoSalvarCategoria')
let categorias = []
let id = 0
let linkCategorias = document.querySelector('#linkCategorias')
let telaHome = document.querySelector('#home')
let cadCtaegorias = document.querySelector('#cadCategorias')
let filtroCategoria = document.querySelector('#filtroCategoria')

let data = new Date()
let ano = data.getFullYear()
let mes = (data.getMonth() + 1) < 10 ? `0${(data.getMonth() + 1)}` : (data.getMonth() + 1)
let dia = data.getDate() < 10 ? `0${data.getDate()}` : data.getDate()
let horas = data.getHours() < 10 ? `0${data.getHours()}` : data.getHours()
let minutos = data.getMinutes() < 10 ? `0${data.getMinutes()}` : data.getMinutes()
let segundos = data.getSeconds() < 10 ? `0${data.getSeconds()}` : data.getSeconds()

function mostraModal() {
    addEditCategoria.classList.remove('esconde')
    nomeCategoria.value = ''
}

function escondeModal() {
    addEditCategoria.classList.add('esconde')
}

function addCategoria() {
    let categoria = {}
    if (nomeCategoria.value.length < 2) {
        alert('[ERRO] O nome da categoria deve conter ao menos 2 caracteres que não devem ser espaços em branco.')
    } else {
        categoria.nome = nomeCategoria.value
        categoria.id = `${ano}${mes}${dia}_${horas}${minutos}${segundos}`
        categorias.push(categoria)
        addEditCategoria.classList.add('esconde')
        listarCategorias(categorias)
    }
}

function listarCategorias(lista) {
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
                    <td>
                        AÇÕES
                    </td>                
                </tr>
            `
        })
        console.log(lista)
    }
    corpoTabelaCategorias.innerHTML = listaCategorias
}

function filtraCategorias() {
    categoriasFiltradas = categorias.filter(cat => cat.nome.toLowerCase().includes(filtroCategoria.value.toLowerCase()))
    listarCategorias(categoriasFiltradas)
}


botaoAddCategoria.addEventListener('click', mostraModal)
botaoCancelAddCategoria.addEventListener('click', escondeModal)
botaoSalvarCategoria.addEventListener('click', addCategoria)
linkCategorias.addEventListener('click', listarCategorias)
filtroCategoria.addEventListener('keyup', filtraCategorias)