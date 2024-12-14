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
      <div class="flex flex-col gap-4">
        <Input
          placeholder="Buscar publicación..."
          type="text"
          class="w-1/3"
          @input="filterData($event.target.value)"
        />
        <div class="flex justify-between text-sm text-muted-foreground">
          <p>Total de documentos: {{ totalDocuments }}</p>
          <p>Pagina: {{ actualPage }} de {{ totalPages }}</p>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <Card v-for="document in paginatedInformation" :key="document.id">
            <CardHeader
              class="border-b border-border bg-muted/40 flex flex-row items-center gap-5 h-20 py-0 px-4"
            >
              <div
                class="text-2xl font-semibold bg-muted-foreground/20 h-12 w-12 rounded-full flex items-center justify-center"
              >
                {{ document.titulo ? document.titulo[0] : 'Undefined' }}
              </div>
              <div class="flex-1">
                <p>
                  {{ document.titulo ? document.titulo : 'Undefined' }}
                </p>
                <span class="text-sm text-muted-foreground">
                  {{ document.nombre_revista ? document.nombre_revista : 'Undefined' }}
                </span>
              </div>
              <div class="text-nowrap flex justify-end items-center gap-2">
                <CalendarIcon />
                <span class="text-muted-foreground text-sm">
                  {{ document.anio_publicacion ? document.anio_publicacion : 'Undefined' }}
                </span>
              </div>
            </CardHeader>
            <CardContent class="py-10">
              <div class="grid grid-cols-3 gap-4">
                <p>
                  <span class="font-semibold">DOI</span><br />
                  <span class="text-muted-foreground/80">
                    {{ document.doi !== undefined ? document.doi : 'Undefined' }}
                  </span>
                </p>
                <p>
                  <span class="font-semibold">Año de publicación</span><br />
                  <span class="text-muted-foreground/80">{{
                    document.anio_publicacion !== undefined
                      ? document.anio_publicacion
                      : 'Undefined'
                  }}</span>
                </p>
                <p class="text-nowrap w-40 overflow-hidden">
                  <span class="font-semibold">ISSN Electronico</span><br />
                  <span class="text-muted-foreground/80">{{
                    document.issn_electronico ? document.issn_electronico : 'Undefined'
                  }}</span>
                </p>
                <p class="text-nowrap w-40 overflow-hidden">
                  <span class="font-semibold">ISSN Electronico</span><br />
                  <span class="text-muted-foreground/80">{{
                    document.issn_impreso ? document.issn_impreso : 'Undefined'
                  }}</span>
                </p>
                <p>
                  <span class="font-semibold">Estado</span><br />
                  <span class="text-muted-foreground/80">{{
                    document.estatus ? document.estatus.join(', ') : 'Undefined'
                  }}</span>
                </p>
              </div>
            </CardContent>
            <CardFooter
              class="border-t border-border bg-muted/40 flex justify-end gap-3 items-center py-0 px-4 h-20"
            >
              <RouterLink
                :to="`/publicaciones/${document.id}/download`"
                class="flex flex-col justify-center items-center"
              >
                <Button size="icon" variant="outline">
                  <DownloadIcon />
                </Button>
              </RouterLink>
              <RouterLink
                :to="`/publicaciones/${document.id}/agregar-autores`"
                class="flex flex-col justify-center items-center"
              >
                <Button size="icon" variant="outline">
                  <PersonIcon />
                </Button>
              </RouterLink>
              <RouterLink
                :to="`/publicaciones/${document.id}/visualizar`"
                class="flex flex-col justify-center items-center"
              >
                <Button size="icon" variant="outline">
                  <EyeOpenIcon />
                </Button>
              </RouterLink>
              <RouterLink
                :to="`/publicaciones/${document.id}/editar`"
                class="flex flex-col justify-center items-center"
              >
                <Button size="icon" variant="outline">
                  <Pencil2Icon />
                </Button>
              </RouterLink>
              <AlertDialog>
                <AlertDialogTrigger>
                  <Button size="icon" variant="destructive">
                    <TrashIcon />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle
                      >¿Estas completamente seguro de que quieres eliminar este elemento?
                      <p class="text-sm font-normal">
                        Esta acción no puede deshacerse, y una vez eliminada el registro no podrá
                        ser recuperador de ninguna manera, afectando los registros de otras tablas y
                        la integridad de las mismas.
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
                    <AlertDialogCancel
                      class="bg-white-500 text-black hover:bg-gray-200 dark:hover:bg-gray-300 dark:bg-white border dark:hover:text-black"
                      >Cancelar</AlertDialogCancel
                    >
                    <AlertDialogAction
                      @click="deleteElement(document.id)"
                      class="dark:hover:bg-slate-950 hover:bg-slate-800 dark:bg-black text-white"
                    >
                      Confirmar
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          </Card>
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
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'

/* Fake data */
/* Aqui estaremos haciendo las llamadas a la API */
interface DocumentInfo {
  id: number
  issn_tipo: string
  issn_impreso: string
  issn_electronico: string
  doi: string
  nombre_revista: string
  titulo: string[]
  anio_publicacion: number
  estatus: string[]
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
      estatus: publication.estatus ? publication.estatus.split(',') : []
    }))
    console.log(processedPublications)

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
    const res = await axios.delete(`api/v1/publications/${deleteElementId}`)
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
    const searchString = [item.titulo, item.estatus].join(' ').toLowerCase()

    return searchString.includes(query.toLowerCase())
  })

  totalDocuments.value = filteredData.length
  totalPages.value = Math.ceil(filteredData.length / 8)

  copyOfDocuments.value = filteredData
  paginatedInformation.value = paginateInformation(0)
}
</script>
