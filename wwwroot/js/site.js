// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your Javascript code.

class TypeAhead extends HTMLElement {

    // A getter/setter for an open property.
    get open() {
        return this.hasAttribute('open');
    }

    set open(val) {
        // Reflect the value of the open property as an HTML attribute.
        if (val) {
            this.setAttribute('open', '');
        } else {
            this.removeAttribute('open');
        }
        this.toggleControl();
    }

    // A getter/setter for a disabled property.
    get disabled() {
        return this.hasAttribute('disabled');
    }

    set disabled(val) {
        // Reflect the value of the disabled property as an HTML attribute.
        if (val) {
            this.setAttribute('disabled', '');
        } else {
            this.removeAttribute('disabled');
        }
    }

    // Material design ripple animation.
    drawRipple(x, y) {
        let div = document.createElement('div');
        div.classList.add('ripple');
        this.appendChild(div);
        div.style.top = `${y - div.clientHeight / 2}px`;
        div.style.left = `${x - div.clientWidth / 2}px`;
        div.style.backgroundColor = 'currentColor';
        div.classList.add('run');
        div.addEventListener('transitionend', e => div.remove());
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
        if (this.disabled) {
            this.setAttribute('tabindex', '-1');
            this.setAttribute('aria-disabled', 'true');
        } else {
            this.setAttribute('tabindex', '0');
            this.setAttribute('aria-disabled', 'false');
        }
    }

    // Can define constructor arguments if you wish.
    constructor() {
        // If you define a constructor, always call super() first!
        // This is specific to CE and required by the spec.
        super();

        // Setup a click listener on <app-drawer> itself.
        //this.addEventListener('click', e => {
        //    // Don't toggle the drawer if it's disabled.
        //    if (this.disabled) {
        //        return;
        //    }
        //    this.toggleControl();
        //});

        //this.addEventListener('click', e => this.drawRipple(e.offsetX, e.offsetY));
    }

    toggleControl() {

    }
}



class PlasticButton extends HTMLButtonElement {
    constructor() {
        super();

        this.addEventListener('click', () => {
            // Draw some fancy animation effects!
            alert('boo you too!');
        });
    }
}


// custom control


customElements.define("plastic-button", PlasticButton, { extends: "button" });


var form = document.forms[0],
    submit = document.getElementById('submit'),
    input = document.getElementById('username');

input.addEventListener('invalid', function (e) {
    if (input.validity.valueMissing) {
        e.target.setCustomValidity("Please create a username");
    } else if (!input.validity.valid) {
        e.target.setCustomValidity("This is not a valid username");
    }
    // to avoid the 'sticky' invlaid problem when resuming typing after getting a custom invalid message
    input.addEventListener('input', function (e) {
        e.target.setCustomValidity('');
    });
}, false);

class MyTitle extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <style>
          h1 {
            font-size: 2.5rem;
            color: hotpink;
            font-family: monospace;
            text-align: center;
            text-decoration: pink solid underline;
            text-decoration-skip: ink;
          }
        </style>
        <h1>Hello Alligator!</h1>
      `;
    }
}
window.customElements.define('my-title', MyTitle);

