import { LitElement, html, css, nothing } from 'lit';

export class MyComponent extends LitElement {
  
  static properties = {
    message: {},
    api_url: {type: String},
    api_key: {type: String},
    giphys: { type: Array},
    search: {},
    copied: {type: Boolean}
  }
  
  constructor(){
    super();
    this.message = false;
    this.api_key = 'gaUYQ6D45JX2X0iR9ZgpiJmylgunCC2I';
    this.giphys = [];
    this.search = 'cats';
    this.api_url = `http://api.giphy.com/v1/gifs/search?q=${this.search}&api_key=${this.api_key}&limit=20`;
    this.copied = false;
  }

  getGiphy = async (e) => {
    e.preventDefault();
    try {
      // console.log(`http://api.giphy.com/v1/gifs/search?q=${this.search}&api_key=${this.api_key}&limit=20`)
      const response = await fetch(`http://api.giphy.com/v1/gifs/search?q=${this.search}&api_key=${this.api_key}&limit=20`);
       const result= await response.json();
       this.giphys = result.data;
      // console.log(result.data)
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

  showMessageCopied = () => {
    this.copied = true;
    setTimeout(() => {
      this.copied = false;
    }, 2000);
  }

  render() {
    
    return html`
      <p class="title"> GIPHY</p>

      <form class="search" @submit=${this.getGiphy}>
          <input 
            type="text" 
            placeholder="Busca gifs" 
            class="input-search" 
            .search=${this.search} 
            @input=${this._handleSetSearch} 
          />
          <button class="button" type="submit" > 
            Get GIPHY's 
          </button>
        </div>
      </form>

      <div class="searching-for">
        ${ this.giphys.length !==0 ? html`<p>Resultados para <span>${this.search}</span></p>` : nothing}
      </div>

      <div class="gif-container">
        <div class="grid-container">
        ${
          this.giphys.length !== 0
          ? this.giphys.map((gif) => this.showGiphys(gif))
          : html`<h3 class="no-results">No hay resultados aún</h3>`
        }
        </div>
      </div>
      ${
        this.copied 
        ? html`<div class="copied-message"><p>GIF copiado al portapapeles</p></div>` 
        : nothing
      }

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
      .search{
        display: flex;
        flex: 1;
        justify-content: center;
      }
      .input-search {
        all: unset;
        height: 30px;
        width: 60%;
        max-width: 760px;
        min-width: 360px;
        border: 2px solid orange;
        border-radius: 7px 0 0 7px;
        padding: 0 5px;
      }
      .button {
        all: unset;
        height: 30px;
        width: 6rem;
        background-color: orange;
        padding: 2px 15px;
        border-radius: 0px 10px 10px 0px;
        color: white;
        font-size: 15px;
        font-weight: 700;
        cursor: pointer;
      }
      .button:hover{
        background-color: red;
        transition-property: all;
        transition-duration: 350ms;
      }
      .title{
        font-size: 2.8rem;
        font-weight: 700;
        text-align: center;
      }
      .no-results{
        text-align: center;
        margin-top: 2rem;
      }
      .gif-container{
        display: flex;
        justify-content: center;
      }
      .grid-container{
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 20px;
        margin-top: 2rem;
      }
      .gif-card{
        display: flex;
        width: 320px;
        flex-direction: column;
        text-align: center;
        color: black;
        border-radius: 10px;
      }
      .gif-image{
        width: 320px;
        height: 260px;
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
        background-color: #9ca3af;
        border-radius: 100%;
        cursor: pointer;
        transition-property: background-color;
        transition-duration: 270ms;
      }
      .copy-logo:hover{
        background-color: white;
      }
      .copied-message{
        position: sticky;
        z-index: 10;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .copied-message p{
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        padding: 10px 25px;
        background-color: #65a30d;
        font-size: 20px;
        font-weight: 400;
        color: white;
        border-radius: 10px;
        box-shadow: 2px 2px 20px #65a30d;
      }
    `
  ];

}
customElements.define('my-component', MyComponent);

