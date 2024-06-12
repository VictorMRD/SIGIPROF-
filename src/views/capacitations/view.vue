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
          <RouterLink to="/capacitaciones" title="Boton para el index Capacitaciones">
            <BreadcrumbLink>Capacitaciones </BreadcrumbLink>
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
          <RouterLink :to="`/capacitaciones`">
            <Button class="py-0 px-10">Regresar</Button>
          </RouterLink>
          <RouterLink :to="`/capacitaciones/${dataId}/editar`">
            <Button class="py-0 px-10">Editar</Button>
          </RouterLink>
        </div>
      </div>
    </div>
    <div className="bg-white dark:bg-gray-950 rounded-lg shadow-lg p-6 md:p-8  mx-auto">
      <div class="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h1 class="text-2xl font-bold mb-1">{{ capacitacion.nombre_capacitacion }}</h1>
          <div class="flex items-center space-x-4">
            <div
              class="px-3 py-1 rounded-full bg-green-100 text-green-600 font-medium text-sm dark:bg-green-900/20 dark:text-green-400"
            >
              Certificación: {{ capacitacion.certificacion ? 'Sí' : 'No' }}
            </div>
            <span class="text-gray-500">Horas Totales: {{ capacitacion.horas_totales }}</span>
          </div>
        </div>
        <div class="mt-4 md:mt-0 text-sm text-gray-500 dark:text-gray-400">
          <div>Año de la capacitaciones: {{ capacitacion.anio_curso }}</div>
          <div>Costo: {{ capacitacion.costo }}</div>
          <div>Nivel de Especialización: {{ capacitacion.nivel_especializacion }}</div>
        </div>
      </div>
      <div class="prose prose-gray max-w-none dark:prose-invert border p-4 rounded-md my-4">
        <p class="text-gray-800 font-semibold">Objetivo:</p>
        <p>{{ capacitacion.objetivo }}</p>
      </div>
      <div class="prose prose-gray max-w-none dark:prose-invert border p-4 rounded-md my-4">
        <p class="text-gray-800 font-semibold">Descripción:</p>
        <p>{{ capacitacion.descripcion }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { ref } from 'vue'

/* const route = useRoute() */
/* const dataId = route.params.id */
const capacitaciones = ref([])

const capacitacion = ref({})

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
  const fakeCapacitations = ref([])
  const modalidadesInstitucion = ['En Línea', 'Semipresencial', 'Presencial']
  const nivelesEspecializacion = ['Básico', 'Avanzado']

  for (let i = 0; i < count; i++) {
    const nivel = nivelesEspecializacion[Math.floor(Math.random() * nivelesEspecializacion.length)]
    const modalidad =
      modalidadesInstitucion[Math.floor(Math.random() * modalidadesInstitucion.length)]
    fakeCapacitations.value = {
      id: i + 1,
      nombre_capacitacion: `Nombre de capacitacion ${i + 1}`,
      horas_totales: `${Math.floor(Math.random() * (3 - 10 + 1)) + 100}`,
      anio_curso: `${Math.floor(Math.random() * (2024 - 1900 + 1)) + 1900}`,
      objetivo: `Objetivo ${i + 1}`,
      nivel_especializacion: nivel,
      certificacion: true,
      costo: `${Math.floor(Math.random() * (20000 - 5000 + 1)) + 20000}`,
      descripcion: generateRandomDescription()
    }
  }

  return fakeCapacitations.value
}

capacitacion.value = generateFakeCapacitations(1)
</script>
