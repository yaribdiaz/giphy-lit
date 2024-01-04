import { LitElement, html, css } from 'lit';

export class SearchBar extends LitElement {
  static get properties() {
    return {
      search: { type: String },
      _handleSetSearch: { type: Function },
      getGiphy: { type: Function },
      _handleSetHistory: { type: Function }
    };
  }

  constructor(){
    super();
    this.search;
    this.handleSetSearch;
    this.getGiphy;
    this._handleSetHistory;
  }


  render() {
    return html`
      <form 
        class="search" 
        @submit=${(e) => {
          e.preventDefault();
          console.log('submit')
          this.getGiphy();
          this._handleSetHistory();
        }}
      >
          <input 
            type="text" 
            placeholder="Busca gifs" 
            class="input-search" 
            .search=${this.search} 
            @input=${this._handleSetSearch}
          />
          <div class="clear">
            <button 
              class="clear-button" 
              type="button"
              @click=${() => {
                
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="15" height="15" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
            </button>
          </div>
          <button class="button" type="submit" > 
            Buscar
          </button>
      </form>
    `;
  }


  static styles = [
    css`
      .search{
        display: flex;
        flex: 1;
        flex-direction: row;
        justify-content: center;
        padding-inline: 10px; 
      }
      .input-search {
        all: unset;
        height: 30px;
        width: 100%;
        max-width: 760px;
        min-width: 160px;
        border: 2px solid orange;
        border-right: 0px;
        border-radius: 7px 0 0 7px;
        padding: 0 5px;
      }
      .button {
        all: unset;
        flex-direction: row;
        height: 30px;
        width: 6rem;
        background-color: orange;
        padding: 2px 15px;
        border-radius: 0px 10px 10px 0px;
        color: white;
        font-size: 16px;
        text-align: center;
        font-weight: 700;
        cursor: pointer;
      }
      .button:hover{
        background-color: red;
        transition-property: all;
        transition-duration: 350ms;
      }
      .clear{
        border-block: 2px solid orange;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 8px;
      }
      .clear-button{
        all: unset;
        padding: 4px;
        height: 15px;
        width: 15px;
        background-color: #525252;
        border-radius: 25px;
        cursor: pointer;
        transition-property: background-color;
        transition-duration: 250ms;
      }
      .clear-button:hover{
        background-color: #ef4444;
      }
      .clear-button svg{
        color: white;
      }
      /* medium */
      @media (min-width: 768px) {

      }
    `
  ];

}
customElements.define('search-bar', SearchBar);
