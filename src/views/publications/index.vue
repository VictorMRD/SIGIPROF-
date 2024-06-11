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
          <BreadcrumbPage>Publicaciones</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
    <div class="py-4 flex flex-col gap-4">
      <div class="flex justify-between">
        <p class="text-3xl font-semibold">Publicaciones</p>
        <RouterLink :to="`/publicaciones/crear`">
          <Button class="py-0 px-10">Nuevo</Button>
        </RouterLink>
      </div>
      <!--       <div>
        <Alert class="w-fit">
          <InfoCircledIcon class="h-4 w-4" />
          <AlertTitle
            >Este año has realizado un total de {{ totalDocuments }} publicaciones</AlertTitle
          >
          <AlertDescription>
            De las cuáles 2 han sido investigaciones en el ámbito educativo <br />
            y 1 en el científico.
          </AlertDescription>
        </Alert>
      </div> -->
      <div class="flex flex-col gap-4">
        <Input
          placeholder="Buscar publicación..."
          type="text"
          class="w-1/3"
          @input="filterData($event.target.value)"
        />
        <div class="flex flex-col gap-2">
          <div class="flex justify-between text-xs font-semibold text-gray-400">
            <p>Total de documentos: {{ totalDocuments }}</p>
            <p>Pagina: {{ actualPage }} de {{ totalPages }}</p>
          </div>
          <div id="cards" class="flex flex-col gap-4">
            <div
              id="card-object"
              class="gap-2 flex flex-col h-fit w-full rounded-md border-2 border-gray-100 border-solid shadow-sm bg-gray-50"
              v-for="document in paginatedInformation"
              :key="document.id"
            >
              <div class="flex items-center gap-2 bg-white p-4 border-b-2 border-gray-100">
                <div
                  class="text-2xl font-bold bg-gray-200 px-4 py-2 rounded-full flex items-center"
                >
                  {{ document.titulo ? document.titulo[0] : 'Undefined' }}
                </div>
                <div class="flex flex-col w-full">
                  <p class="text-lg font-semibold">
                    {{ document.titulo ? document.titulo : 'Undefined' }}
                  </p>
                  <span class="text-gray-600">{{
                    document.nombre_revista ? document.nombre_revista : 'Undefined'
                  }}</span>
                </div>
                <div class="w-1/4 text-nowrap flex justify-end items-center px-10 gap-2">
                  <CalendarIcon />
                  <span class="text-gray-600">{{
                    document.anio_publicacion ? document.anio_publicacion : 'Undefined'
                  }}</span>
                </div>
              </div>

              <div class="flex justify-between w-3/4 gap-2 p-4">
                <div class="flex flex-col justify-between gap-1">
                  <p>
                    <span class="font-semibold">Estado</span><br />
                    <span class="text-gray-600">{{
                      document.estatus ? document.estatus.join(', ') : 'Undefined'
                    }}</span>
                  </p>
                  <p>
                    <span class="font-semibold">Eje de CONAHCYT</span><br />
                    <span class="text-gray-600">
                      {{
                        document.eje_conahcyt
                          ? document.eje_conahcyt.join(', ').replace(/_/g, ' ').substring(0, 25) +
                            (document.eje_conahcyt.join(', ').replace(/_/g, ' ').length > 25
                              ? '...'
                              : '')
                          : 'Undefined'
                      }}
                    </span>
                  </p>
                </div>
                <div class="flex flex-col justify-between gap-1">
                  <p>
                    <span class="font-semibold">Objetivo</span><br />
                    <span class="text-gray-600">
                      {{
                        document.eje_conahcyt
                          ? document.objetivo.join(', ').replace(/_/g, ' ').substring(0, 30) +
                            (document.objetivo.join(', ').replace(/_/g, ' ').length > 30
                              ? '...'
                              : '')
                          : 'Undefined'
                      }}
                    </span>
                  </p>
                  <p class="text-nowrap w-40 overflow-hidden">
                    <span class="font-semibold">Programa CONAHCYT</span><br />
                    <span class="text-gray-600">
                      {{
                        document.programa_conahcyt
                          ? document.programa_conahcyt.join(', ').length > 30
                            ? document.programa_conahcyt.join(', ').slice(0, 30) + '...'
                            : document.programa_conahcyt.join(', ')
                          : 'Undefined'
                      }}
                    </span>
                  </p>
                </div>
                <div class="flex flex-col justify-between gap-1">
                  <p>
                    <span class="font-semibold">Citas A</span><br />
                    <span class="text-gray-600">
                      {{ document.cita_a !== undefined ? document.cita_a : 'Undefined' }}
                    </span>
                  </p>
                  <p>
                    <span class="font-semibold">Citas B</span><br />
                    <span class="text-gray-600">{{
                      document.cita_b !== undefined ? document.cita_b : 'Undefined'
                    }}</span>
                  </p>
                </div>
              </div>
              <div
                class="flex justify-end gap-3 select-none p-4 bg-white border-t-2 border-gray-100"
              >
                <RouterLink
                  :to="`/publicaciones/${document.id}/download`"
                  class="flex flex-col justify-center items-center"
                >
                  <Button size="sm" class="flex gap-1 items-center">
                    <DownloadIcon />
                    <p class="text-xs">Descargar</p>
                  </Button>
                </RouterLink>
                <RouterLink
                  :to="`/publicaciones/${document.id}/agregar-autores`"
                  class="flex flex-col justify-center items-center"
                >
                  <Button size="sm" class="flex gap-1 items-center">
                    <PersonIcon />
                    <p class="text-xs">Autores</p>
                  </Button>
                </RouterLink>
                <RouterLink
                  :to="`/publicaciones/${document.id}/visualizar`"
                  class="flex flex-col justify-center items-center"
                >
                  <Button size="sm" class="flex gap-1 items-center">
                    <EyeOpenIcon />
                    <p class="text-xs">Visualizar</p>
                  </Button>
                </RouterLink>
                <RouterLink
                  :to="`/publicaciones/${document.id}/editar`"
                  class="flex flex-col justify-center items-center"
                >
                  <Button size="sm" class="flex gap-1 items-center">
                    <Pencil2Icon />
                    <p class="text-xs">Editar</p>
                  </Button>
                </RouterLink>
                <AlertDialog>
                  <AlertDialogTrigger>
                    <Button
                      size="sm"
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
                          Esta acción no puede deshacerse, y una vez eliminada el registro no podrá
                          ser recuperador de ninguna manera, afectando los registros de otras tablas
                          y la integridad de las mismas.
                        </p>
                      </AlertDialogTitle>
                      <AlertDialogDescription class="h-60 overflow-auto">
                        <div v-for="(value, key) in document" :key="key" class="p-1">
                          <p>
                            <span class="capitalize text-gray-600 font-semibold">{{ key }}</span
                            >: {{ value ? value : 'Undefined' }}
                          </p>
                        </div>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction @click="deleteElement(document.id)">
                        Confirmar
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Pagination
        v-slot="{ page }"
        :total="totalDocuments * 2"
        :sibling-count="1"
        show-edges
        :default-page="1"
      >
        <PaginationList v-slot="{ items }" class="flex items-center gap-1">
          <PaginationFirst @click="changeData(1)" />
          <PaginationPrev @click="changeData(actualPage - 1)" />

          <template v-for="(item, index) in items">
            <PaginationListItem
              v-if="item.type === 'page'"
              :key="index"
              :value="item.value"
              as-child
            >
              <Button
                class="w-10 h-10 p-0"
                :variant="item.value === page ? 'default' : 'outline'"
                @click="changeData(item.value)"
              >
                {{ item.value }}
              </Button>
            </PaginationListItem>
            <PaginationEllipsis v-else :key="item.type" :index="index" />
          </template>
          <PaginationNext @click="changeData(actualPage + 1)" />
          <PaginationLast @click="changeData(1)" />
        </PaginationList>
      </Pagination>
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
import {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev
} from '@/components/ui/pagination'
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
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { InfoCircledIcon } from '@radix-icons/vue'
import { Pencil2Icon } from '@radix-icons/vue'
import { TrashIcon } from '@radix-icons/vue'
import { PersonIcon } from '@radix-icons/vue'
import { EyeOpenIcon } from '@radix-icons/vue'
import { DownloadIcon } from '@radix-icons/vue'
import { CalendarIcon } from '@radix-icons/vue'
import { Input } from '@/components/ui/input'
import { ref } from 'vue'
import { toast } from 'vue-sonner'
import axios from '@/lib/axios'

/* Fake data */
/* Aqui estaremos haciendo las llamadas a la API */
interface DocumentInfo {
  id: number1
  issn_tipo: string
  issn_impreso: string
  issn_electronico: string
  doi: string
  nombre_revista: string
  titulo: string[]
  anio_publicacion: number
  recibio_apoyo_conahcyt: boolean
  programa_conahcyt: string[]
  estatus: string[]
  objetivo: string[]
  url_cita: string[]
  cita_a: number
  cita_b: number
  total_citas: string[]
  eje_conahcyt: string[]
}

const documents = ref<DocumentInfo[]>([])

var copyOfDocuments = ref(documents.value)
var secondCopyOfDocuments = ref(documents.value)
const paginatedInformation = ref([])
const totalPages = ref(1)
const totalDocuments = ref(3)
const actualPage = ref(1)

const getPublications = async () => {
  try {
    const res = await axios.get('api/v1/user/publications')
    const publications = res.data

    console.log(publications)
    const processedPublications: DocumentInfo[] = publications.map((publication: any) => ({
      id: publication.id,
      issn_tipo: publication.issn_tipo || '',
      issn_impreso: publication.issn_impreso || '',
      issn_electronico: publication.issn_electronico || '',
      doi: publication.doi || '',
      nombre_revista: publication.nombre_revista || '',
      titulo: publication.titulo ? publication.titulo : [],
      anio_publicacion: publication.anio_publicacion || 0,
      recibio_apoyo_conahcyt: publication.recibio_apoyo_conahcyt || false,
      programa_conahcyt: publication.programa_conahcyt
        ? publication.programa_conahcyt.split(',')
        : [],
      estatus: publication.estatus ? publication.estatus.split(',') : [],
      objetivo: publication.objetivo ? publication.objetivo.split(',') : [],
      url_cita: publication.url_cita ? publication.url_cita.split(',') : [],
      cita_a: publication.cita_a || 0,
      cita_b: publication.cita_b || 0,
      total_citas: publication.total_citas ? publication.total_citas : [],
      eje_conahcyt: publication.eje_conahcyt ? publication.eje_conahcyt.split(',') : []
    }))

    documents.value = processedPublications
    copyOfDocuments = ref(documents.value)
    secondCopyOfDocuments = ref(documents.value)
    paginatedInformation.value = paginateInformation(0)

    totalDocuments.value = documents.value.length
    totalPages.value = Math.ceil(documents.value.length / 5)
  } catch (error) {
    console.error(error)
  }
}

getPublications()

function paginateInformation(pageIndex) {
  const start = pageIndex * 5
  const end = start + 5
  const paginatedInformationPlaceHolder = copyOfDocuments.value.slice(start, end)
  return paginatedInformationPlaceHolder
}

function changeData(pageIndex) {
  paginatedInformation.value = paginateInformation(pageIndex - 1)
  actualPage.value = pageIndex
}

async function deleteElement(deleteElementId) {
  try {
    const res = await axios.delete(`api/v1/users/publications/${deleteElementId}`)
    toast.success('Su registro se ha eliminado con éxito')
    getPublications()
  } catch (error) {
    console.log(error)
    toast.error('Ha ocurrido un error al intentar eliminar su registro...')
    toast.error(error)
  }
}

function filterData(query) {
  const filteredData = secondCopyOfDocuments.value.filter((item) => {
    const searchString = [
      item.titulo,
      item.estatus,
      item.objetivo,
      item.cita_a,
      item.cita_b,
      item.eje_conahcyt,
      item.programa_conahcyt
    ]
      .join(' ')
      .toLowerCase()

    return searchString.includes(query.toLowerCase())
  })

  totalDocuments.value = filteredData.length
  totalPages.value = Math.ceil(filteredData.length / 8)

  copyOfDocuments.value = filteredData
  paginatedInformation.value = paginateInformation(0)
}
</script>
