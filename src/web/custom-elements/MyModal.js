class MyModal extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = `
      <div class="modal">
        ${this.innerHTML}
      </div>
      <div class="overlay" />
    `;
  }
}

customElements.define('my-modal', MyModal);
