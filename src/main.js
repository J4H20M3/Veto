/**
 * @fileoverview Application entry point for the @vanillaspa/boilerplate.
 *
 * Boot sequence:
 * 1. The shared @vanillaspa/web-components runtime is imported.
 * 3. All custom `.sfc.html` files under `/src/components` are discovered with
 *    `import.meta.glob(...)` and registered.
 * 4. Optional runtime modules are loaded in parallel and exposed on `window`
 *    under their exported `name` value or alias.
 *
 * @module main
 */
import { registerComponents } from '@vanillaspa/web-components';
const myComponents = import.meta.glob('/src/components/**/*.sfc.html', { eager: true, query: '?raw' });
registerComponents(myComponents);

let root = 'home-page'; // the root element to replace body children with
await customElements.whenDefined(root);

const modulesToLoad = [
    { load: () => import('@vanillaspa/event-bus') },
    { load: () => import('@vanillaspa/sqlite-database') }
]

try {
    const results = await Promise.allSettled( // Promise.allSettled saves from blocking on error
        modulesToLoad.map(m => m.load())
    );

    results.forEach((result, index) => {
        if (result.status === 'rejected') {
            console.error(`Error loading module ${index}:`, result.reason);
            return;
        }

        const module = result.value;
        const name = modulesToLoad[index].name || module.name; // use defined alias OR exported name 
        if (name) { // OR ignore
            window[name] = Object.freeze({ ...module }); // pin to window
        }
    });
} catch (error) {
    console.error('Critical error during module initialization:', error);
} finally {
    document.body.replaceChildren(document.createElement(root));
};
