<script setup>
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { exportAsPdf } from '@/lib/utils'

const props = defineProps(['report'])

function handleDownload() {
  exportAsPdf('report')
}
</script>

<template>
  <div class="space-y-4">
    <Card id="report">
      <CardHeader class="border-b border-border">
        <h1 class="text-lg">{{ props.report.title }}</h1>
        <p class="text-muted-foreground text-sm">{{ props.report.description }}</p>
      </CardHeader>
      <CardContent class="py-4">
        <p>Dummy text</p>
      </CardContent>
    </Card>
    <Button @click="handleDownload">Descargar</Button>
  </div>
</template>
