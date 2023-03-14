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

//Realizar a montagem do botão de status!!!
function montarTabela() {
    tabela1.forEach(obj => {
        if (obj.status == "PAGO") {
            stats = "btnPago"
        } else {
            stats = "btnPendente"
        }
            
        corpoTabelaDespesas.innerHTML += `
            <tr>
                <td>${obj.vencimento}</td>
                <td>${obj.despesa}</td>
                <td>${obj.valor}</td>
                <td><input type="button" class="botao ${stats}" value=${obj.status}></td>
            </tr>
        `
    })

}

addEventListener('load', montarTabela)

