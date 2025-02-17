import { html } from "gridjs";
export const TABLE_CONFIGS = {
    'orders': {
        verboseName: 'Pedidos',
        columns: [
            {
                id: 'ID',
              name: html(`<input class="rounded" type="checkbox" value="All" x-model="selectedAll"> <span class="text-sm text-gray-500">ID</span>`),
              sort: false,
              formatter: (cell, row) => {
                // console.log(row)
                const input = `<input class="rounded" type="checkbox" value="${cell}" x-model="selectedRows"> <span class="text-sm text-gray-500">${cell}</span>`;
                return html(input);
            }
            },
            // "ID",
            "Código",
            {
                name: "Data do Pedido",
                formatter: (cell) => new Date(`${cell}T12:00:00Z`).toLocaleDateString('pt-BR')
            },
            "Arquiteto",
            {
                name: "Total",
                formatter: (cell) => `R$ ${cell}`
            },
            {
                name: "Status",
                formatter: (cell) => {
                    const styles = {
                        'Concluido': 'bg-green-50 text-green-700 ring-green-700/10',
                        'Pendente': 'bg-yellow-50 text-yellow-700 ring-yellow-700/10',
                        'Cancelado': 'bg-gray-50 text-gray-700 ring-gray-700/10'
                    };

                    const statusStyle = styles[cell] || styles['Pendente']; // Default to Pendente style if unknown status

                    return html(`<span class="inline-flex items-center rounded-md ${statusStyle} px-2 py-1 text-xs font-medium ring-1 ring-inset">${cell}</span>`);
                }
            },
            {
                name: "Ações",
                sort: false,
                formatter: (cell, row) => {
                    // console.log(row)
                    const button = `
                    <button @click="console.log(${row.cells[0].data})" 
                    class="text-neutral text-sm"> 
                    <span x-icon:view></span>
                    </button>
                    <button @click="console.log(${row.cells[0].data})" 
                    class="text-neutral border-0 text-sm"> 
                    <span x-icon:edit></span>
                    </button>
                    `;
                    return html(button);
                }
            }
        ],
        serverConfig: {
            dataMapping: order => [
                order.id,
                order.cod_pedido,
                order.data_do_pedido,
                order.arquiteto,
                order.total,
                order.status
            ],
            sortColumns: ["id", "cod_pedido", "data_do_pedido", "arquiteto", "total", "status"]
        },
        plugins: [],
    },
    // Add more table configurations as needed

};