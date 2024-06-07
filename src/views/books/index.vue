<template>
  <!-- <div class="p-8 space-y-4 bg-[#f4f4f566]"> -->
  <div class="p-8 space-y-4">
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
          <div class="text-2xl font-bold">5</div>
          <p class="text-xs text-muted-foreground">+0% que el año pasado</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Colaboraciones como Coautor</CardTitle>
          <User class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">3</div>
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
          <div
            v-for="book in books"
            :key="book.id"
            class="flex flex-col border rounded-md cursor-pointer hover:shadow-md"
          >
            <!-- header  -->
            <div class="flex justify-between px-3 py-1">
              <!-- <Badge variant="outline">{{ book.rol_autor }}</Badge> -->
              <span class="text-xs text-muted">{{ book.rol_autor }}</span>
              <span class="text-xs text-muted">{{ book.ano_publicacion }}</span>
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
                  v-if="book.estado_publicacion === 'Publicado'"
                  class="rounded p-1 text-xs text-green-800 bg-green-100"
                  >Publicado</span
                >
                <span v-else class="rounded p-1 text-xs text-yellow-800 bg-yellow-100"
                  >Revisión</span
                >
              </div>
            </div>
            <div class="flex justify-between bg-zinc-100 text-zinc-500 px-3 py-1 text-xs">
              <span>ISBN</span>
              <span>{{ book.isbn }}</span>
            </div>
          </div>
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
// import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ref, onMounted } from 'vue'
import api from './books'

const books = ref([])

onMounted(() => {
  books.value = api.getAll()
})
</script>
