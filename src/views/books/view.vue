<template>
  <!-- Book detailed view -->
  <div v-if="book" class="p-8 space-y-4">
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
    <!-- <h2 class="text-zinc-500">Dale una mirada a los detalles de tu libro</h2> -->
    <div class="border rounded-md p-4">
      <div class="p-4 bg-white rounded">
        <h2 class="text-xl font-bold text-gray-800 mb-2">Título</h2>
        <p class="text-gray-600">{{ book.titulo }}</p>
      </div>
      <div class="grid grid-cols-2">
        <div class="p-4 bg-white rounded">
          <h2 class="text-sm font-semibold text-gray-800">ISBN</h2>
          <p class="text-gray-600">{{ formatISBN(book.isbn) }}</p>
          <h2 class="text-sm font-semibold text-gray-800">DOI</h2>
          <p class="text-gray-600">{{ book.doi }}</p>
        </div>
        <div class="p-4 bg-white rounded">
          <h2 class="text-sm font-semibold text-gray-800">Año de publicación</h2>
          <p class="text-gray-600">{{ book.anio_publicacion }}</p>
          <h2 class="text-sm font-semibold text-gray-800">Editorial</h2>
          <p class="text-gray-600">{{ book.editorial }}</p>
          <h2 class="text-sm font-semibold text-gray-800">País</h2>
          <p class="text-gray-600">{{ book.pais }}</p>
          <h2 class="text-sm font-semibold text-gray-800">Idioma</h2>
          <p class="text-gray-600">{{ book.idioma }}</p>
        </div>
      </div>
      <div class="p-4 bg-white rounded">
        <h2 class="text-sm font-semibold text-gray-800">Recibió apoyo CONACYT</h2>
        <p class="text-gray-600">{{ book.recibio_apoyo_conahcyt ? 'Sí' : 'No' }}</p>
      </div>
      <div class="p-4 bg-white rounded">
        <h2 class="text-sm font-semibold text-gray-800">Programa CONACYT</h2>
        <p class="text-gray-600">{{ book.programa_conahcyt }}</p>
      </div>
      <div class="p-4 bg-white rounded">
        <h2 class="text-sm font-semibold text-gray-800">Estado de publicación</h2>
        <p class="text-gray-600">{{ formatEstadoPublicacion(book.estado_publicacion) }}</p>
      </div>
      <div class="p-4 bg-white rounded">
        <h2 class="text-sm font-semibold text-gray-800">URL de cita</h2>
        <p class="text-gray-600">{{ book.url_cita }}</p>
      </div>
      <div class="p-4 bg-white rounded space-y-3">
        <h2 class="text-sm font-semibold text-gray-800">Cita A</h2>
        <p class="text-gray-600">{{ book.cita_a }}</p>
        <h2 class="text-sm font-semibold text-gray-800">Cita B</h2>
        <p class="text-gray-600">{{ book.cita_b }}</p>
        <h2 class="text-sm font-semibold text-gray-800">Total de citas</h2>
        <p class="text-gray-600">{{ book.total_citas }}</p>
      </div>
      <div class="p-4 bg-white rounded">
        <h2 class="text-sm font-semibold text-gray-800">Fecha de creación</h2>
        <p class="text-gray-600">{{ new Date(book.created_at).toLocaleDateString() }}</p>
      </div>
      <div class="p-4 bg-white rounded">
        <h2 class="text-sm font-semibold text-gray-800">Estado de dictaminación</h2>
        <p class="text-gray-600">{{ book.esta_dictaminado ? 'Sí' : 'No' }}</p>
      </div>
      <div class="space-x-2">
        <RouterLink :to="`/libros`">
          <Button class="py-0 px-10">Regresar</Button>
        </RouterLink>
        <RouterLink :to="`/libros/${bookId}/editar`">
          <Button class="py-0 px-10">Editar</Button>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'

import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from '@/lib/axios'

interface Book {
  id: number
  isbn: string
  doi: string
  titulo: string
  anio_publicacion: number
  editorial: string
  pais: string
  idioma: string
  recibio_apoyo_conahcyt: number
  programa_conahcyt: string
  esta_dictaminado: number
  url_cita: string
  cita_a: number
  cita_b: number
  total_citas: number
  estado_publicacion: string
  created_at: string
}

const book = ref<Book | null>(null)
const bookId = useRoute().params.id

onMounted(async () => {
  const response = await axios.get(`api/v1/books/${bookId}`)
  book.value = response.data
})

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.toLowerCase().slice(1)
}

function formatISBN(isbn) {
  return isbn.replace(/(\d{3})(\d{1})(\d{4})(\d{4})(\d{1})/, '$1-$2-$3-$4-$5')
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
