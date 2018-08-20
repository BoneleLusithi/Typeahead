
class TymeText extends HTMLInputElement {

    constructor() {
        super();

        this.addEventListener('keyup', function (e) {
            return this.keyDownEvent(e);
        });
    }

    static get observedAttributes() {
        return ['source'];
    }

    // A getter/setter for property.
    get source() {
        return this.getAttribute('source');
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'source':
                console.log(`Source changed from ${oldValue} to ${newValue}`);
                break;
        }
    }

    set source(val) {
        // Reflect the value of the open property as an HTML attribute.
        this.setAttribute('source', val);
    }

    dropDownValues() {
        alert(this.source);
    }

    keyDownEvent(e) {
        var currentValue = e.target.value;
        if (e.target.value.length > 2) {
            alert(e.target.value);
        }
    }
}

customElements.define('tyme-input', TymeText, { extends: 'input' });