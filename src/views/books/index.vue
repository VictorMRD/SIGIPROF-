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
          <div class="text-2xl font-bold">0</div>
          <p class="text-xs text-muted-foreground">+0% que el año pasado</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Colaboraciones como Coautor</CardTitle>
          <User class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">0</div>
          <p class="text-xs text-muted-foreground">+0% que el año pasado</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Proyectos en Proceso</CardTitle>
          <Construction class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">0</div>
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
          <div v-for="book in books" :key="book.id" class="flex flex-col border rounded-md cursor-pointer hover:shadow-md">
            <div class="flex justify-between px-3 py-1">
              <Badge variant="outline">{{ book.rol_autor }}</Badge>
              <span class="text-xs text-muted">{{ book.ano_publicacion }}</span>
            </div>
            <Separator />
            <div class="p-3 flex flex-col gap-2 flex-1">
              <!-- title -->
              <div class="flex-1">
                <h1 class="text-sm font-semibold text-pretty">{{ book.titulo }}</h1>
              </div>
              <!-- status -->
              <div>
                <span v-if="book.estado_publicacion === 'Publicado'" class="rounded p-1 text-xs text-green-800 bg-green-100">Publicado</span>
                <span v-else class="rounded p-1 text-xs text-yellow-800 bg-yellow-100">Revisión</span>
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Book, User, Construction, Grid2X2, Table } from 'lucide-vue-next'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ref, onMounted } from 'vue'

const books = ref([])

onMounted(() => {
  books.value = [
    {
      id: 1,
      isbn: '978-3-16-148410-0',
      doi: '10.1000/xyz123',
      titulo: 'El Arte de Enseñar: Más Allá del Aula',
      ano_publicacion: 2010,
      editorial: 'Editorial Alfa',
      pais: 'México',
      idioma: 'Español',
      isbn_traduccion: '978-0-12-345678-9',
      idioma_traduccion: 'Inglés',
      titulo_traduccion: 'Example Book 1',
      apoyo_conahcyt: true,
      rol_autor: 'Autor Principal',
      estado_publicacion: 'Publicado',
      objetivo: 'Investigar el tema X',
      dictaminado: true,
      portada: 'https://example.com/portada1.jpg'
    },
    {
      id: 2,
      isbn: '978-3-16-148411-7',
      doi: '10.1000/xyz124',
      titulo: 'Pedagogía Creativa: Innovación en la Enseñanza',
      ano_publicacion: 2015,
      editorial: 'Editorial Beta',
      pais: 'Argentina',
      idioma: 'Español',
      isbn_traduccion: '978-0-12-345679-6',
      idioma_traduccion: 'Francés',
      titulo_traduccion: 'Exemple Livre 2',
      apoyo_conahcyt: false,
      rol_autor: 'Coautor',
      estado_publicacion: 'Publicado',
      objetivo: 'Explorar el tema Y',
      dictaminado: false,
      portada: 'https://example.com/portada2.jpg'
    },
    {
      id: 3,
      isbn: '978-3-16-148412-4',
      doi: '10.1000/xyz125',
      titulo: 'Semillas del Conocimiento: Cultivando Mentes Jóvenes',
      ano_publicacion: 2020,
      editorial: 'Editorial Gamma',
      pais: 'España',
      idioma: 'Español',
      isbn_traduccion: '978-0-12-345680-2',
      idioma_traduccion: 'Alemán',
      titulo_traduccion: 'Beispiel Buch 3',
      apoyo_conahcyt: true,
      rol_autor: 'Editor',
      estado_publicacion: 'En revisión',
      objetivo: 'Analizar el tema Z',
      dictaminado: true,
      portada: 'https://example.com/portada3.jpg'
    },
    {
      id: 4,
      isbn: '978-3-16-148413-1',
      doi: '10.1000/xyz126',
      titulo: 'La Ciencia de la Educación: Estrategias y Teorías Modernas',
      ano_publicacion: 2012,
      editorial: 'Editorial Delta',
      pais: 'Chile',
      idioma: 'Español',
      isbn_traduccion: '978-0-12-345681-9',
      idioma_traduccion: 'Portugués',
      titulo_traduccion: 'Livro Exemplo 4',
      apoyo_conahcyt: false,
      rol_autor: 'Revisor',
      estado_publicacion: 'Publicado',
      objetivo: 'Estudiar el tema W',
      dictaminado: false,
      portada: 'https://example.com/portada4.jpg'
    },
    {
      id: 5,
      isbn: '978-3-16-148414-8',
      doi: '10.1000/xyz127',
      titulo: 'Historias de Aula: Narrativas de un Docente',
      ano_publicacion: 2018,
      editorial: 'Editorial Épsilon',
      pais: 'Perú',
      idioma: 'Español',
      isbn_traduccion: '978-0-12-345682-6',
      idioma_traduccion: 'Italiano',
      titulo_traduccion: 'Libro Esempio 5',
      apoyo_conahcyt: true,
      rol_autor: 'Coeditor',
      estado_publicacion: 'En revisión',
      objetivo: 'Investigar el tema V',
      dictaminado: true,
      portada: 'https://example.com/portada5.jpg'
    },
    {
      id: 6,
      isbn: '978-3-16-148415-5',
      doi: '10.1000/xyz128',
      titulo: 'El Desafío de Enseñar: Retos y Triunfos Educativos',
      ano_publicacion: 2017,
      editorial: 'Editorial Zeta',
      pais: 'Colombia',
      idioma: 'Español',
      isbn_traduccion: '978-0-12-345683-3',
      idioma_traduccion: 'Chino',
      titulo_traduccion: '例子书6',
      apoyo_conahcyt: false,
      rol_autor: 'Autor Principal',
      estado_publicacion: 'Publicado',
      objetivo: 'Explorar el tema U',
      dictaminado: false,
      portada: 'https://example.com/portada6.jpg'
    },
    {
      id: 7,
      isbn: '978-3-16-148416-2',
      doi: '10.1000/xyz129',
      titulo: 'La Magia de la Educación Inclusiva',
      ano_publicacion: 2016,
      editorial: 'Editorial Eta',
      pais: 'Uruguay',
      idioma: 'Español',
      isbn_traduccion: '978-0-12-345684-0',
      idioma_traduccion: 'Japonés',
      titulo_traduccion: '例の本7',
      apoyo_conahcyt: true,
      rol_autor: 'Coautor',
      estado_publicacion: 'En revisión',
      objetivo: 'Analizar el tema T',
      dictaminado: true,
      portada: 'https://example.com/portada7.jpg'
    },
    {
      id: 8,
      isbn: '978-3-16-148417-9',
      doi: '10.1000/xyz130',
      titulo: 'Formando el Futuro: Guía para Educadores del Siglo XXI',
      ano_publicacion: 2021,
      editorial: 'Editorial Theta',
      pais: 'Venezuela',
      idioma: 'Español',
      isbn_traduccion: '978-0-12-345685-7',
      idioma_traduccion: 'Ruso',
      titulo_traduccion: 'Пример Книга 8',
      apoyo_conahcyt: false,
      rol_autor: 'Revisor',
      estado_publicacion: 'Publicado',
      objetivo: 'Estudiar el tema S',
      dictaminado: false,
      portada: 'https://example.com/portada8.jpg'
    }
  ]
})
</script>
