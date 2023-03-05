import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('search-param')
export class SearchParam extends LitElement {
    static styles = css`
    #key {
        width: 150px;
    }

    #value {
        width: 300px;
    }
    `;

    @property()
    key: string;

    @property()
    value: string;

    protected render() {
        return html`
        <input id="key"
            value="${this.key}"
            @input="${this.handleInput}">
        <input id="value"
            value="${this.value}"
            @input="${this.handleInput}">
        <button @click="${this.handleCopyClick}">Copy</button>
        `;
    }

    handleInput(e: InputEvent) {
        const input = e.target as HTMLInputElement;
        const event = new Event('input');

        this[input.id] = input.value;
        this.dispatchEvent(event);
    }

    handleCopyClick() {
        if(navigator.clipboard) {
            const value = `${this.key}=${this.value}`;
            navigator.clipboard.writeText(value);
        }
    }
}