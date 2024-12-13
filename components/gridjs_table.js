import { Grid, html } from "gridjs";
import { ptBR } from "gridjs/l10n";
import { h } from "gridjs";
import { PluginPosition } from "gridjs";
import { RowSelection } from "gridjs/plugins/selection";
// import "gridjs/dist/theme/mermaid.css";


export default (endpoint, container) => ({
    grid: null,
    container: container,
    endpoint: endpoint,
    rows: 'data',
    table_title: 'titulo',
    headers: [],
    search: false,
    filteredRows: [],
    TableTitlePlugin() {
        return h('h1', { 
            class: 'order-1 text-base font-semibold py-2 text-neutral-70 grow' 
        }, 'Your Table Title');
    },
    NewButtonPlugin() {
        return h('button', { 
            class: 'order-6 text-base text-white !bg-primary rounded w-11 add-item-btn'
        }, '');
    },
    ExportButtonPlugin() {
        return h('button', { 
            class: 'order-5 text-base !border !border-gray-300 text-primary !bg-white rounded w-11 export-item-btn'
        }, '');
    },
    init() {
        this.grid = new Grid({
          // height: '500px',
          // fixedHeader: true,
            server: {
                url: 'https://swapi.dev/api/people/',
                then: data => data.results.map(person => [person.name, person.gender, person.birth_year]),
                total: data => data.count
              },
            columns: [
              {
                id: 'selectRow',
                name: 'Select',
                data: () => true, 
                plugin: {
                  component: RowSelection,
                },
                sort: false,
              },
              "Name", 
              {
                name:"Gender",
                formatter: (cell, row) => html(`<span class="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">${cell}</span>`)
              }, 
              "Phone Number"
            ],
            pagination: {
                server: {
                  url: (prev, page) => {
                    return prev.includes('?') 
                        ? `${prev}&page=${page+1}` 
                        : `${prev}?page=${page+1}`;
                }
                }
              },
            search: {
              server: {
              url: (prev, keyword) => {
                return prev.includes('?') 
                    ? `${prev}&search=${keyword}` 
                    : `${prev}?search=${keyword}`;
            }
              }
            },
            sort: true,
            className: {
                container: 'card p-0',
            //     table : 'w-full table-auto',
                tr : 'odd:bg-neutral-10 even:bg-white',
                td: 'text-center text-neutral-60 p-2 bg-transparent border-0',
                th : '!bg-white py-2 font-medium text-sm text-neutral-70 !border-0 text-center',
                header : 'flex gap-2 m-0 py-2 px-4',
                footer : 'border-0 border-t',
            //     thead : 'teste',
            //     tbody : 'teste',
                search : 'order-2',
            //     sort : 'teste',
            //     pagination : 'teste',
                // paginationSummary : '!float-right',
            //     paginationButton : 'teste',
            //     paginationButtonNext : 'teste',
            //     paginationButtonCurrent : 'teste',
            //     paginationButtonPrev : 'teste',
            //     loading : 'teste',
            //     notfound : 'teste',
            //     error: 'teste',
            },

            plugins: [
              {
                id: 'title',
                component: this.TableTitlePlugin,
                position: PluginPosition.Header,
                order: 1
              },
              {
                id: 'add',
                component: this.NewButtonPlugin,
                position: PluginPosition.Header,
                order: 6
              },
              {
                id: 'export',
                component: this.ExportButtonPlugin,
                position: PluginPosition.Header,
                order: 5
              }
            ],
            language: {
              ...ptBR,
              search: {
                ...ptBR.search,
                placeholder: 'Buscar'
              },
              pagination: {
                ...ptBR.pagination,
                previous: '<',
                next: '>'
              }
            }
          });
       
      console.log(this.grid);
    //   this.headers = Object.keys(this.rows[0]);
      this.grid.render(container);
      this.grid.on('ready', () => {
        // find the plugin with the give plugin ID
        const checkboxPlugin = grid.config.plugin.get('selectRow');
        // read the selected rows from the plugin's store
        console.log('selected rows:', checkboxPlugin.props.store.state);
      })
    },
    
  })