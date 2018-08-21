// Custom Typeahead control

const template = document.createElement('template');

template.innerHTML = `
    <input list="mylist" placeholder=""/>
        <datalist id="mylist">
        </datalist>`;

class TymeText extends HTMLElement {

    //Constructor

    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.inputElement = this.shadowRoot.querySelector('input');
        this.dataList = this.shadowRoot.querySelector('datalist');

        this.addEventListener('keyup', function (e) {
            return this.keyDownEvent(e);
        });

        // to set a default value :)
        //var option = document.createElement('option');
        //option.value = 'Please Select';
        //this.dataList.appendChild(option);        
        //this.inputElement.value = option.value;
    }

    // Attributes

    // A setter for Source.
    set source(val) {
        this.setAttribute('source', val);
    }

    // A getter for Source.
    get source() {
        return this.getAttribute('source');
    }

    // A setter for Value Member.
    set valueMember(val) {
        this.setAttribute('valueMember', val);
    }

    // A getter for Value Member.
    get valueMember() {
        return this.getAttribute('valueMember');
    }

    // A setter for Display Member.
    set displayMember(val) {
        this.setAttribute('displayMember', val);
    }

    // A getter for Display Member.
    get displayMember() {
        return this.getAttribute('displayMember');
    }

    // A setter for Ajax Uri. The url used to fetch the datalist options.
    set ajaxUri(val) {
        this.setAttribute('ajaxUri', val);
    }

    // A getter for Ajax Uri. 
    get ajaxUri() {
        return this.getAttribute('ajaxUri');
    }

    // A setter for Ajax Uri. The url used to fetch the datalist options.
    set placeHolder(val) {
        this.setAttribute('placeHolder', val);
    }

    // A getter for Ajax Uri. 
    get placeHolder() {
        return this.getAttribute('placeHolder');
    }

    static get observedAttributes() {
        return ['source', 'valueMember', 'displayMember', 'ajaxUri', 'placeHolder'];
    }

    //Methods

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'source':
                console.log(`Source changed from ${oldValue} to ${newValue}`);
                break;
            case 'displayMember':
                console.log(`Display Member changed from ${oldValue} to ${newValue}`);
                break;
            case 'valueMember':
                console.log(`Value Member changed from ${oldValue} to ${newValue}`);
                break;
            case 'ajaxUri':
                console.log(`Ajax Uri changed from ${oldValue} to ${newValue}`);
                break;
            case 'placeHolder':
                console.log(`Place Holder changed from ${oldValue} to ${newValue}`);
                break;
        }
    }

    connectedCallback() {
        console.log('souce (on callback)', this.source);
        console.log('display (on callback)', this.displayMember);
        console.log('value (on callback)', this.valueMember);
        console.log('ajax uri (on callback)', this.ajaxUri);

        this.inputElement.placeholder = this.placeHolder;
    }

    keyDownEvent(e) {
        console.log('event', e);
        if (this.inputElement.value.length > 3) {
            console.log('inputElement value', this.inputElement.value);
        }
    }
}

window.customElements.define('tyme-text', TymeText);