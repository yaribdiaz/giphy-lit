import { LitElement, html, css, nothing } from 'lit';

export class AlertCopied extends LitElement {

  static get properties() {
    return {
      copied: { type: Boolean },
    };
  }

  constructor(){
    super();
    this.copied;
  }

  render() {
    return html`
      ${
        this.copied 
        ? html`<div class="copied-message"><p>GIF copiado al portapapeles</p></div>` 
        : nothing
      }
    `;
  }

  static styles = [
    css`
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
customElements.define('alert-copied', AlertCopied);
