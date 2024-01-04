import { LitElement, html, css } from 'lit';
import { map } from 'lit/directives/map.js'

export class SearchHistory extends LitElement {

  static get properties() {
    return {
      history: { type: Array },
      setHistoryInSearch: { type: Function },
      deleteFromHistory: { type: Function }
    };
  }
  
  render() {
    return html`
      <aside>
        <div class="container">
          <div class="history">
            <h3>Historial</h3
            <div>
              <ul>
                ${
                  this.history.map( (i) => {
                    return html`
                      <li @click=${() => this.setHistoryInSearch(i)}>
                        <p>
                          ${i}
                        </p>
                        <button 
                          type="button" 
                          @click=${(e) => {
                            e.stopPropagation();
                            this.deleteFromHistory(i);
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="15" height="15" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
                        </button>
                      </li>
                    ` } )
                }
              </ul>
            </div>
          </div>
        </div>
      </aside>
    `;
  }

  static styles = [
    css`
      aside{
        height: 100vh;
        position: absolute;
        left: 0;
        width: 230px;
      }
      .container {
        position: fixed;
        background-color: #2d2d2d;
        display: flex;
        flex: 1;
        height: 50%;
        width: 210px;
        border-radius: 0px 20px 20px 0;
        padding: 10px 7px;
        box-shadow: 3px 8px 10px -2px #2d2d2d, 3px 2px 4px -2px rgb(0 0 0 / 0.1);
      }
      .history{
        position: relative;
        width: 210px;
        overflow: hidden;
      }
      .history h3{
        text-align: center;
        color: white;
        font-weight: 700;
        letter-spacing: 1px;
      }
      ul{
        all: unset;
      }
      li{
        all: unset;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        flex:1;
        background-color: white;
        padding: 0 8px;
        border-radius: 4px;
        margin-top: 5px;
        font-weight: 500;
        transition-property: background-color;
        transition-duration: 240ms;
      }
      li:hover{
        background-color: #a3e635;
        color: #3f6212;
        cursor: pointer;
        p{
        transform: scale(1.03);
        }
      }
      li p{
        all:unset;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding: 5px 0;
      }
      button{
        all: unset;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 4px;
        border-radius: 15px;
      }
      button:hover{
        background-color: #ffffffbf;
        cursor: pointer;
      }
    `
  ];

}
customElements.define('search-history', SearchHistory);
