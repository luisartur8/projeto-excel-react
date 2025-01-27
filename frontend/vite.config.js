import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3333
  },
  resolve: {
    alias: {
      '@assets': '/src/assets',
      '@DragModal': '/src/components/DragModal',
      '@theme': '/src/config/',
      '@selects': '/src/components/selects',
      '@utils': '/src/components/utils',
      '@CarregaPlanilha': '/src/components/CarregaPlanilha',
      '@ButtonsHeader': '/src/components/CarregaPlanilha/ButtonsHeader',
      '@GerenciadorPlanilha': '/src/components/GerenciadorPlanilha',
      '@ButtonsGerenciador': '/src/components/GerenciadorPlanilha/ButtonsGerenciador'
    },
  },
})
