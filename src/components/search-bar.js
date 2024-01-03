import { LitElement, html, css } from 'lit';

export class SearchBar extends LitElement {
  static get properties() {
    return {
      search: { type: String },
      _handleSetSearch: { type: Function },
      getGiphy: { type: Function }
    };
  }

  constructor(){
    super();
    this.search;
    this.handleSetSearch;
    this.getGiphy;
  }


  render() {
    return html`
      <form class="search" @submit=${this.getGiphy}>
          <input 
            type="text" 
            placeholder="Busca gifs" 
            class="input-search" 
            .search=${this.search} 
            @input=${this._handleSetSearch} 
          />
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
      /* medium */
      @media (min-width: 768px) {

      }
    `
  ];

}
customElements.define('search-bar', SearchBar);
