<script setup lang="ts">
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

import { toast } from 'vue-sonner'
import { onMounted, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from '@/lib/axios'
import { Language } from '@/lib/enums/Language'

interface Author {
  id: Number
  nombre: String
  orc_id: String
  primer_apellido: String
  segund_apellido: String
}

interface Book {
  id: number
  isbn: string
  doi: string
  titulo: string
  anio_publicacion: number
  editorial: string
  pais: string
  idioma: string
  estado_publicacion: string
  authors: [Author]
}

const book = ref<Book | null>(null)
const bookId = useRoute().params.id
const router = useRouter()

const language = computed(() => {
  const lang = Language.find(language => language.code === book.value.idioma)
  return lang.name
})

onMounted(async () => {
  const response = await axios.get(`api/v1/books/${bookId}`)
  console.log(response.data)
  book.value = response.data
})

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.toLowerCase().slice(1)
}

function formatISBN(isbn) {
  return isbn.replace(/(\d{3})(\d{1})(\d{4})(\d{4})(\d{1})/, '$1-$2-$3-$4-$5')
}

async function handleRemove() {
  try {
    const res = axios.delete(`/api/v1/books/${bookId}`)
    toast.success("Libro eliminado correctamente")
    router.push('/libros')
    console.log(res)
  } catch (error) {
    console.error(error)
  }
}

function formatEstadoPublicacion(estado) {
  switch (estado) {
    case 'PLANEACION':
      return 'Planeación'
    case 'EN_PROGRESO':
      return 'En progreso'
    case 'REVISION':
      return 'Revisión'
    case 'COMPLETADO':
      return 'Completado'
    case 'ATRASADO':
      return 'Atrasado'
    case 'CANCELADO':
      return 'Cancelado'
    case 'PAUSADO':
      return 'Pausado'
    case 'EN_ESPERA_DE_APROBACION':
      return 'En espera de aprobación'
    case 'APROBADO':
      return 'Aprobado'
    case 'RECHAZADO':
      return 'Rechazado'
    default:
      return capitalize(estado)
  }
}
</script>

<template>
  <div v-if="book" class="py-8 space-y-4 max-w-6xl mx-auto">
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <RouterLink to="/" title="Boton para el index Cursos">
            <BreadcrumbLink>Inicio </BreadcrumbLink>
          </RouterLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <RouterLink to="/libros" title="Boton para el index Cursos">
            <BreadcrumbLink>Libros </BreadcrumbLink>
          </RouterLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{{ book.titulo }}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
    <h1 class="text-3xl font-semibold">{{ book.titulo }}</h1>
    <div class="border rounded-md p-8 space-y-8">
      <div>
        <h2 class="text-muted-foreground mb-2 text-sm">Título</h2>
        <p class="text-xl">{{ book.titulo }}</p>
      </div>
      <!-- <Separator /> -->
      <div class="grid grid-cols-3 gap-4">
        <div>
          <h2 class="text-muted-foreground text-sm">ISBN</h2>
          <p>{{ formatISBN(book.isbn) }}</p>
        </div>
        <div>
          <h2 class="text-muted-foreground text-sm">DOI</h2>
          <p>{{ book.doi }}</p>
        </div>
        <div>
          <h2 class="text-muted-foreground text-sm">Año de publicación</h2>
          <p>{{ book.anio_publicacion }}</p>
        </div>
        <div>
          <h2 class="text-muted-foreground text-sm">Editorial</h2>
          <p>{{ book.editorial }}</p>
        </div>
        <div>
          <h2 class="text-muted-foreground text-sm">País</h2>
          <p>{{ book.pais }}</p>
        </div>
        <div>
          <h2 class="text-muted-foreground text-sm">Idioma</h2>
          <p>{{ language }}</p>
        </div>
      </div>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Primer apellido</TableHead>
              <TableHead>Segundo apellido</TableHead>
              <TableHead>ORC ID</TableHead>
              <TableHead>Orden</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="author in book.authors" :key="author.id">
              <TableCell>{{ author.nombre }}</TableCell>
              <TableCell>{{ author.primer_apellido }}</TableCell>
              <TableCell>{{ author.segundo_apellido }}</TableCell>
              <TableCell>{{ author.orc_id }}</TableCell>
              <TableCell>{{ author.pivot.orden }}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div class="flex justify-end gap-4">
        <RouterLink :to="`/libros`">
          <Button class="py-0 px-10">Regresar</Button>
        </RouterLink>
        <Button class="py-0 px-10" @click="handleRemove">Eliminar</Button>
        <RouterLink :to="`/libros/${bookId}/editar`">
          <Button class="py-0 px-10">Editar</Button>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
