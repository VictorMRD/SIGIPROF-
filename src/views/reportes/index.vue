<script setup lang="ts">
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
</script>

<template>
  <div class="max-w-6xl mx-auto py-8 space-y-5">
    <div>
      <h1 class="text-3xl">Reportes</h1>
      <p class="text-muted-foreground">Aquí puedes generar reportes de tu actividad reciente</p>
    </div>
    <div class="grid grid-cols-2">
      <div class="space-y-7">
        <div class="grid gap-4">
          <h2>Por módulo</h2>
          <Button variant="outline">Publicaciones</Button>
          <Button variant="outline">Libros</Button>
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
    </div>
  </div>
</template>
