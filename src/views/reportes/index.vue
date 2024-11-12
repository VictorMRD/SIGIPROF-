<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import Report from '@/components/Report.vue'
import { reactive } from "vue";

const reportData = reactive({
  title: 'Reporte de actividades',
  description: 'Lista de todas las publicaciones 2024/10/29 - 2024/11/10',
  show: null,
  books: [
    {
      isbn: '978-3-16-148410-0',
      doi: '10.1001/book1.2024.001',
      titulo: 'Fundamentos de la Física Cuántica',
      anio_publicacion: 2024,
      editorial: 'Editorial Universitaria',
      pais: 'España',
      idioma: 'Español',
      estado_publicacion: 'Publicado'
    },
    {
      isbn: '978-0-13-110362-7',
      doi: '10.1002/book2.2023.002',
      titulo: 'Introducción a la Programación en Python',
      anio_publicacion: 2023,
      editorial: 'TechBooks',
      pais: 'México',
      idioma: 'Español',
      estado_publicacion: 'En revisión'
    },
    {
      isbn: '978-1-234-56789-7',
      doi: '10.1003/book3.2022.003',
      titulo: 'Inteligencia Artificial y Aprendizaje Automático',
      anio_publicacion: 2022,
      editorial: 'Innovación Científica',
      pais: 'Argentina',
      idioma: 'Español',
      estado_publicacion: 'Publicado'
    },
    {
      isbn: '978-3-598-21500-1',
      doi: '10.1004/book4.2021.004',
      titulo: 'Historia de la Ciencia y la Tecnología',
      anio_publicacion: 2021,
      editorial: 'Editorial Ciencias Sociales',
      pais: 'Chile',
      idioma: 'Español',
      estado_publicacion: 'Retirado'
    },
    {
      isbn: '978-0-306-40615-7',
      doi: '10.1005/book5.2020.005',
      titulo: 'Biología Molecular Avanzada',
      anio_publicacion: 2020,
      editorial: 'Editorial Científica',
      pais: 'Colombia',
      idioma: 'Español',
      estado_publicacion: 'Publicado'
    }
  ],
  publications: [
    {
      issn_tipo: 'impreso',
      issn_impreso: '1234-5678',
      issn_electronico: '8765-4321',
      doi: '10.1001/journal1.2024.001',
      nombre_revista: 'Revista Científica A',
      titulo: 'Estudio sobre el Impacto del Cambio Climático',
      anio_publicacion: 2022,
      estatus: 'Publicado'
    },
    {
      issn_tipo: 'electronico',
      issn_impreso: '2345-6789',
      issn_electronico: '9876-5432',
      doi: '10.1002/journal2.2023.002',
      nombre_revista: 'Revista de Innovación',
      titulo: 'Innovaciones Tecnológicas en la Industria',
      anio_publicacion: 2023,
      estatus: 'En revisión'
    },
    {
      issn_tipo: 'impreso',
      issn_impreso: '3456-7890',
      issn_electronico: '0987-6543',
      doi: '10.1003/journal3.2021.003',
      nombre_revista: 'Revista de Medicina',
      titulo: 'Nuevas Terapias en Medicina Moderna',
      anio_publicacion: 2021,
      estatus: 'Publicado'
    },
    {
      issn_tipo: 'electronico',
      issn_impreso: '4567-8901',
      issn_electronico: '1098-7654',
      doi: '10.1004/journal4.2020.004',
      nombre_revista: 'Revista de Ciencias Sociales',
      titulo: 'Impacto de las Redes Sociales en la Sociedad',
      anio_publicacion: 2020,
      estatus: 'Retirado'
    },
    {
      issn_tipo: 'impreso',
      issn_impreso: '5678-9012',
      issn_electronico: '2109-8765',
      doi: '10.1005/journal5.2019.005',
      nombre_revista: 'Revista de Psicología',
      titulo: 'Psicología del Comportamiento Humano',
      anio_publicacion: 2019,
      estatus: 'Publicado'
    }
  ]
});

function show(str) {
  reportData.show = str
}
</script>

<template>
  <div class="max-w-6xl mx-auto py-8 space-y-5">
    <div>
      <h1 class="text-3xl">Reportes</h1>
      <p class="text-muted-foreground">Aquí puedes generar reportes de tu actividad reciente</p>
    </div>
    <div class="grid grid-cols-2 gap-5">
      <div class="space-y-7">
        <div class="grid gap-4">
          <h2>Por módulo</h2>
          <Button variant="outline" @click="() => show('publications')">Publicaciones</Button>
          <Button variant="outline" @click="() => show('books')">Libros</Button>
          <Button variant="outline" disabled>Cursos</Button>
          <Button variant="outline" disabled>Capacitaciones</Button>
        </div>
        <Separator class="bg-border" />
        <div class="grid gap-4">
          <h2>Por periodo</h2>
          <Button variant="outline" disabled>Semanal</Button>
          <Button variant="outline" disabled>Mensual</Button>
          <Button variant="outline" disabled>Semestral</Button>
          <Button variant="outline" disabled>Anual</Button>
        </div>
      </div>
      <Report :report="reportData" />
    </div>
  </div>
</template>
