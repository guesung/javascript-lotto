const template = document.createElement('template');
template.innerHTML = `
  <style>

  </style>
  <div>
    hello
  </div>
`;

class Modal extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });
    shadow.append(template.content.cloneNode(true));
    this.title = shadow.querySelector('');

    this.shadowRoot;

    this.innerHTML;
  }
}

customElements.define('modal', Modal);
