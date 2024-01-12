import { LitElement, html, css, nothing } from 'lit';

export class ModalComponent extends LitElement {

  static get properties() {
    return {
      isActive: { type: Boolean },
      message: { type: String },
    };
  }

  constructor(){
    super();
    this.isActive = true;
    this.message = "¿Estás seguro que deseas eliminarlo?"
  }

  closeModal(){
    this.isActive = !this.isActive;
  }

  render() {
    return html`
      ${
        this.isActive 
        ? (
          html`
          <div class="modal-container">
            <div class="modal">
              <div class="close-container">
                <button class="close" @click=${this.closeModal}>
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
                </button>
              </div>
              <div class="message">
                <p>${this.message}</p>
              </div>
              <div class="buttons">
                <button class="delete">
                  Eliminar
                </button>
                <button class="cancel">
                  Cancelar
                </button>
              </div>
            </div>
          </div>
          `
        ) : nothing
      }
    `;
  }

  static styles = [
    css`
      .modal-container{
        all: unset;
        left: 0;
        height: 100vh;
        width: 100vw;
        background-color: #000000b9;
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 20;
      }
      .modal{
        width: 32rem;
        height: 10rem;
        background-color: #f1f1f1;
        padding: 1rem;
        border-radius: 17px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      .close-container{
        display: flex;
        justify-content: end;
        
      }
      .close{
        all:unset;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 15px;
        cursor: pointer;
        transition-property: all;
        transition-duration: 350ms;
      }
      .close:hover{
        transform: scale(1.10);
        background-color: #00000030;
      }
      .message{
        font-size: 1.2rem;
        font-weight: 600;
        text-align: center;
      }
      .buttons{
        display: flex;
        justify-content: space-around;
        gap: 3px;
      }
      .delete{
        all:unset;
        height: 2rem;
        display: flex;
        flex:1;
        justify-content: center;
        align-items: center;
        background-color: #e11d48;
        border-radius: 6px;
        font-weight: 800;
        color: white;
        cursor: pointer;
        transition-property: all;
        transition-duration: 300ms;
      }
      .delete:hover{
        background-color: #b91c1c;
        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
      }
      .cancel{
        all:unset;
        width: 1/2;
        display: flex;
        flex:1;
        justify-content: center;
        align-items: center;
        background-color: #111827;
        border-radius: 6px;
        font-weight: 800;
        color: white;
        cursor: pointer;
        transition-property: all;
        transition-duration: 300ms;
      }
      .cancel:hover{
        background-color: #374151;
        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
      }
    `
  ];

}
customElements.define('modal-component', ModalComponent);
