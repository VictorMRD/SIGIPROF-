<template>
  <div>
    <div class="w-full h-56 flex items-center justify-center">
      <img src="@/assets/uabcs-modified.jpeg" alt="Image" class="w-full h-full object-cover" />
      <div class="absolute text-white flex flex-col justify-center items-center">
        <p class="text-5xl font-bold">¡Bienvenido, {user}!</p>
        <p class="italic mt-3">Sistema de Gestion de Información Profesional Docente</p>
      </div>
    </div>
    <div class="max-w-6xl mx-auto mt-5">
        <p class="py-2 italic text-muted-foreground ">Tú trabajo en el último mes</p>
        <div class="grid grid-cols-4 gap-4">
          <Card>
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle class="text-md font-medium">Publicaciones</CardTitle>
              <RouterLink :to="`/publicaciones/crear`">
                <Button class="h-7">Crear</Button>
              </RouterLink>
            </CardHeader>
            <CardContent>
              <div class="text-2xl font-bold">5</div>
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
              <div class="text-2xl font-bold">1</div>
              <p class="text-xs text-muted-foreground">1 más que en el mes pasado</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle class="text-md font-medium"> Cursos </CardTitle>
              <RouterLink :to="`/cursos/crear`">
                <Button class="h-7">Crear</Button>
              </RouterLink>
            </CardHeader>
            <CardContent>
              <div class="text-2xl font-bold">3</div>
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
              <p class="text-xs text-muted-foreground">5 más que en el mes pasado</p>
            </CardContent>
          </Card>
        </div>
        <div class="grid grid-cols-2 mt-4">
        <Card>
            <CardHeader>
                <CardTitle>Actividad Reciente</CardTitle>
                <CardDescription>Placeholder</CardDescription>
            </CardHeader>
            <CardContent>
                <div class="flex gap-4">
                    <img src="https://i.pravatar.cc/40" class="rounded-full w-12 h-12">
                    <div class="flex-1 flex flex-col justify-center">
                        <h3 class="text-sm">Olivia Martin</h3>
                        <p class="text-xs text-muted-foreground">olivia.martin@email.com</p>
                    </div>
                </div>
            </CardContent>
        </Card>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/lib/registry/new-york/ui/tabs'

import axios from '@/lib/axios'
import { ref } from 'vue'

const courses = ref(null)
const publications = ref(null)
const books = ref(null)
const getUserWorkData = async () => {
  try {
    courses.value = (await axios.get('api/v1/user/courses')).data
    publications.value = (await axios.get('api/v1/user/publications')).data
    books.value = (await axios.get('api/v1/user/books')).data
    //const capacitations = (await axios.get('api/v1/user/capacitations')).data
    console.log(courses)
  } catch (error) {
    console.error(error)
  }
}

getUserWorkData()
</script>
