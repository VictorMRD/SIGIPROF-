<template>
  <div>
    <div class="w-full h-56 flex items-center justify-center">
      <img src="@/assets/uabcs-modified.jpeg" alt="Image" class="w-full h-full object-cover" />
      <div class="absolute text-white flex flex-col justify-center items-center">
        <p class="text-5xl font-bold">UABCS: SIGIPROF</p>
        <p class="italic">Sistema de Gestion de Información Profesional Docente</p>
      </div>
    </div>
    <div class="p-4">
      <!-- <div id="welcome-message" class="w-full flex justify-center p-8">
        <p class="text-4xl font-semibold">¡Bienvenido, Isaac! {{}}</p>
      </div> -->
      <div id="card-holder">
        <p class="py-2 italic text-gray-600">Tú trabajo en el último mes</p>
        <div class="flex gap-4">
          <Card class="w-full">
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle class="text-sm font-medium"> Publicaciones </CardTitle>
              <RouterLink :to="`/publicaciones/crear`">
                <Button class="h-6 px-4 bg-white text-black hover:bg-gray-100">Crear</Button>
              </RouterLink>
            </CardHeader>
            <CardContent>
              <div class="text-2xl font-bold">5</div>
              <p class="text-xs text-muted-foreground">+30% en comparación al mes pasado</p>
            </CardContent>
          </Card>
          <Card class="w-full">
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle class="text-sm font-medium"> Libros </CardTitle>
              <RouterLink :to="`/libros/crear`">
                <Button class="h-6 px-4 bg-white text-black hover:bg-gray-100">Crear</Button>
              </RouterLink>
            </CardHeader>
            <CardContent>
              <div class="text-2xl font-bold">1</div>
              <p class="text-xs text-muted-foreground">1 más que en el mes pasado</p>
            </CardContent>
          </Card>
          <Card class="w-full">
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle class="text-sm font-medium"> Cursos </CardTitle>
              <RouterLink :to="`/cursos/crear`">
                <Button class="h-6 px-4 bg-white text-black hover:bg-gray-100">Crear</Button>
              </RouterLink>
            </CardHeader>
            <CardContent>
              <div class="text-2xl font-bold">3</div>
              <p class="text-xs text-muted-foreground">2 más que en el mes pasado</p>
            </CardContent>
          </Card>
          <Card class="w-full">
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle class="text-sm font-medium"> Capacitaciones </CardTitle>
              <RouterLink :to="`/capacitaciones/crear`">
                <Button class="h-6 px-4 bg-white text-black hover:bg-gray-100">Crear</Button>
              </RouterLink>
            </CardHeader>
            <CardContent>
              <div class="text-2xl font-bold">7</div>
              <p class="text-xs text-muted-foreground">5 más que en el mes pasado</p>
            </CardContent>
          </Card>
        </div>
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
