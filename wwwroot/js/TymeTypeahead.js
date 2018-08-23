// Custom Typeahead control
const template = document.createElement('template');

template.innerHTML = `
    <input/>
        <datalist>
        </datalist>`;

class TymeText extends HTMLElement {

    //Constructor ///////////////////////////////

    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.inputElement = this.shadowRoot.querySelector('input');
        this.dataList = this.shadowRoot.querySelector('datalist');

        this.addEventListener('keyup', function (e) {
            return this.keyDownEvent(e);
        });
    }

    // Attributes //////////////////////////////

    // Value Member: used in datalist.
    set valueMember(val) {
        this.setAttribute('valueMember', val);
    }

    get valueMember() {
        return this.getAttribute('valueMember');
    }

    set selectedId(val) {
        this.setAttribute('selectedId', val);
    }

    get selectedId() {
        return this.getAttribute('selectedId');
    }

    // Display Member: used on datalist.
    set displayMember(val) {
        this.setAttribute('displayMember', val);
    }

    get displayMember() {
        return this.getAttribute('displayMember');
    }

    // Source Uri: used to fetch the datalist options.
    set sourceUri(val) {
        this.setAttribute('sourceUri', val);
    }

    get sourceUri() {
        return this.getAttribute('sourceUri');
    }

    // Place Holder: used on the input element.
    set placeHolder(val) {
        this.setAttribute('placeHolder', val);
    }

    get placeHolder() {
        return this.getAttribute('placeHolder');
    }

    static get observedAttributes() {
        return ['valueMember', 'displayMember', 'sourceUri', 'placeHolder', 'listId', 'value'];
    }

    set listId(val) {
        this.setAttribute('listId', val);
    }

    get listId() {
        return this.getAttribute('listId');
    }

    //Methods //////////////////////////////

    connectedCallback() {
        var that = this;
        this.inputElement.placeholder = this.placeHolder;

        this.dataList.id = this.listId;
        this.inputElement.setAttribute('list', this.listId);

        this.inputElement.addEventListener('input', function (e) {
            var valueFoundInd = false;

            e.path.map(item => {
                if (item.localName === 'input') {
                    if (typeof item.list !== 'undefined' && item.list) {
                        if (typeof item.list.options !== 'undefined' && item.list.options) {
                            var arr = [];
                            [].push.apply(arr, item.list.options);

                            arr.map(option => {
                                if (option.value === item.value) {
                                    that.selectedId = option.getAttribute('data-value');
                                    valueFoundInd = true;
                                }
                            })
                        }
                    }
                }
            })

            if (!valueFoundInd) {
                that.selectedId = null;
            }
        })
    }

    loadDataList() {
        var loadList = {
            url: this.sourceUri,//TODO: Add parameters as this.inputElement.value :)
            type: 'GET',
            contentType: 'application/json',
            success: (data, textStatus, xhrRequest) => {
                this.resetDatalist();

                data.map(item => {
                    var option = document.createElement('option');
                    option.value = item[this.displayMember];
                    option.innerText = item.username;
                    option.setAttribute('data-value', item[this.valueMember]);

                    this.dataList.appendChild(option);
                });
            },
            error: (error) => {
                console.log('error : ', error);
            }
        };

        return $.ajax(loadList);
    };

    resetDatalist() {
        this.dataList.innerHTML = '';
    }

    keyDownEvent(e) {
        if (this.inputElement.value.length > 3) {
            this.loadDataList();
        } else {
            this.resetDatalist();
        }
    }
}

window.customElements.define('tyme-text', TymeText);