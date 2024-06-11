import { h } from 'vue'
import DropdownAction from '@/components/DataTableDropDown.vue'
import type { ColumnDef } from '@tanstack/vue-table'
import { ArrowUpDown } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'

export type Patient = {
  id: number
  primer_apellido: string
  segundo_apellido: string
  orden: number
}

export const columns: ColumnDef<Patient>[] = [
  {
    accessorKey: 'Primer Apellido',
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: 'ghost',
          onClick: () => {
            const isSorted = column.getIsSorted()
            if (isSorted === 'asc') {
              column.toggleSorting(true)
            } else if (isSorted === 'desc') {
              column.clearSorting()
            } else {
              column.toggleSorting(false)
            }
          }
        },
        () => ['Primer Apellido', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })]
      )
    },
    cell: ({ row }) => {
      const patient = row.original
      return h('div', { class: 'capitalize' }, patient.name)
    },
    size: 50
  },
  {
    accessorKey: 'segundo_apellido',
    header: 'Segundo Apellido'
  },
  {
    accessorKey: 'orc_id',
    header: 'ORC ID'
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const patient = row.original
      return h(
        'div',
        { class: 'relative' },
        h(DropdownAction, {
          resource: 'patients',
          id: patient.id
        })
      )
    },
    header: 'Acciones'
  }
]
