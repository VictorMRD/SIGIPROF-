<template>
  <div class="max-w-6xl mx-auto space-y-4 py-8">
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <RouterLink to="/" title="Boton para el index Cursos">
            <BreadcrumbLink>Inicio </BreadcrumbLink>
          </RouterLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Libros</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
    <h1 class="text-3xl font-semibold">Libros</h1>
    <h2 class="text-zinc-500">Explora y Gestiona tus Publicaciones Académicas</h2>
    <div class="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Libros Publicados</CardTitle>
          <Book class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">{{ books.length }}</div>
          <p class="text-xs text-muted-foreground">+11% que el año pasado</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Colaboraciones como Coautor</CardTitle>
          <User class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">
            {{ books.reduce((acc, book) => (book.pivot.rol === 'coautor' ? acc + 1 : acc), 0) }}
          </div>
          <p class="text-xs text-muted-foreground">+0% que el año pasado</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Proyectos en Proceso</CardTitle>
          <Construction class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">4</div>
          <p class="text-xs text-muted-foreground">+0% que el año pasado</p>
        </CardContent>
      </Card>
    </div>
    <div class="flex justify-between">
      <Input placeholder="Buscar libros..." type="text" class="w-80" />
      <RouterLink to="/libros/crear">
        <Button>Nuevo</Button>
      </RouterLink>
    </div>
    <Tabs default-value="cards">
      <TabsList>
        <TabsTrigger value="cards"><Grid2X2 /></TabsTrigger>
        <TabsTrigger value="table"><Table /></TabsTrigger>
      </TabsList>
      <TabsContent value="cards">
        <div class="grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-4">
          <!-- <RouterLink
            v-for="book in books"
            :key="book.id"
            :to="`/libros/${book.id}`"
          > -->
          <div
            v-for="book in books"
            :key="book.id"
            class="flex flex-col border rounded-md cursor-pointer hover:shadow-md"
            @click="goToBook(book)"
          >
            <!-- <RouterLink :to="`/libros/${book.id}`"> -->
              <!-- header  -->
              <div class="flex justify-between px-3 py-1">
                <span class="text-xs font-semibold">{{ capitalize(book.pivot.rol) }}</span>
                <span class="text-xs text-muted">{{ book.anio_publicacion }}</span>
              </div>
              <Separator />
              <div class="p-3 flex flex-col gap-2 flex-1">
                <!-- title -->
                <div class="flex-1">
                  <h1 class="text-xl lg:text-sm font-semibold text-pretty">{{ book.titulo }}</h1>
                </div>
                <!-- status -->
                <div>
                  <span
                    v-if="book.estado_publicacion === 'COMPLETADO'"
                    class="rounded p-1 text-xs text-green-800 bg-green-100"
                  >
                    {{ formatEstadoPublicacion(book.estado_publicacion) }}
                  </span>
                  <span
                    v-else-if="book.estado_publicacion === 'CANCELADO'"
                    class="rounded p-1 text-xs text-red-800 bg-red-100"
                  >
                    {{ formatEstadoPublicacion(book.estado_publicacion) }}
                  </span>
                  <span
                    v-else-if="book.estado_publicacion === 'RECHAZADO'"
                    class="rounded p-1 text-xs text-red-800 bg-red-100 dark:bg-red-950 dark:text-red-900"
                  >
                    {{ formatEstadoPublicacion(book.estado_publicacion) }}
                  </span>
                  <span
                    v-else-if="book.estado_publicacion === 'ATRASADO'"
                    class="rounded p-1 text-xs text-orange-800 bg-orange-100 dark:bg-red-950 dark:text-red-400"
                  >
                    {{ formatEstadoPublicacion(book.estado_publicacion) }}
                  </span>
                  <span
                    v-else-if="book.estado_publicacion === 'EN_ESPERA_DE_APROBACION'"
                    class="rounded p-1 text-xs text-yellow-800 bg-yellow-100"
                  >
                    {{ formatEstadoPublicacion(book.estado_publicacion) }}
                  </span>
                  <span
                    v-else-if="book.estado_publicacion === 'EN_PROGRESO'"
                    class="rounded p-1 text-xs text-yellow-800 bg-yellow-100"
                  >
                    {{ formatEstadoPublicacion(book.estado_publicacion) }}
                  </span>
                  <span v-else class="rounded p-1 text-xs text-yellow-800 bg-yellow-100 dark:bg-yellow-950 dark:text-yellow-600">
                    {{ formatEstadoPublicacion(book.estado_publicacion) }}
                  </span>
                </div>
              </div>
              <div class="flex justify-between bg-muted/50 text-zinc-500 px-3 py-1 text-xs">
                <span>ISBN</span>
                <span>{{ formatISBN(book.isbn) }}</span>
              </div>
            <!-- </RouterLink> -->
          </div>
          <!-- </RouterLink> -->
        </div>
      </TabsContent>
      <TabsContent value="table"> Change your password here. </TabsContent>
    </Tabs>
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Book, User, Construction, Grid2X2, Table } from 'lucide-vue-next'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ref, onMounted } from 'vue'
import axios from '@/lib/axios'
import { useRouter } from 'vue-router'

const router = useRouter()

function goToBook(book) {
  router.push(`/libros/${book.id}`)
}

const books = ref([])

onMounted(async () => {
  const response = await axios.get('api/v1/user/books')
  books.value = response.data
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
