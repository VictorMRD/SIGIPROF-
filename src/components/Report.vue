<script setup>
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { exportAsPdf } from '@/lib/utils'

const props = defineProps(['report'])

console.log(props);
function handleDownload() {
  exportAsPdf('report')
}
</script>

<template>
  <div class="space-y-4 bg-background">
    <Card id="report">
      <CardHeader class="border-b border-border">
        <h1 class="text-lg">{{ props.report.title }}</h1>
        <p class="text-muted-foreground text-sm">{{ props.report.description }}</p>
      </CardHeader>
      <CardContent class="py-4">
        <div v-if="props.report.show == 'publications'">
          <h2 class="text-lg">Publicaciones</h2>
          <Separator class="mt-2"/>
          <div class="space-y-4 divide-y">
            <div v-for="publication in props.report.publications" :key="publication.titulo" class="py-3">
              <h3 class="text-lg font-semibold b-2">{{ publication.titulo }}</h3>
              <p ><strong>Revista:</strong> {{ publication.nombre_revista }}</p>
              <p ><strong>Año de Publicación:</strong> {{ publication.anio_publicacion }}</p>
              <p ><strong>ISSN (Impreso):</strong> {{ publication.issn_impreso }}</p>
              <p ><strong>ISSN (Electrónico):</strong> {{ publication.issn_electronico }}</p>
              <p ><strong>DOI:</strong> {{ publication.doi }}</p>
              <p :class="statusClasses"><strong>Estatus:</strong> {{ publication.estatus }}</p>
            </div>
          </div>
        </div>
        <div v-if="props.report.show == 'books'">
          <h2 class="text-lg">Libros</h2>
          <Separator class="mt-2"/>
          <div class="space-y-4 divide-y">
            <div v-for="publication in props.report.books" :key="publication.titulo" class="py-3">
              <h3 class="text-lg font-semibold b-2">{{ publication.titulo }}</h3>
              <p ><strong>Revista:</strong> {{ publication.nombre_revista }}</p>
              <p ><strong>Año de Publicación:</strong> {{ publication.anio_publicacion }}</p>
              <p ><strong>ISSN (Impreso):</strong> {{ publication.issn_impreso }}</p>
              <p ><strong>ISSN (Electrónico):</strong> {{ publication.issn_electronico }}</p>
              <p ><strong>DOI:</strong> {{ publication.doi }}</p>
              <p :class="statusClasses"><strong>Estatus:</strong> {{ publication.estatus }}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
    <Button @click="handleDownload">Descargar</Button>
  </div>
</template>
