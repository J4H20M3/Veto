- npm create [vite@latest](https://vite.dev/)

Veto Vanilla JavaScript Yes

---

- cd Veto

- npm install [@vitejs/plugin-basic-ssl](https://www.npmjs.com/package/@vitejs/plugin-basic-ssl)

---

# vite.config.js

    import {defineConfig} from 'vite';
    import basicSsl from '@vitejs/plugin-basic-ssl';
    
    export default defineConfig({
        html: {
            cspNonce : "___CSP_NONCE___"
        },
        plugins: [
            basicSsl()
        ]
    })

[html.cspNonce](https://vite.dev/config/shared-options#html-cspnonce)

Type: string

Related: Content Security Policy (CSP)

> A nonce value placeholder that will be used when generating script / style tags. Setting this value will also generate a meta tag with nonce value.

# [Content Security Policy (CSP)](https://vite.dev/guide/features#content-security-policy-csp)

To deploy CSP, certain directives or configs must be set due to Vite's internals.

'nonce-{RANDOM}'

When html.cspNonce is set, Vite adds a nonce attribute with the specified value to any <script> and <style> tags, as well as <link> tags for stylesheets and module preloading.

Additionally, when this option is set, Vite will inject a meta tag (<meta property="csp-nonce" nonce="PLACEHOLDER" />).

The nonce value of a meta tag with property="csp-nonce" will be used by Vite whenever necessary during both dev and after build.

> WARNING
>
> Ensure that you replace the placeholder with a unique value for each request. This is important to prevent bypassing a resource's policy, which can otherwise be easily done.

# src/main.js

    import './style.css'
    import javascriptLogo from './assets/javascript.svg'

    document.querySelector('#app').innerHTML = `
    <section id="center">
        <div class="hero">
            <img src="${javascriptLogo}" alt="JavaScript logo"/>
        </div>
        <div>
            <h1>Get started</h1>
            <p>Edit <code>src/main.js</code> and save to test <code>HMR</code></p>
        </div>
    </section>
    `

# npm install @vanillaspa/web-components

# npm install @vanillaspa/event-bus

# npm install @vanillaspa/sqlite-database


