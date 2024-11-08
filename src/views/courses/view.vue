<template>
  <div class="p-8">
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <RouterLink to="/" title="Boton para el index Cursos">
            <BreadcrumbLink>Inicio </BreadcrumbLink>
          </RouterLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <RouterLink to="/cursos" title="Boton para el index Cursos">
            <BreadcrumbLink>Cursos </BreadcrumbLink>
          </RouterLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Visualizar</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
    <div class="py-4 flex flex-col gap-4">
      <div class="flex justify-between">
        <p class="text-3xl font-semibold">Visualizar en detalle</p>
        <div class="flex gap-4">
          <RouterLink :to="`/cursos`">
            <Button class="py-0 px-10">Regresar</Button>
          </RouterLink>
          <RouterLink :to="`/cursos/${dataId}/editar`">
            <Button class="py-0 px-10">Editar</Button>
          </RouterLink>
        </div>
      </div>
    </div>
    <div className="bg-white dark:bg-gray-950 rounded-lg shadow-lg p-6 md:p-8  mx-auto">
      <div class="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h1 class="text-2xl font-bold mb-1">{{ publicationArray.nombre }}</h1>
          <div class="flex items-center space-x-4">
            <span class="text-gray-500"
              >Tipo de formacion: {{ publicationArray.tipo_formacion }}</span
            >
          </div>
        </div>
      </div>
      <div class="prose prose-gray max-w-none dark:prose-invert border p-4 rounded-md my-4">
        <p class="text-gray-800 font-semibold">Detalles adicionales:</p>
        <ul class="flex my-2">
          <div class="flex flex-col gap-1 w-full">
            <li>
              <span class="text-gray-500">Año realizado:</span>
              {{ publicationArray.anio }}
            </li>
            <li>
              <span class="text-gray-500">Nombre de la institucion:</span>
              {{ publicationArray.institucion }}
            </li>
          </div>
          <div class="flex flex-col gap-1 w-full">
            <li>
              <span class="text-gray-500">Horas Totales del curso:</span>
              {{ publicationArray.horas_totales }}
            </li>
            <li>
              <span class="text-gray-500">Tipo de Institución:</span>
              {{ publicationArray.tipo_institucion }}
            </li>
          </div>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DotFilledIcon } from '@radix-icons/vue'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import axios from '@/lib/axios'
import { useRouter, useRoute } from 'vue-router'
import { ref } from 'vue'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

const route = useRoute()
const dataId = route.params.id
const preSelectedProgram = ref('')
const publicationArray = ref([]) // Arreglo para almacenar los datos de la publicación
const authorList = ref([])

const loadData = async () => {
  try {
    const res = await axios.get(`api/v1/courses/${dataId}`)
    const itemData = res.data

    // Crear el arreglo con los datos del curso
    publicationArray.value = {
      tipo_formacion: itemData.tipo_formacion,
      nombre: itemData.nombre,
      anio: itemData.anio.toString(),
      horas_totales: itemData.horas_totales,
      institucion: itemData.institucion,
      tipo_institucion: itemData.tipo_institucion
    }

    console.log(itemData)
  } catch (error) {
    console.error('Error al cargar los datos del curso:', error)
  }
}

loadData()
</script>
