<template>
  <div class="p-8">
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <RouterLink to="/" title="Boton para el index Capacitaciones">
            <BreadcrumbLink>Inicio </BreadcrumbLink>
          </RouterLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Capacitaciones</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
    <div class="py-4 flex flex-col gap-4">
      <div class="flex justify-between">
        <p class="text-3xl font-semibold">Capacitaciones</p>
        <RouterLink :to="`/capacitaciones/crear`">
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
            <Card
              className="border"
              v-for="document in paginatedInformation"
              style="
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                height: 480px;
              "
            >
              <CardHeader>
                <CardTitle class="text-xl font-bold">{{ document.nombre_capacitacion }}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col justify-start items-start h-full gap-4 px-8">
                <div className="flex gap-4 flex-wrap">
                  <div className="flex items-center gap-2">
                    <ClockIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    <span>{{ document.horas_totales }}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    <span>{{ document.anio_curso }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <BookmarkIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    <span>{{ document.nivel_especializacion }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <CubeIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    <span>${{ document.costo }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <ReaderIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    <span>{{ document.certificacion ? 'Certificado' : 'No certificado' }}</span>
                  </div>
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
                <RouterLink :to="`capacitaciones/${document.id}/editar`">
                  <Button size="sm" class="flex gap-1 items-center">
                    <Pencil2Icon /> Editar
                  </Button>
                </RouterLink>
                <RouterLink :to="`capacitaciones/${document.id}/visualizar`">
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
import { CubeIcon } from '@radix-icons/vue'
import { ReaderIcon } from '@radix-icons/vue'
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
  modalidad_institucion: string
  descripcion: string
}

const documents = ref<DocumentInfo[]>([])

const generateRandomDescription = (): string => {
  const descriptions = [
    'Este curso proporciona una visión detallada del vasto y emocionante mundo de la programación web. Desde los fundamentos básicos hasta los conceptos más avanzados, aprenderás a construir sitios web dinámicos y atractivos utilizando las tecnologías más populares del mercado. Con ejemplos prácticos y proyectos reales, este curso te preparará para enfrentar los desafíos del desarrollo web moderno.',
    'Sumérgete en el fascinante campo de la inteligencia artificial y el aprendizaje automático con este curso avanzado. Explora algoritmos sofisticados y técnicas de vanguardia que te permitirán desarrollar sistemas inteligentes capaces de aprender y adaptarse por sí mismos. Desde el procesamiento de lenguaje natural hasta la visión por computadora, este curso te llevará a la vanguardia de la innovación en inteligencia artificial.',
    'Conviértete en un experto en diseño gráfico con esta completa guía que cubre todos los aspectos del proceso creativo. Desde los principios básicos del diseño hasta las últimas tendencias en diseño digital, este curso te proporcionará las habilidades y conocimientos necesarios para crear obras maestras visuales impactantes. Aprende a utilizar herramientas populares como Adobe Photoshop, Illustrator y InDesign, y descubre cómo aplicar técnicas avanzadas para llevar tus diseños al siguiente nivel.',
    'Descubre las estrategias más efectivas para promocionar tu negocio en el mundo digital con este curso práctico sobre marketing digital. Aprende a aprovechar al máximo las redes sociales, el SEO, el marketing de contenidos y otras herramientas y técnicas modernas para llegar a tu audiencia objetivo y convertir prospectos en clientes. Con estudios de casos reales y ejemplos prácticos, este curso te ayudará a desarrollar una estrategia de marketing digital sólida y efectiva.',
    'Este curso te introducirá en el apasionante mundo de la gestión de proyectos ágiles, una metodología que está transformando la forma en que se desarrollan y entregan los proyectos en la actualidad. Aprenderás los principios fundamentales de los marcos de trabajo ágiles como Scrum y Kanban, así como las mejores prácticas para planificar, ejecutar y controlar proyectos de manera ágil. Con ejercicios prácticos y estudios de casos reales, este curso te preparará para liderar equipos y proyectos de manera efectiva en un entorno ágil y dinámico.'
  ]

  // Selecciona aleatoriamente una descripción del arreglo
  const randomIndex = Math.floor(Math.random() * descriptions.length)
  return descriptions[randomIndex]
}

const generateFakeCapacitations = (count: number): DocumentInfo[] => {
  const fakeCapacitations: DocumentInfo[] = []
  const modalidadesInstitucion = ['En Línea', 'Semipresencial', 'Presencial']
  const nivelesEspecializacion = ['Básico', 'Avanzado']

  for (let i = 0; i < count; i++) {
    const nivel = nivelesEspecializacion[Math.floor(Math.random() * nivelesEspecializacion.length)]
    const modalidad =
      modalidadesInstitucion[Math.floor(Math.random() * modalidadesInstitucion.length)]
    fakeCapacitations.push({
      id: i + 1,
      nombre_capacitacion: `Nombre de capacitacion ${i + 1}`,
      horas_totales: `${Math.floor(Math.random() * (3 - 10 + 1)) + 100}`,
      anio_curso: `${Math.floor(Math.random() * (2024 - 1900 + 1)) + 1900}`,
      objetivo: `Objetivo ${i + 1}`,
      nivel_especializacion: nivel,
      certificacion: true,
      costo: `${Math.floor(Math.random() * (20000 - 5000 + 1)) + 20000}`,
      descripcion: generateRandomDescription()
    })
  }

  return fakeCapacitations
}

// Uso del generador de información falsa
const fakeCapacitations = generateFakeCapacitations(20)

const getCapacitations = async () => {
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
      tipo_institucion: publication.tipo_institucion || '',
      modalidad_institucion: publication.modalidad_institucion || '',
      descripcion: publication.descripcion || ''
    }))

    documents.value = processedCourses
    copyOfDocuments = ref(documents.value)
    secondCopyOfDocuments = ref(documents.value)
    paginatedInformation.value = paginateInformation(0)

    totalDocuments.value = documents.value.length
    totalPages.value = Math.ceil(documents.value.length / 8)
  } catch (error) {
    console.error(error)
  }
}

/* getCapacitations() */

documents.value = fakeCapacitations

var copyOfDocuments = ref(documents.value)
var secondCopyOfDocuments = ref(documents.value)
const paginatedInformation = ref([])
paginatedInformation.value = paginateInformation(0)
const totalPages = ref(1)
const totalDocuments = ref(3)
const actualPage = ref(1)
const searchQueryTrack = ref('')

totalDocuments.value = documents.value.length
totalPages.value = Math.ceil(documents.value.length / 8)

function paginateInformation(pageIndex) {
  const start = pageIndex * 8
  const end = start + 8
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
    getCapacitations()
  } catch (error) {
    console.log(error)
    toast.error('Ha ocurrido un error al intentar eliminar su registro...')
  }
}

function filterData(query) {
  const filteredData = secondCopyOfDocuments.value.filter((item) => {
    const searchString = [
      item.nombre_capacitacion,
      item.horas_totales,
      item.costo,
      item.descripcion
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
