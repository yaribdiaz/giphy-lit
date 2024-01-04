import { LitElement, html, css, nothing } from 'lit';

import { TitleColors } from './title-colors';
import { SearchBar } from './search-bar';
import { AlertCopied } from './alert-copied';
import { SearchHistory } from './search-history';

export class MyComponent extends LitElement {
  
  connectedCallback(){
    super.connectedCallback();
    this.getGiphy();
  }

  static properties = {
    message: {},
    api_url: {type: String},
    api_key: {type: String},
    giphys: { type: Array},
    search: {},
    copied: {type: Boolean},
    loading: {type: Boolean},
    history: { type: Array },
    searchFor: { type: String }
  }
  
  constructor(){
    super();
    this.message = false;
    this.api_key = 'gaUYQ6D45JX2X0iR9ZgpiJmylgunCC2I';
    this.giphys = [];
    this.search = 'cats';
    this.api_url = `http://api.giphy.com/v1/gifs/search?q=${this.search}&api_key=${this.api_key}&limit=20`;
    this.copied = false;
    this.loading = false;
    this.history = JSON.parse(localStorage.getItem('history')) ?? [];
    this.searchFor = '';
  }

  getGiphy = async () => {
    console.log('llamando API')
    this.searchFor = this.search;
    try {
      this.loading = true;
      this.giphys = [];
      const response = await fetch(`http://api.giphy.com/v1/gifs/search?q=${this.search}&api_key=${this.api_key}&limit=20`);
      const result= await response.json();
      this.giphys = result.data;
      this.loading = false;
    } catch (error) {
      console.log(error)
    }
  }

  copyLink = (url) => {
    navigator.clipboard.writeText(url)
    this.showMessageCopied()
    console.log('copiando al portapapeles', url)
  }

  _handleSetSearch = (event) => {
    this.search = event.target.value;
  }

  _handleSetHistory = () => {
    let arrayHistory = [...this.history];
    arrayHistory.unshift(this.search);
    if (arrayHistory.length > 13){
      arrayHistory.pop();
    }
    this.history = arrayHistory;
    localStorage.setItem('history', JSON.stringify(arrayHistory));
    console.log(this.history);
  }

  setHistoryInSearch = (historyItem) => {
    this.search = historyItem;
    this.searchFor = historyItem;
    this.getGiphy();
  }

  deleteFromHistory = (historyItem) => {
    this.history = this.history.filter(i => i !== historyItem)
    localStorage.setItem('history', JSON.stringify(this.history));
  }

  showMessageCopied = () => {
    this.copied = true;
    setTimeout(() => {
      this.copied = false;
    }, 2000);
  }

  showGiphys(img){
    return html`
      <div class="gif-card">
        <div class="copy-container">
          <div class="copy-logo" @click=${() => this.copyLink(img?.embed_url)}>
            <svg  xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-copy" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z" /><path d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1" /></svg>
          </div>
        </div>
        <img
          src="${img?.images?.downsized_medium['url']}" 
          class="gif-image"
          alt="${img.title}"
        />
        <p>${img.title}</p>
      </div>
    `
  }


  render() {
    
    return html`
      <title-colors></title-colors>
      <search-bar ._handleSetHistory=${this._handleSetHistory} .getGiphy=${this.getGiphy} .search=${this.search} ._handleSetSearch=${this._handleSetSearch.bind(this)}></search-bar>
      <div class="searching-for">
        ${ this.giphys.length !==0 ? html`<p>Resultados para <span>${this.searchFor}</span></p>` : nothing }
      </div>
      <search-history .history=${this.history} .setHistoryInSearch=${this.setHistoryInSearch} .deleteFromHistory=${this.deleteFromHistory}></search-history>
      <div class="gif-container">
        
        ${
          !this.loading
          ?(
            html`<div class="grid-container">
              ${
                this.giphys.length !== 0
                ? this.giphys.map((gif) => this.showGiphys(gif))
                : html`<h3 class="no-results">No hay resultados para ${this.searchFor}</h3>`
              }
            </div>`
          ) 
          : (
            html`<p>Cargando...</p>`
          )
        }

      </div>

      <alert-copied .copied=${this.copied}></alert-copied>
    `;
  }



  static styles = [
    css`
      .searching-for{
        text-align: center;
      }
      .searching-for span{
        font-weight: 700;
      }
      .no-results{
        text-align: center;
        margin-top: 2rem;
      }
      .gif-container{
        display: flex;
        justify-content: center;
        display: relative;
      }
      .grid-container{
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 20px;
        margin-top: 2rem;
        justify-content: center;
      }
      .gif-card{
        display: flex;
        width: 150px;
        flex-direction: column;
        text-align: center;
        color: black;
        border-radius: 10px;
      }
      .gif-image{
        width: 150px;
        height: 170px;
        border-radius: 10px;
      }
      .copy-container{
        display: flex;
        justify-content: flex-end;
        z-index: 10;
        margin-bottom: -45px;
        margin-right: 5px;
      }
      .copy-logo{
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px;
        width: 20px;
        height: 20px;
        background-color: #9ca3afab;
        border-radius: 100%;
        cursor: pointer;
        transition-property: background-color;
        transition-duration: 270ms;
      }
      .copy-logo:hover{
        background-color: white;
      }
      /* medium */
      @media (min-width: 768px) { 
        .grid-container{
          grid-template-columns: repeat(3, 1fr);
        }
        .gif-image{
          width: 250px;
          height: 180px;
        }
        .gif-card{
          width: 250px;
        }
      }
      /* large */
      @media (min-width: 1024px) {
        .grid-container{
          grid-template-columns: repeat(3, 1fr);
        }
        .gif-image{
          width: 320px;
          height: 260px;
        }
        .gif-card{
          width: 320px;
        }
      }
    `
  ];

}
customElements.define('my-component', MyComponent);

