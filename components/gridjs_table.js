import { Grid } from "gridjs";
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
    MyPlugin() {
        return h('h1', { 
            class: 'text-xl font-bold mb-4' 
        }, 'Your Table Title');
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
              "Email", 
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
            // className: {
            //     container: 'card',
            //     table : 'w-full table-auto',
            //     tr : 'odd:bg-neutral-10 even:bg-white',
            //     td: 'text-center text-neutral-60 p-2',
            //     th : 'bg-white py-2 font-medium text-sm text-neutral-70',
            //     header : 'header',
            //     footer : 'teste',
            //     thead : 'teste',
            //     tbody : 'teste',
            //     search : 'teste',
            //     sort : 'teste',
            //     pagination : 'teste',
            //     paginationSummary : 'teste',
            //     paginationButton : 'teste',
            //     paginationButtonNext : 'teste',
            //     paginationButtonCurrent : 'teste',
            //     paginationButtonPrev : 'teste',
            //     loading : 'teste',
            //     notfound : 'teste',
            //     error: 'teste',
            // },

            plugins: [
              {
                id: 'title',
                component: this.MyPlugin,
                position: PluginPosition.Header,
                order: 1
              }
            ],
            language: ptBR
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