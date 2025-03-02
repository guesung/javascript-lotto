class Modal extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = `
      <div class="modal">
        ${this.innerHTML}
      </div>
      <div class="overlay" />
    `;
  }
  connectedCallback() {
    this.querySelector('dialog').showModal();
  }
}

customElements.define('my-modal', Modal);
