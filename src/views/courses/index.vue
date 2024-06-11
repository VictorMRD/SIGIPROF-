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
                <CardTitle class="text-xl font-bold">{{ document.nombre_curso }}</CardTitle>
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
                  <p>
                    {{ document.descripcion }}
                  </p>
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
  modalidad_institucion: string
  descripcion: string
}

const documents: DocumentInfo[] = [
  {
    id: 1,
    tipo_formacion: 'Taller',
    nombre_curso: 'Introducción a la Inteligencia Artificial',
    anio_curso: '2023',
    horas_totales: '40',
    institucion: 'Universidad Tecnológica Nacional',
    tipo_institucion: ['Universidad', 'Institución Pública'],
    modalidad_institucion: 'Presencial',
    descripcion:
      'Un taller introductorio sobre los conceptos básicos de la inteligencia artificial, incluyendo aprendizaje automático y redes neuronales.'
  },
  {
    id: 2,
    tipo_formacion: 'Curso',
    nombre_curso: 'Desarrollo de Aplicaciones Web',
    anio_curso: '2022',
    horas_totales: '60',
    institucion: 'Instituto de Tecnología de Monterrey',
    tipo_institucion: ['Instituto', 'Institución Privada'],
    modalidad_institucion: 'En línea',
    descripcion:
      'Curso intensivo sobre desarrollo de aplicaciones web modernas utilizando HTML, CSS, JavaScript y frameworks populares.'
  },
  {
    id: 3,
    tipo_formacion: 'Diplomado',
    nombre_curso: 'Ciencia de Datos y Big Data',
    anio_curso: '2024',
    horas_totales: '100',
    institucion: 'Centro de Estudios Superiores en Computación',
    tipo_institucion: ['Centro de Estudios', 'Institución Pública'],
    modalidad_institucion: 'Mixta',
    descripcion:
      'Diplomado que cubre técnicas avanzadas en ciencia de datos, análisis de big data, y herramientas de visualización de datos.'
  },
  {
    id: 4,
    tipo_formacion: 'Certificación',
    nombre_curso: 'Ciberseguridad y Protección de Datos',
    anio_curso: '2021',
    horas_totales: '80',
    institucion: 'Escuela de Ingeniería de la UNAM',
    tipo_institucion: ['Universidad', 'Institución Pública'],
    modalidad_institucion: 'Presencial',
    descripcion:
      'Certificación profesional en ciberseguridad, cubriendo temas de protección de datos, criptografía y políticas de seguridad informática.'
  },
  {
    id: 5,
    tipo_formacion: 'Seminario',
    nombre_curso: 'Tecnologías de la Información y la Comunicación',
    anio_curso: '2023',
    horas_totales: '30',
    institucion: 'Facultad de Ciencias de la Comunicación, Universidad Autónoma de México',
    tipo_institucion: ['Facultad', 'Institución Pública'],
    modalidad_institucion: 'En línea',
    descripcion:
      'Seminario sobre el impacto de las tecnologías de la información y la comunicación en la sociedad moderna, incluyendo estudios de caso y análisis de tendencias.'
  }
]

const copyOfDocuments = ref(documents)
const secondCopyOfDocuments = ref(documents)
const paginatedInformation = ref([])
const totalPages = ref(1)
const totalDocuments = ref(3)
const actualPage = ref(1)
const searchQueryTrack = ref('')

console.log(documents)
console.log(copyOfDocuments.value)
console.log(secondCopyOfDocuments.value)

totalDocuments.value = documents.length
totalPages.value = Math.ceil(documents.length / 8)

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

function deleteElement(deleteElementId) {
  console.log(deleteElementId)
  toast.success('Su registro se ha eliminado con éxito')
}

function filterData(query) {
  const filteredData = secondCopyOfDocuments.value.filter((item) => {
    const searchString = [
      item.nombre_curso,
      item.horas_totales,
      item.tipo_institucion.join(' '),
      item.institucion
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
