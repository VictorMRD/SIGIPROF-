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
        <div class="flex flex-col gap-2">
          <p class="text-3xl font-semibold">Cursos</p>
          <p class="text-xs font-semibold">Explora y gestiona tus cursos</p>
        </div>
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
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <!-- Div que engloba todas las entidades mostradas en el index -->
            <Card
              className="border"
              v-for="document in paginatedInformation"
              v-bind:key="document.name"
              style="
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                border-radius: 4px;
              "
            >
              <CardHeader
                class="border-b border-border bg-muted/40 flex flex-row items-center gap-5 py-2 px-4"
              >
                <div class="flex-1">
                  <p class="text-sm font-semibold">
                    {{ document.nombre ? document.nombre : 'Indefinido' }}
                  </p>
                  <span class="text-sm text-muted-foreground">
                    {{ document.nombre_revista ? document.nombre_revista : 'Indefinido' }}
                  </span>
                </div>
                <div>
                  <p class="text-sm font-semibold text-gray-500">
                    {{ document.anio_curso ? document.anio_curso : '----' }}
                  </p>
                </div>
              </CardHeader>
              <CardContent class="py-2">
                <div class="grid grid-cols-2 gap-2">
                  <p class="text-nowrap w-40 overflow-hidden">
                    <span class="text-sm">ISSN Electronico</span><br />
                    <span class="text-muted-foreground/80">{{
                      document.issn_electronico ? document.issn_electronico : 'Indefinido'
                    }}</span>
                  </p>
                  <p>
                    <span class="text-sm">DOI</span><br />
                    <span class="text-muted-foreground/80">
                      {{ document.doi !== undefined ? document.doi : 'Indefinido' }}
                    </span>
                  </p>
                  <p>
                    <span class="text-sm">Estado</span><br />
                    <span class="text-muted-foreground/80">{{
                      document.estatus ? document.estatus.join(', ') : 'Indefinido'
                    }}</span>
                  </p>
                  <p class="text-nowrap w-40 overflow-hidden">
                    <span class="text-sm">ISSN Electronico</span><br />
                    <span class="text-muted-foreground/80">{{
                      document.issn_impreso ? document.issn_impreso : 'Indefinido'
                    }}</span>
                  </p>
                </div>
              </CardContent>
              <CardFooter
                class="border-t border-border bg-muted/40 flex justify-end gap-3 items-center py-2 px-4"
              >
                <RouterLink
                  :to="`/cursos/${document.id}/download`"
                  class="flex flex-col justify-center items-center"
                >
                  <Button size="icon" variant="outline">
                    <DownloadIcon />
                  </Button>
                </RouterLink>
                <RouterLink
                  :to="`/cursos/${document.id}/agregar-autores`"
                  class="flex flex-col justify-center items-center"
                >
                  <Button size="icon" variant="outline">
                    <PersonIcon />
                  </Button>
                </RouterLink>
                <RouterLink
                  :to="`/cursos/${document.id}/visualizar`"
                  class="flex flex-col justify-center items-center"
                >
                  <Button size="icon" variant="outline">
                    <EyeOpenIcon />
                  </Button>
                </RouterLink>
                <RouterLink
                  :to="`/cursos/${document.id}/editar`"
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
                          ser recuperador de ninguna manera, afectando los registros de otras tablas
                          y la integridad de las mismas.
                        </p>
                      </AlertDialogTitle>
                      <AlertDialogDescription class="h-60 overflow-auto">
                        <div v-for="(value, key) in document" :key="key" class="p-1">
                          <p>
                            <span class="capitalize text-gray-600 font-semibold">{{ key }}</span
                            >: {{ value ? value : 'Indefinido' }}
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
import { PersonIcon } from '@radix-icons/vue'
import { EyeOpenIcon } from '@radix-icons/vue'
import { DownloadIcon } from '@radix-icons/vue'
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

var copyOfDocuments = ref(documents.value)
var secondCopyOfDocuments = ref(documents.value)
const paginatedInformation = ref([])
const totalPages = ref(1)
const totalDocuments = ref(3)
const actualPage = ref(1)
const searchQueryTrack = ref('')

const getCourses = async () => {
  try {
    const res = await axios.get('api/v1/user/courses')
    const courses = res.data

    /* console.log(courses) */
    const processedCourses: DocumentInfo[] = courses.map((publication: any) => ({
      id: publication.id,
      tipo_formacion: publication.tipo_formacion || '',
      nombre: publication.nombre || '',
      anio_curso: publication.anio || '',
      horas_totales: publication.horas_totales || '',
      institucion: publication.institucion || '',
      tipo_institucion: publication.tipo_institucion || ''
    }))
    console.log(processedCourses)

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

totalDocuments.value = documents.value.length
totalPages.value = Math.ceil(documents.value.length / 6)

function paginateInformation(pageIndex) {
  const start = pageIndex * 5
  const end = start + 5
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
