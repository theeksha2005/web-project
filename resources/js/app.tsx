import '../css/app.css';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';
import { Toaster } from 'react-hot-toast';
import React from 'react';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(
            <>
                <App {...props} />
                <Toaster
                    position="top-center"
                    toastOptions={{ duration: 5000 }}
                    containerStyle={{
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        position: 'fixed',
                    }}
                />
            </>
        );
    },
    progress: {
        color: '#4B5563',
    },
});

initializeTheme();
