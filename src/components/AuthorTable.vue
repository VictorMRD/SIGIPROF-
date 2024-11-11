<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { TrashIcon } from '@radix-icons/vue'
import { defineProps } from 'vue'

interface Author {
  id: string | number
  nombre: string
  primer_apellido: string
  segundo_apellido: string
  orc_id: string
  orden: number
}

const emit = defineEmits(['removeAuthor'])

const props = defineProps<{
  authors: Author[]
}>()

const removeAuthor = (id) => {
  emit('removeAuthor', id)
}
</script>

<template>
  <div>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>Primer Apellido</TableHead>
          <TableHead>Segundo Apellido</TableHead>
          <TableHead>ORC ID</TableHead>
          <TableHead>Orden</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="author in props.authors" :key="author.id">
          <TableCell class="font-medium">{{ author.nombre }}</TableCell>
          <TableCell>{{ author.primer_apellido }}</TableCell>
          <TableCell>{{ author.segundo_apellido }}</TableCell>
          <TableCell>{{ author.orc_id }}</TableCell>
          <TableCell>{{ author.orden }}</TableCell>
          <TableCell>
            <Button type="button" variant="outline" @click="() => removeAuthor(author.id)">
              <TrashIcon />
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
