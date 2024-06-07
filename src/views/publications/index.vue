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
      <div>
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
      </div>
      <div class="flex flex-col gap-4">
        <Input placeholder="Buscar publicación..." type="text" class="w-1/3" />
        <div class="flex flex-col gap-2">
          <div class="flex justify-between text-xs font-semibold text-gray-400">
            <p>Total de documentos: {{ totalDocuments }}</p>
            <p>Pagina: {{ actualPage }} de {{ totalPages }}</p>
          </div>
          <div id="cards" class="flex flex-col gap-4">
            <div
              id="card-object"
              class="gap-2 flex flex-col h-fit w-full px-4 py-2 rounded-md border-2 border-gray-100 border-solid shadow-sm"
              v-for="document in paginatedInformation"
              :key="document.id"
            >
              <p class="text-xl font-semibold">
                {{ document.titulo ? document.titulo : 'Undefined' }}
              </p>
              <div class="flex justify-between w-3/4 gap-2">
                <div class="flex flex-col justify-between gap-1">
                  <p>Estado: {{ document.estado ? document.estado : 'Undefined' }}</p>
                  <p>Area: {{ document.area ? document.area : 'Undefined' }}</p>
                  <p>
                    Publicación:
                    {{ document.fechaPublicacion ? document.fechaPublicacion : 'Undefined' }}
                  </p>
                </div>
                <div class="flex flex-col justify-between gap-1">
                  <p>Autor: {{ document.autor ? document.autor : 'Undefined' }}</p>
                  <p>
                    Referencias:
                    {{ document.referencias ? document.referencias.length : 'Undefined' }}
                  </p>
                  <p class="text-nowrap">
                    Rol de participación:
                    {{ document.rolParticipacion ? document.rolParticipacion : 'Undefined' }}
                  </p>
                </div>
                <div class="flex flex-col justify-between gap-1">
                  <p>
                    Participantes:
                    {{ document.participantes ? document.participantes.length : 'Undefined' }}
                  </p>
                </div>
              </div>
              <div class="flex justify-end gap-3 select-none">
                <RouterLink
                  :to="`/publicaciones/${document.id}/download`"
                  class="flex flex-col justify-center items-center"
                >
                  <div
                    class="border-2 border-gray-300 border-solid-2 p-3 rounded-full hover:bg-gray-100 transition-all duration-300"
                  >
                    <DownloadIcon />
                  </div>
                  <p class="text-xs">Descargar</p>
                </RouterLink>
                <RouterLink
                  :to="`/publicaciones/${document.id}/visualizar`"
                  class="flex flex-col justify-center items-center"
                >
                  <div
                    class="border-2 border-gray-300 border-solid-2 p-3 rounded-full hover:bg-gray-100 transition-all duration-300"
                  >
                    <EyeOpenIcon />
                  </div>
                  <p class="text-xs">Visualizar</p>
                </RouterLink>
                <RouterLink
                  :to="`/publicaciones/${document.id}/editar`"
                  class="flex flex-col justify-center items-center"
                >
                  <div
                    class="border-2 border-gray-300 border-solid-2 p-3 rounded-full hover:bg-gray-100 transition-all duration-300"
                  >
                    <Pencil2Icon />
                  </div>
                  <p class="text-xs">Editar</p>
                </RouterLink>
                <AlertDialog>
                  <AlertDialogTrigger>
                    <div
                      class="border-2 border-gray-300 border-solid-2 p-3 rounded-full hover:bg-gray-100 transition-all duration-300"
                    >
                      <TrashIcon />
                    </div>
                    <p class="text-xs">Eliminar</p></AlertDialogTrigger
                  >
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
          <PaginationFirst />
          <PaginationPrev />

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
          <PaginationNext />
          <PaginationLast />
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
import { DownloadIcon } from '@radix-icons/vue'
import { TrashIcon } from '@radix-icons/vue'
import { EyeOpenIcon } from '@radix-icons/vue'
import { Input } from '@/components/ui/input'
import { ref } from 'vue'
import { toast } from 'vue-sonner'

/* Fake data */
/* Aqui estaremos haciendo las llamadas a la API */
interface DocumentInfo {
  titulo: string
  estado: string
  area: string
  fechaPublicacion: string
  autor: string
  referencias: string[]
  rolParticipacion: string
  participantes: string[]
}
const documents: DocumentInfo[] = [
  {
    id: 1,
    titulo: 'Desarrollo de Inteligencia Artificial en la Era Moderna',
    estado: 'Publicado',
    area: 'Tecnología',
    fechaPublicacion: '2024-05-20',
    autor: 'Dr. Juan Pérez',
    referencias: [
      'Artículo de la revista IA Avanzada, 2023',
      'Conferencia Internacional de Tecnología, 2022',
      "Libro: 'Futuro de la IA', 2021"
    ],
    rolParticipacion: 'Investigador Principal',
    participantes: ['María López', 'Carlos García', 'Ana Rodríguez', 'Luis Fernández']
  },
  {
    id: 2,
    titulo: 'Avances en Medicina Genómica',
    estado: 'Publicado',
    area: 'Salud',
    fechaPublicacion: '2024-02-10',
    autor: 'Dr. Ricardo Sánchez',
    referencias: [
      'Revista de Medicina Moderna, 2022',
      'Conferencia de Genómica, 2023',
      "Libro: 'Genética y Salud', 2020"
    ],
    rolParticipacion: 'Investigador Asociado',
    participantes: ['Marta Ruiz', 'Jorge Ramírez', 'Sofía Torres', 'Esteban Morales']
  },
  {
    id: 3,
    titulo: 'Economía Digital y su Impacto Global',
    estado: 'En Proceso',
    area: 'Economía',
    fechaPublicacion: '2024-08-05',
    autor: 'Dr. Alberto Gómez',
    referencias: [
      'Estudio del Banco Mundial, 2022',
      'Informe de la OCDE, 2023',
      'Artículo en la revista Economía Digital, 2021'
    ],
    rolParticipacion: 'Coordinador',
    participantes: ['Clara Fernández', 'José Luis Pérez', 'Raquel Moreno']
  },
  {
    id: 4,
    titulo: 'Innovaciones en Energía Renovable',
    estado: 'Publicado',
    area: 'Energía',
    fechaPublicacion: '2023-11-25',
    autor: 'Dra. Laura Muñoz',
    referencias: [
      'Conferencia de Energía Limpia, 2022',
      'Artículo en la revista Energía y Futuro, 2021',
      'Estudio de la Agencia Internacional de Energía, 2023'
    ],
    rolParticipacion: 'Autora Principal',
    participantes: ['Sergio Vargas', 'Patricia Delgado', 'Andrés Gómez']
  },
  {
    id: 5,
    titulo: 'Tecnologías de la Información en la Educación',
    estado: 'Publicado',
    area: 'Educación',
    fechaPublicacion: '2024-03-10',
    autor: 'Dra. Cecilia Ruiz',
    referencias: [
      'Revista de Tecnología Educativa, 2023',
      'Conferencia Internacional sobre Educación y Tecnología, 2022',
      'Estudio del Ministerio de Educación, 2021'
    ],
    rolParticipacion: 'Investigadora Principal',
    participantes: ['Francisco Jiménez', 'Isabel García', 'Javier Martín']
  },
  {
    id: 6,
    titulo: 'Desafíos de la Ciberseguridad en el Siglo XXI',
    estado: 'En Revisión',
    area: 'Seguridad',
    fechaPublicacion: '2024-01-15',
    autor: 'Dr. Alejandro Castro',
    referencias: [
      'Conferencia de Ciberseguridad, 2023',
      'Artículo en la revista Seguridad Informática, 2022',
      'Informe de la Agencia Nacional de Ciberseguridad, 2021'
    ],
    rolParticipacion: 'Coautor',
    participantes: ['Elena Muñoz', 'Miguel Torres', 'Sara Díaz']
  },
  {
    id: 7,
    titulo: 'Innovaciones en Biotecnología Agrícola',
    estado: 'Publicado',
    area: 'Biotecnología',
    fechaPublicacion: '2024-04-22',
    autor: 'Dra. Sofía Morales',
    referencias: [
      'Revista de Biotecnología, 2023',
      'Conferencia de Innovación Agrícola, 2022',
      "Libro: 'Biotecnología y Agricultura', 2020"
    ],
    rolParticipacion: 'Investigadora Asociada',
    participantes: ['Alberto Sánchez', 'Cristina Romero', 'Javier Molina']
  },
  {
    id: 8,
    titulo: 'Nuevas Tendencias en el Diseño Urbano',
    estado: 'En Proceso',
    area: 'Arquitectura',
    fechaPublicacion: '2024-06-30',
    autor: 'Arq. Roberto Hernández',
    referencias: [
      'Estudio de Diseño Urbano, 2023',
      'Revista de Arquitectura Moderna, 2022',
      'Informe del Instituto de Urbanismo, 2021'
    ],
    rolParticipacion: 'Coordinador',
    participantes: ['Lorena Navarro', 'David Ruiz', 'Sonia Martínez']
  },
  {
    id: 9,
    titulo: 'Evolución de las Energías Limpias',
    estado: 'Publicado',
    area: 'Energía',
    fechaPublicacion: '2024-05-18',
    autor: 'Ing. Pablo Domínguez',
    referencias: [
      'Conferencia de Energías Renovables, 2023',
      'Artículo en la revista Energía Sostenible, 2022',
      'Informe del Consejo de Energía, 2021'
    ],
    rolParticipacion: 'Autor Principal',
    participantes: ['Valeria Ortega', 'Tomás Pérez', 'Gabriela Sánchez']
  },
  {
    id: 10,
    titulo: 'Estudio de la Biodiversidad en Ecosistemas Marinos',
    estado: 'En Revisión',
    area: 'Biología',
    fechaPublicacion: '2024-02-25',
    autor: 'Dra. Marina Alonso',
    referencias: [
      'Revista de Biología Marina, 2023',
      'Conferencia Internacional de Ecosistemas, 2022',
      'Informe del Instituto de Investigación Marina, 2021'
    ],
    rolParticipacion: 'Coautora',
    participantes: ['Julio Fernández', 'Nuria López', 'Diego Moreno']
  },
  {
    id: 11,
    titulo: 'Avances en Robótica y Automatización',
    estado: 'Publicado',
    area: 'Ingeniería',
    fechaPublicacion: '2024-04-05',
    autor: 'Dr. Manuel Ortega',
    referencias: [
      'Conferencia de Robótica, 2023',
      'Revista de Automatización Industrial, 2022',
      "Libro: 'Futuro de la Robótica', 2020"
    ],
    rolParticipacion: 'Investigador Principal',
    participantes: ['Alejandro García', 'Clara Martínez', 'Juan Sánchez']
  },
  {
    id: 12,
    titulo: 'Estudio de la Migración y sus Efectos Socioeconómicos',
    estado: 'En Proceso',
    area: 'Sociología',
    fechaPublicacion: '2024-07-10',
    autor: 'Dra. Rosa Gutiérrez',
    referencias: [
      'Revista de Sociología, 2023',
      'Conferencia Internacional sobre Migración, 2022',
      'Informe del Instituto de Estudios Sociales, 2021'
    ],
    rolParticipacion: 'Investigadora Principal',
    participantes: ['Mario Castillo', 'Paula Rivas', 'Rodrigo Morales']
  },
  {
    id: 13,
    titulo: 'Innovación en el Transporte Público Urbano',
    estado: 'Publicado',
    area: 'Transporte',
    fechaPublicacion: '2024-01-28',
    autor: 'Ing. Javier Domínguez',
    referencias: [
      'Conferencia de Transporte Urbano, 2023',
      'Revista de Movilidad Sostenible, 2022',
      'Informe del Ministerio de Transporte, 2021'
    ],
    rolParticipacion: 'Autor Principal',
    participantes: ['Ana Rivera', 'Carlos Martínez', 'Elena Vázquez']
  },
  {
    id: 14,
    titulo: 'Estudio del Impacto de la Inteligencia Emocional en el Trabajo',
    estado: 'En Revisión',
    area: 'Psicología',
    fechaPublicacion: '2024-03-15',
    autor: 'Dra. Laura Castillo',
    referencias: [
      'Revista de Psicología Laboral, 2023',
      'Conferencia sobre Inteligencia Emocional, 2022',
      'Informe del Instituto de Psicología Aplicada, 2021'
    ],
    rolParticipacion: 'Coautora',
    participantes: ['Raúl González', 'Verónica Muñoz', 'Estefanía Ortega']
  },
  {
    id: 15,
    titulo: 'Impacto del Cambio Climático en la Agricultura',
    estado: 'En Revisión',
    area: 'Medio Ambiente',
    fechaPublicacion: '2023-12-15',
    autor: 'Dra. Elena Martínez',
    referencias: [
      'Estudio de la Universidad de Agricultura, 2022',
      'Informe del IPCC, 2021',
      'Artículo en la revista Clima y Sociedad, 2023'
    ],
    rolParticipacion: 'Coautora',
    participantes: ['Pedro González', 'Lucía Hernández', 'Fernando Torres']
  }
]

const paginatedInformation = ref([])
const totalPages = ref(1)
const totalDocuments = ref(3)
const actualPage = ref(1)

totalDocuments.value = documents.length
totalPages.value = Math.ceil(documents.length / 5)

function paginateInformation(pageIndex) {
  const start = pageIndex * 5
  const end = start + 5
  const paginatedInformationPlaceHolder = documents.slice(start, end)
  return paginatedInformationPlaceHolder
}

paginatedInformation.value = paginateInformation(0)

function changeData(pageIndex) {
  paginatedInformation.value = paginateInformation(pageIndex - 1)
  console.log(paginatedInformation.value)
  actualPage.value = pageIndex
}

function deleteElement(deleteElementId) {
  console.log(deleteElementId)
  toast.success('Su registro se ha eliminado con éxito')
}
</script>
