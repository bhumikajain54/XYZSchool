import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Only split specifically heavy libraries to avoid conflict with React core
            
            // Document Generation (Heaviest)
            if (id.includes('xlsx') || id.includes('jspdf') || id.includes('html2canvas')) {
              return 'vendor-docs';
            }
            // Data Visualization
            if (id.includes('recharts') || id.includes('d3')) {
              return 'vendor-charts';
            }
            // Icons
            if (id.includes('react-icons') || id.includes('lucide-react')) {
              return 'vendor-icons';
            }
            // Utilities
            if (id.includes('date-fns') || id.includes('jspdf-autotable')) {
              return 'vendor-utils';
            }
            
            // Leave React and React-Router for default chunking to avoid context issues
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return null;
            }

            return 'vendor-libs';
          }
        },
      },
    },
  },
})
