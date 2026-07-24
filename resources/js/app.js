import { createInertiaApp, router } from '@inertiajs/react'

createInertiaApp({
    strictMode: true, 
    pages: './Pages',
    outlet: router,
})