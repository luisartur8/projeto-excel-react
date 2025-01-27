import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@assets': '/src/assets',
      '@DragModal': '/src/components/DragModal',
      '@theme': '/src/config/',
      '@utils': '/src/components/utils',
      '@CarregaPlanilha': '/src/components/CarregaPlanilha',
      '@ButtonsGerenciador': '/src/components/GerenciadorPlanilha'
    },
  },
})
