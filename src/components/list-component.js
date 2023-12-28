import { LitElement, html, css } from 'lit';
import { classMap } from 'lit/directives/class-map';

export class ListComponent extends LitElement {

  static styles = 
    css`
      :host {
        display: block;
      }
      .iterator {

      }
    `;

  render() {
    return html`
      <p class=${classMap(this.styles)}>
        ${(function* (){
          for(let i = 1; i < 4; i++) yield i;
        })()}
      </p>
    `;
  }
}
customElements.define('list-component', ListComponent);
