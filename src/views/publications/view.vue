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
            <Button class="py-0 px-10">Regresar</Button>
          </RouterLink>
          <RouterLink :to="`/publicaciones/${appointmentId}/editar`">
            <Button class="py-0 px-10">Editar</Button>
          </RouterLink>
        </div>
      </div>
    </div>
    <div className="bg-white dark:bg-gray-950 rounded-lg shadow-lg p-6 md:p-8  mx-auto">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Example Title</h1>
          <div className="flex items-center space-x-4">
            <div
              className="px-3 py-1 rounded-full bg-green-100 text-green-600 font-medium text-sm dark:bg-green-900/20 dark:text-green-400"
            >
              Publicado
            </div>
            <div className="text-gray-500 dark:text-gray-400 text-sm">by John Doe</div>
          </div>
        </div>
        <div className="mt-4 md:mt-0 text-sm text-gray-500 dark:text-gray-400">
          <div>Area de trabajo: Tecnología</div>
          <div>Rol de participacion: Autor</div>
          <div>Publicado: Junio 7, 2024</div>
        </div>
      </div>
      <div className="prose prose-gray max-w-none dark:prose-invert">
        <p class="text-gray-500">Descripción</p>
        <p>
          En esta publicación, exploramos los emocionantes avances en el desarrollo web y las
          tecnologías que están dando forma al futuro de internet. Desde el auge de las
          arquitecturas sin servidor hasta la creciente importancia de la accesibilidad y el
          rendimiento, profundizamos en las tendencias e innovaciones que están transformando la
          forma en que construimos y desplegamos aplicaciones web.
        </p>
        <br />
        <p>
          Ya seas un desarrollador experimentado o estés comenzando tu viaje en el mundo del
          desarrollo web, esta publicación ofrece valiosas ideas y orientación práctica para
          ayudarte a mantenerte a la vanguardia. Únete a nosotros mientras descubrimos los secretos
          para construir experiencias web rápidas, escalables y fáciles de usar que cautivarán a tu
          audiencia e impulsarán tu negocio hacia adelante.
        </p>
        <br />
        <div class="flex justify-between">
          <div class="w-full">
            <h2 class="text-2xl font-bold">Lista de Participantes:</h2>
            <ul class="px-4">
              <li class="text-gray-700 pb-2 flex items-center">
                <span><DotFilledIcon /></span>Advancements in front-end frameworks and libraries
              </li>
              <li class="text-gray-700 pb-2 flex items-center">
                <span><DotFilledIcon /></span>The importance of accessibility and inclusive design
              </li>
              <li class="text-gray-700 pb-2 flex items-center">
                <span><DotFilledIcon /></span>Strategies for optimizing web performance
              </li>
              <li class="text-gray-700 pb-2 flex items-center">
                <span><DotFilledIcon /></span>Emerging trends in web development tools and workflows
              </li>
            </ul>
          </div>
          <div class="w-full">
            <h2 class="text-2xl font-bold">Lista de Referencias:</h2>
            <ul class="px-4">
              <li class="text-gray-700 pb-2 flex items-center">
                <span><DotFilledIcon /></span>Advancements in front-end frameworks and libraries
              </li>
              <li class="text-gray-700 pb-2 flex items-center">
                <span><DotFilledIcon /></span>The importance of accessibility and inclusive design
              </li>
              <li class="text-gray-700 pb-2 flex items-center">
                <span><DotFilledIcon /></span>Strategies for optimizing web performance
              </li>
              <li class="text-gray-700 pb-2 flex items-center">
                <span><DotFilledIcon /></span>Emerging trends in web development tools and workflows
              </li>
            </ul>
          </div>
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
import { useRouter, useRoute } from 'vue-router'
const route = useRoute()
const appointmentId = route.params.id
</script>
