import { h } from 'vue'
import Button from '../ui/button/Button.vue'
import { ArrowUpDown } from 'lucide-vue-next'

export const bookColumns: ColumnDef<Payment>[] = [
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
    accessorKey: 'isbn',
    header: () => h('div', { class: 'text-left' }, 'ISBN'),
    cell: ({ row }: any) => {
      const isbn = row.getValue('isbn')

      return h('div', { class: 'text-left font-medium' }, isbn)
    }
  },
  {
    accessorKey: 'titulo',
    header: () => h('div', { class: 'text-left' }, 'Titulo'),
    cell: ({ row }: any) => {
      const titulo = row.getValue('titulo')

      return h('div', { class: 'text-left font-medium' }, titulo)
    }
  },
  {
    accessorKey: 'estado_publicacion',
    header: () => h('div', { class: 'text-left' }, 'Estado de publicación'),
    cell: ({ row }: any) => {
      const estado_publicacion = row.getValue('estado_publicacion')

      return h('div', { class: 'text-left font-medium' }, estado_publicacion)
    }
  }
]
