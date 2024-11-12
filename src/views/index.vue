<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/lib/registry/new-york/ui/tabs'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Pencil2Icon } from '@radix-icons/vue'
import DataTable from '@/components/ui/DataTable.vue'

import { columns } from '@/components/columns/columns'
import { bookColumns } from '@/components/columns/booksColumns'
import { useAppStore } from '@/stores/app'

import { ref, onMounted, h } from 'vue'
import axios from '@/lib/axios'
import { UserStats } from '@/types/UserStats'

const app = useAppStore()

const stats = ref<UserStats>({
  publications: 0,
  books: 0,
  courses: 0,
})

async function fetchStats() {
  try {
    const response = await axios.get<UserStats>('api/v1/user/stats')
    console.log(response.data)
    stats.value = response.data
  } catch (error) {
    console.error('Error fetching user stats: ', error)
  }
}

onMounted(fetchStats)

const activities = [
  {
    id: 1,
    user: {
      name: 'Alma Díaz',
      email: 'alma.diaz@email.com',
      image: 'https://avatar.iran.liara.run/public/55'
    },
    name: 'Ha creado un artículo',
    date: 'Domingo, 10 de Noviembre'
  },
  {
    id: 2,
    user: {
      name: 'Victor Martín',
      email: 'victor.martin@email.com',
      image: 'https://avatar.iran.liara.run/public/39'
    },
    name: 'Ha asistido a un curso',
    date: 'Viernes, 8 de Noviembre'
  },
  {
    id: 3,
    user: {
      name: 'Sarah Agundez',
      email: 'srh.agundez@email.com',
      image: 'https://avatar.iran.liara.run/public/80'
    },
    name: 'Ha creado una publicación',
    date: 'Miércoles, 6 de Noviembre'
  },
  {
    id: 4,
    user: {
      name: 'Jesus Cardenas',
      email: 'jesus.cardenas@email.com',
      image: 'https://avatar.iran.liara.run/public/44'
    },
    name: 'Ha creado un libro',
    date: 'Martes, 5 de Noviembre'
  },
  {
    id: 5,
    user: {
      name: 'Cinthya Flores',
      email: 'cinth.flores@email.com',
      image: 'https://avatar.iran.liara.run/public/81'
    },
    name: 'Ha asistido a una capacitación',
    date: 'Domingo, 3 de Noviembre'
  }
]

const toDoList = [
  {
    id: 1,
    user: {
      name: 'Alma Díaz',
      email: 'alma.diaz@email.com',
      image: 'https://avatar.iran.liara.run/public/55'
    },
    description: 'Crear un artículo',
    date: 'Domingo, 10 de Noviembre'
  },
  {
    id: 2,
    user: {
      name: 'Alma Díaz',
      email: 'alma.diaz@email.com',
      image: 'https://avatar.iran.liara.run/public/55'
    },
    description: 'Asistir a un curso',
    date: 'Viernes, 8 de Noviembre'
  },
  {
    id: 3,
    user: {
      name: 'Alma Díaz',
      email: 'alma.diaz@email.com',
      image: 'https://avatar.iran.liara.run/public/55'
    },
    description: 'Crear una publicación',
    date: 'Miércoles, 6 de Noviembre'
  },
  {
    id: 4,
    user: {
      name: 'Alma Díaz',
      email: 'alma.diaz@email.com',
      image: 'https://avatar.iran.liara.run/public/55'
    },
    description: 'Crear un libro',
    date: 'Martes, 5 de Noviembre'
  },
  {
    id: 5,
    user: {
      name: 'Alma Díaz',
      email: 'alma.diaz@email.com',
      image: 'https://avatar.iran.liara.run/public/55'
    },
    description: 'Asistir a una capacitación',
    date: 'Domingo, 3 de Noviembre'
  },
  {
    id: 6,
    user: {
      name: 'Alma Díaz',
      email: 'alma.diaz@email.com',
      image: 'https://avatar.iran.liara.run/public/55'
    },
    description: 'Asistir a una capacitación',
    date: 'Domingo, 3 de Noviembre'
  },
  {
    id: 7,
    user: {
      name: 'Alma Díaz',
      email: 'alma.diaz@email.com',
      image: 'https://avatar.iran.liara.run/public/55'
    },
    description: 'Asistir a una capacitación',
    date: 'Domingo, 3 de Noviembre'
  }
]
</script>
<template>
  <div>
    <div class="w-full h-56 flex items-center justify-center relative -z-10">
      <img
        src="@/assets/uabcs-modified.jpeg"
        alt="Image"
        class="w-full h-full object-cover select-none"
      />
      <div class="absolute text-white flex flex-col justify-center items-center">
        <p class="text-5xl font-bold">¡Bienvenido, {{ app.user.nombre }}!</p>
        <p class="italic mt-3">Sistema de Gestion de Información Profesional Docente</p>
      </div>
    </div>
    <div class="max-w-6xl mx-auto mt-5">
      <p class="py-2 italic text-muted-foreground">Tú trabajo en el último mes</p>
      <div class="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle class="text-md font-medium">Publicaciones</CardTitle>
            <RouterLink :to="`/publicaciones/crear`">
              <Button class="h-7">Crear</Button>
            </RouterLink>
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">{{ stats.publications }}</div>
            <p class="text-xs text-muted-foreground">+30% en comparación al mes pasado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle class="text-md font-medium">Libros</CardTitle>
            <RouterLink :to="`/libros/crear`">
              <Button class="h-7">Crear</Button>
            </RouterLink>
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">{{ stats.books }}</div>
            <p class="text-xs text-muted-foreground">1 más que en el mes pasado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle class="text-md font-medium">Cursos</CardTitle>
            <RouterLink :to="`/cursos/crear`">
              <Button class="h-7">Crear</Button>
            </RouterLink>
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">{{ stats.courses }}</div>
            <p class="text-xs text-muted-foreground">2 más que en el mes pasado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle class="text-md font-medium"> Capacitaciones </CardTitle>
            <RouterLink :to="`/capacitaciones/crear`">
              <Button class="h-7">Crear</Button>
            </RouterLink>
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">7</div>
            <!-- <p class="text-xs text-muted-foreground">5 más que en el mes pasado</p> -->
          </CardContent>
        </Card>
      </div>
      <div class="grid grid-cols-2 mt-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
            <CardDescription>Mira que están haciendo tus compañeros</CardDescription>
          </CardHeader>
          <CardContent class="space-y-7">
            <div v-for="activity in activities" :key="activity.id" class="flex gap-4">
              <img :src="activity.user.image" class="rounded-full w-10 h-10" />
              <div class="flex-1 flex flex-col justify-center">
                <h3 class="text-sm">{{ activity.user.name }}</h3>
                <p class="text-xs text-muted-foreground">{{ activity.user.email }}</p>
              </div>
              <div class="flex-1 flex flex-col justify-center items-end">
                <h3 class="text-sm">{{ activity.name }}</h3>
                <p class="text-xs text-muted-foreground">{{ activity.date }}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div class="flex justify-between">
              <CardTitle>Lista de pendientes</CardTitle>
              <Popover>
                <PopoverTrigger>
                  <Button class="h-7">Crear tarea</Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Input class="focus-visible:ring-transparent" />
                </PopoverContent>
              </Popover>
            </div>
            <CardDescription>Visualiza tus pendientes de manera detallada</CardDescription>
          </CardHeader>
          <CardContent class="space-y-2 overflow-y-scroll max-h-80">
            <Card v-for="toDo in toDoList" :key="toDo.id" class="flex p-2">
              <div class="flex-1 flex flex-col justify-center">
                <h3 class="text-sm">{{ toDo.user.name }}</h3>
                <p class="text-xs text-muted-foreground">{{ toDo.user.email }}</p>
              </div>
              <div class="flex justify-center items-center gap-3">
                <div class="flex-1 flex flex-col justify-center items-end">
                  <h3 class="text-sm">{{ toDo.description }}</h3>
                  <p class="text-xs text-muted-foreground">{{ toDo.date }}</p>
                </div>
                <Checkbox id="terms" />
                <Button class="h-5 w-5 px-0 text-xs font-semibold bg-red-500 dark:bg-red-700">
                  X
                </Button>
                <Button class="h-5 w-5 px-0 text-xs font-semibold">
                  <Pencil2Icon />
                </Button>
              </div>
            </Card>
          </CardContent>
        </Card>
      </div>
      <div class="grid grid-cols-3 mt-4 gap-4">
        <Card class="col-span-1">
          <CardHeader>
            <CardTitle>Cursos</CardTitle>
            <CardDescription>Visualiza tus pendientes de manera detallada</CardDescription>
          </CardHeader>
          <CardContent class="space-y-2 overflow-y-scroll max-h-80">
            <DataTable :columns="columns" :data="courses" v-if="courses != null" />
          </CardContent>
        </Card>
        <Card class="col-span-2">
          <CardHeader>
            <CardTitle>Libros</CardTitle>
            <CardDescription>Selecciona el periodo de tiempo que quieres revisar</CardDescription>
          </CardHeader>
          <CardContent class="space-y-2 overflow-y-scroll max-h-80">
            <DataTable :columns="bookColumns" :data="books" v-if="books != null" />
          </CardContent>
        </Card>
      </div>
      <div class="h-10"></div>
    </div>
  </div>
</template>
