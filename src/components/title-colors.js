import { LitElement, html, css } from 'lit';
import { classMap } from 'lit/directives/class-map.js'

export class TitleColors extends LitElement {
  
  static properties = {
      headerArray: { type: Array },
      letter: { type: String },
      indice: { type: Number },
  }

  constructor() {
    super();
    this.headerArray = ['G','I','P','H','Y'];
    this.letter;
    this.indice = 0;
    // Asignar el valor del intervalo a la propiedad id
    this.id = setInterval(this.incrementarIndice.bind(this), 800);
  }

  // Definir el método para incrementar el indice
  incrementarIndice() {
    let currentLetter = this.headerArray[this.indice]
    this.indice++;
    this.letter = currentLetter;
    // Si el índice llega al final del arreglo, se detiene el loop
    if (this.indice == this.headerArray.length) {
      this.indice = 0
    }
    // Solicitar que se actualice el elemento
    this.requestUpdate();
  }

  // Detener el intervalo cuando el elemento se desconecta
  disconnectedCallback() {
    super.disconnectedCallback();
    clearInterval(this.id);
  }

  render() {
    return html`
      <div class="title">
        <p class=${this.letter === 'G' && 'active purple'}>G</p>
        <p class=${this.letter === 'I' && 'active violet'}>I</p>
        <p class=${this.letter === 'P' && 'active blue'}>P</p>
        <p class=${this.letter === 'H' && 'active green'}>H</p>
        <p class=${this.letter === 'Y' && 'active yellow'}>Y</p>
      </div>
    `;
  }


  static styles = [
    css`
      .title{
        all: unset;
        display: flex;
        flex-direction: row;
        justify-content: center;
        font-size: 3.2rem;
        font-weight: 700;
      }
      .title p{
        transition-property: all;
        transition-duration: 500ms;
        letter-spacing: 3px;
      }
      .active {
        transform: scale(1.04);
        margin-top: 40px;
        letter-spacing: 6px;
      }
      .purple {
        color: #a855f7;
      }
      .violet {
        color: #6366f1;
      }
      .blue {
        color: #3b82f6;
      }
      .green {
        color: #84cc16;
      }
      .yellow {
        color: #eab308;
      }
    `
  ];

}
customElements.define('title-colors', TitleColors);
