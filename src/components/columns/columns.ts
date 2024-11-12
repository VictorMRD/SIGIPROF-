import { h } from 'vue'
import Button from '../ui/button/Button.vue'
import { ArrowUpDown } from 'lucide-vue-next'

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'id',
    header: ({ column }: any) => {
      return h(
        Button,
        {
          variant: 'ghost',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc')
        },
        () => ['ID', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })]
      )
    },
    cell: ({ row }: any) => {
      const id = row.getValue('id')

      return h('div', { class: 'text-left font-medium' }, id)
    }
  },
  {
    accessorKey: 'tipo_formacion',
    header: () => h('div', { class: 'text-left' }, 'Formacion'),
    cell: ({ row }: any) => {
      const tipo_formacion = row.getValue('tipo_formacion')

      return h('div', { class: 'text-left font-medium' }, tipo_formacion)
    }
  },
  {
    accessorKey: 'nombre',
    header: () => h('div', { class: 'text-left' }, 'Nombre'),
    cell: ({ row }: any) => {
      const nombre = row.getValue('nombre')

      return h('div', { class: 'text-left font-medium' }, nombre)
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
