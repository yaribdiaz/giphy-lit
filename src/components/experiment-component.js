import { LitElement, html, css } from 'lit';

export class ExperimentComponent extends LitElement {

  static get properties() {
    return {
      object: { type: Object },
      saludo: { type: String },
      persons: { type: Array },
      myArray: { type: Array },
      myObject: { type: Object },
      name: { type: String, attribute: 'fullname' }
    }
  }
  constructor() {
    super()
    this.object = { myProp: 'Initial value' };
    this.saludo = "hola";
    this.persons = [];
    this.myArray = [];
    this.myObject = {};
  }

  render() {
    const obj = {prop1: 'hola'};
    console.log(obj.hasOwn('prop1'))

    return html`
      <h2>${this.object.myProp}</h2>
      <p>saludo: ${this.saludo}</p>
      <p>${this.persons.length}</p>
      <p>${this.myArray.length}</p>
`}
}
customElements.define('experiment-component', ExperimentComponent);
