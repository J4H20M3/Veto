import {defineConfig} from 'vite';
import basicSsl from '@vitejs/plugin-basic-ssl';

export default defineConfig({
    html: {
        cspNonce : "PLACEHOLDER"
    },
    plugins: [
        basicSsl()
    ]
})
