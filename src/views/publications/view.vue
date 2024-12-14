<template>
  <div class="py-8 max-w-6xl mx-auto">
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <RouterLink to="/" title="Boton para el index Cursos">
            <BreadcrumbLink>Inicio </BreadcrumbLink>
          </RouterLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <RouterLink to="/publicaciones" title="Boton para el index Cursos">
            <BreadcrumbLink>Publicaciones </BreadcrumbLink>
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
          <RouterLink :to="`/publicaciones`">
            <Button type="sm" class="py-0 px-10 text-xs">Regresar</Button>
          </RouterLink>
          <RouterLink
            :to="`/publicaciones/${dataId}/download`"
            class="flex flex-col justify-center items-center"
          >
            <Button type="sm" class="flex gap-1 items-center">
              <DownloadIcon />
              <p class="text-xs">Descargar</p>
            </Button>
          </RouterLink>
          <RouterLink :to="`/publicaciones/${dataId}/editar`">
            <Button type="sm" class="py-0 px-10 text-xs">Editar</Button>
          </RouterLink>
          <AlertDialog>
            <AlertDialogTrigger>
              <Button
                type="sm"
                class="flex gap-1 items-center bg-red-500 text-white hover:text-white hover:bg-red-400"
              >
                <TrashIcon />
                <p class="text-xs">Eliminar</p>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle
                  >¿Estas completamente seguro de que quieres eliminar este elemento?
                  <p class="text-sm font-normal">
                    Esta acción no puede deshacerse, y una vez eliminada el registro no podrá ser
                    recuperador de ninguna manera, afectando los registros de otras tablas y la
                    integridad de las mismas.
                  </p>
                </AlertDialogTitle>
                <AlertDialogDescription class="h-60 overflow-auto">
                  <div v-for="(value, key) in publicationArray" :key="key" class="p-1">
                    <p>
                      <span class="capitalize text-gray-600 font-semibold">{{ key }}</span
                      >: {{ value ? value : 'Undefined' }}
                    </p>
                  </div>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel
                  class="bg-white-500 text-black hover:bg-gray-200 dark:hover:bg-gray-300 dark:bg-white border dark:hover:text-black"
                  >Cancelar</AlertDialogCancel
                >
                <AlertDialogAction
                  class="dark:hover:bg-slate-950 hover:bg-slate-800 dark:bg-black text-white"
                  @click="deleteElement()"
                >
                  Confirmar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
    <div className="border rounded-md p-8 shadow-lg md:p-8  mx-auto">
      <div class="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h1 class="text-2xl font-bold mb-1">{{ publicationArray.titulo }}</h1>
          <div class="flex items-center space-x-4">
            <div
              class="px-3 py-1 rounded-full bg-green-100 text-green-600 font-medium text-sm dark:bg-green-900/20 dark:text-green-400"
            >
              {{ publicationArray.estatus }}
            </div>
            <span class="text-gray-500">DOI: {{ publicationArray.doi }}</span>
          </div>
        </div>
        <div class="mt-4 md:mt-0 text-sm text-gray-500 dark:text-gray-400">
          <div>Tipo ISSN: {{ publicationArray.issn_tipo }}</div>
          <div>ISSN Impreso: {{ publicationArray.issn_impreso }}</div>
          <div>ISSN Electrónico: {{ publicationArray.issn_electronico }}</div>
        </div>
      </div>
      <div class="prose prose-gray max-w-none dark:prose-invert border p-4 rounded-md my-4">
        <p class="text-gray-800 font-semibold">Detalles adicionales:</p>
        <ul class="flex my-2 gap-10 pt-2">
          <div class="flex flex-col gap-1">
            <li>
              <span class="text-gray-500">Año de publicación:</span>
              {{ publicationArray.anio_publicacion }}
            </li>
          </div>
          <div class="flex flex-col gap-1">
            <li>
              <span class="text-gray-500">Nombre de la revista:</span>
              {{ publicationArray.nombre_revista }}
            </li>
          </div>
        </ul>
      </div>
      <div class="flex justify-between border p-4 rounded-md my-4">
        <div class="w-full">
          <h2 class="text-lg font-bold">Lista de autores:</h2>
          <Table>
            <TableCaption>Lista de los autors participantes en la publicacion.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead class="w-[100px]"> ORC ID </TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Primer Apellido</TableHead>
                <TableHead>Segundo apellido</TableHead>
                <!-- <TableHead class="text-right"> Accion </TableHead> -->
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="author in authorList" :key="author.id">
                <TableCell class="font-medium"> {{ author.orc_id }} </TableCell>
                <TableCell>{{ author.nombre }}</TableCell>
                <TableCell>{{ author.primer_apellido }}</TableCell>
                <TableCell>{{ author.segundo_apellido }}</TableCell>
                <!-- <TableCell class="text-right">
                  <button
                    type="button"
                    class="bg-black text-white p-1 rounded-md hover:bg-gray-900 transition-all duration-300"
                    @click="deleteElement"
                  >
                    Eliminar
                  </button>
                </TableCell> -->
              </TableRow>
            </TableBody>
          </Table>
        </div>
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
import { TrashIcon } from '@radix-icons/vue'
import { useRouter, useRoute } from 'vue-router'
import { ref } from 'vue'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { toast } from 'vue-sonner'
import { DownloadIcon } from '@radix-icons/vue'

const route = useRoute()
const dataId = route.params.id
const preSelectedProgram = ref('')
const publicationArray = ref([]) // Arreglo para almacenar los datos de la publicación
const authorList = ref([])

const loadData = async () => {
  try {
    const res = await axios.get(`api/v1/publications/${dataId}`)
    const resAuthors = await axios.get(`api/v1/publications/${dataId}/authors`)
    authorList.value = resAuthors.data
    const publicationData = res.data

    // Crear el arreglo con los datos de la publicación
    publicationArray.value = {
      issn_tipo: publicationData.issn_tipo,
      issn_impreso:
        publicationData.issn_impreso !== null ? publicationData.issn_impreso.toString() : 'Vacio',
      issn_electronico:
        publicationData.issn_electronico !== null
          ? publicationData.issn_electronico.toString()
          : 'Vacio',
      doi: publicationData.doi,
      nombre_revista: publicationData.nombre_revista,
      titulo: publicationData.titulo,
      anio_publicacion: publicationData.anio_publicacion.toString(),
      programa_conahcyt: publicationData.programa_conahcyt,
      estatus: publicationData.estatus,
      objetivo: publicationData.objetivo,
      url_cita: publicationData.url_cita,
      cita_a: publicationData.cita_a,
      cita_b: publicationData.cita_b,
      total_citas: publicationData.total_citas,
      eje_conahcyt: publicationData.eje_conahcyt,
      recibio_apoyo_conahcyt: publicationData.recibio_apoyo_conahcyt == 1 ? true : false,
      preSelectedProgram: publicationData.programa_conahcyt
    }

    if (publicationData.recibio_apoyo_conahcyt == 0) {
      publicationArray.value.programa_conahcyt = 'vacio'
    }
    console.log(publicationData)
  } catch (error) {
    console.error('Error al cargar los datos de la publicación:', error)
  }
}

loadData()

const router = useRouter()
async function deleteElement() {
  try {
    const res = await axios.delete(`api/v1/publications/${dataId}`)
    toast.success('Su registro se ha eliminado con éxito')
    router.push(`/publicaciones`)
  } catch (error) {
    console.log(error)
    toast.error('Ha ocurrido un error al intentar eliminar su registro...')
    toast.error(error)
  }
}
</script>
