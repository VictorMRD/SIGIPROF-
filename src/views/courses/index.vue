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
          <BreadcrumbPage>Cursos</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
    <div class="py-4 flex flex-col gap-4">
      <div class="flex justify-between">
        <p class="text-3xl font-semibold">Cursos</p>
        <RouterLink :to="`/cursos/crear`">
          <Button class="py-0 px-10">Nuevo</Button>
        </RouterLink>
      </div>
      <div class="flex flex-col gap-4">
        <Input
          placeholder="Buscar curso..."
          type="text"
          class="w-1/3"
          @input="filterData($event.target.value)"
          v-model="searchQueryTrack"
        />
        <div class="flex flex-col gap-2 w-full">
          <div class="flex justify-between text-xs font-semibold text-gray-400">
            <p>Total de documentos: {{ totalDocuments }}</p>
            <p>Pagina: {{ actualPage }} de {{ totalPages }}</p>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card
              className="border"
              v-for="document in paginatedInformation"
              style="display: flex; flex-direction: column; justify-content: space-between"
            >
              <CardHeader>
                <CardTitle class="text-xl font-bold">{{ document.nombre }}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4 justify-center px-8">
                <div className="flex gap-2">
                  <div className="flex items-center gap-2">
                    <ClockIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    <span>{{ document.horas_totales }}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    <span>{{ document.anio_curso }}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <BookmarkIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  <span>{{ document.institucion }}</span>
                </div>
                <div className="prose text-sm pb-4">
                  <!-- Esta caja sirve para marcar un espacio -->
                </div>
              </CardContent>
              <CardFooter
                className="flex gap-2 px-4 p-2 justify-end bg-gray-100 border-t-2 border-gray-200"
              >
                <RouterLink :to="`cursos/${document.id}/editar`">
                  <Button size="sm" class="flex gap-1 items-center">
                    <Pencil2Icon /> Editar
                  </Button>
                </RouterLink>
                <RouterLink :to="`cursos/${document.id}/visualizar`">
                  <Button size="sm" class="flex gap-1 items-center">
                    <EyeOpenIcon /> Visualizar
                  </Button>
                </RouterLink>
                <AlertDialog>
                  <AlertDialogTrigger>
                    <Button
                      variant="outline"
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
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
      <Pagination
        v-slot="{ page }"
        :total="totalDocuments * 1.5"
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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Pencil2Icon } from '@radix-icons/vue'
import { TrashIcon } from '@radix-icons/vue'
import { ClockIcon } from '@radix-icons/vue'
import { CalendarIcon } from '@radix-icons/vue'
import { BookmarkIcon } from '@radix-icons/vue'
import { EyeOpenIcon } from '@radix-icons/vue'
import { Input } from '@/components/ui/input'
import { ref, watch } from 'vue'
import { toast } from 'vue-sonner'
import axios from '@/lib/axios'

/* Fake data */
/* Aqui estaremos haciendo las llamadas a la API */
interface DocumentInfo {
  id: number
  tipo_formacion: string
  nombre_curso: string
  anio_curso: string
  horas_totales: string
  institucion: string
  tipo_institucion: string[]
}

const documents = ref<DocumentInfo[]>([])

const getCourses = async () => {
  try {
    const res = await axios.get('api/v1/user/courses')
    const courses = res.data

    console.log(courses)
    const processedCourses: DocumentInfo[] = courses.map((publication: any) => ({
      id: publication.id,
      tipo_formacion: publication.tipo_formacion || '',
      nombre: publication.nombre || '',
      anio_curso: publication.anio || '',
      horas_totales: publication.horas_totales || '',
      institucion: publication.institucion || '',
      tipo_institucion: publication.tipo_institucion || ''
    }))

    documents.value = processedCourses
    copyOfDocuments = ref(documents.value)
    secondCopyOfDocuments = ref(documents.value)
    paginatedInformation.value = paginateInformation(0)

    totalDocuments.value = documents.value.length
    totalPages.value = Math.ceil(documents.value.length / 6)
  } catch (error) {
    console.error(error)
  }
}

getCourses()

var copyOfDocuments = ref(documents)
var secondCopyOfDocuments = ref(documents)
const paginatedInformation = ref([])
const totalPages = ref(1)
const totalDocuments = ref(3)
const actualPage = ref(1)
const searchQueryTrack = ref('')

totalDocuments.value = documents.length
totalPages.value = Math.ceil(documents.length / 6)

function paginateInformation(pageIndex) {
  const start = pageIndex * 6
  const end = start + 6
  const paginatedInformationPlaceHolder = copyOfDocuments.value.slice(start, end)
  return paginatedInformationPlaceHolder
}

paginatedInformation.value = paginateInformation(0)

function changeData(pageIndex) {
  paginatedInformation.value = paginateInformation(pageIndex - 1)
  actualPage.value = pageIndex
}

async function deleteElement(deleteElementId) {
  try {
    const res = await axios.delete(`api/v1/courses/${deleteElementId}`)
    toast.success('Su registro se ha eliminado con éxito')
    getCourses()
  } catch (error) {
    console.log(error)
    toast.error('Ha ocurrido un error al intentar eliminar su registro...')
  }
}

function filterData(query) {
  const filteredData = secondCopyOfDocuments.value.filter((item) => {
    const searchString = [item.nombre, item.horas_totales, item.tipo_institucion, item.institucion]
      .join(' ')
      .toLowerCase()

    return searchString.includes(query.toLowerCase())
  })

  totalDocuments.value = filteredData.length
  totalPages.value = Math.ceil(filteredData.length / 6)

  copyOfDocuments.value = filteredData
  paginatedInformation.value = paginateInformation(0)
}
</script>
