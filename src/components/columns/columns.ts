import { h } from 'vue'
import Button from '../ui/button/Button.vue'
import { ArrowUpDown } from 'lucide-vue-next'

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'tipo_formacion',
    header: () => h('div', { class: 'text-left' }, 'Formacion'),
    cell: ({ row }: any) => {
      const tipo_formacion = row.getValue('tipo_formacion')

      return h('div', { class: 'text-left font-medium' }, tipo_formacion)
    }
  },
  {
    accessorKey: 'horas_totales',
    header: () => h('div', { class: 'text-left' }, 'Horas Totales'),
    cell: ({ row }: any) => {
      const horas_totales = row.getValue('horas_totales')

      return h('div', { class: 'text-left font-medium' }, horas_totales)
    }
  }
]
