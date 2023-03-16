const tabela1 = [
    {
        vencimento: '23/03/2023',
        despesa: 'Compra de Lanche',
        valor: 50,
        status: "PAGO",
    },

    {
        vencimento: '25/03/2023',
        despesa: 'Conta de Luz',
        valor: 100,
        status: "PENDENTE",
    },
    {
        vencimento: '21/01/2023',
        despesa: 'Cartão de Crédito',
        valor: 100,
        status: "PENDENTE",
    },
    {
        vencimento: '10/02/2023',
        despesa: 'Casa',
        valor: 50,
        status: "PAGO",
    },
    {
        vencimento: '1010232326',
        despesa: 'Combustível',
        valor: 50,
        status: "PENDENTE",
    }
]

let corpoTabelaDespesas = document.querySelector('#corpoTabelaDespesas')
let stats = ''
let corLinha = ''
let linkDespesas = document.querySelector('#linkDespesas')


//Realizar a montagem do botão de status!!! Preciso d eum id para eles
function montarTabelaDespesas() {
    cadCategorias.classList.add('esconde')
    telaHome.classList.remove('esconde')
    let htmlToAppend = ''
    tabela1.forEach((obj, index) => {
        if (obj.status == "PAGO") {
            stats = "btnPago"
            corLinha = "linhaVerde"
        } else {
            stats = "btnPendente"
            corLinha = "linhaVermelha"
        }

        htmlToAppend += `
            <tr>
                <td class="${corLinha}">${obj.vencimento}</td>
                <td class="${corLinha}">${obj.despesa}</td>
                <td class="${corLinha}">${obj.valor}</td>
                <td><input type="button" class="botao ${stats}" value=${obj.status} onclick=trocaStatus(${index})></td>
            </tr>
        `
    })
    corpoTabelaDespesas.innerHTML = htmlToAppend
}

function trocaStatus(indice) {
    tabela1.forEach((obj, index) => {
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

function addDespesa() {

}

addEventListener('load', montarTabelaDespesas)
linkDespesas.addEventListener('click', montarTabelaDespesas)
