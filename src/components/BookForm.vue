<script setup lang="ts">
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from '@/lib/zod'
import { Country as countries } from '@/lib/enums/Country'
import { Language as languages } from '@/lib/enums/Language'
import { BookStatus } from "@/lib/enums/BookStatus"
import { AuthorRole } from "@/lib/enums/AuthorRole"

const formSchema = toTypedSchema(
  z.object({
    isbn: z.string().length(13),
    doi: z.string().min(2),
    titulo: z.string(),
    anio_publicacion: z.preprocess((value) => Number(value), z.number().min(1900).max(2100)),
    editorial: z.string(),
    pais: z.string().refine((value) => countries.some((country) => country.country === value), {
      message: 'País no válido'
    }),
    idioma: z.string().refine((value) => languages.some((language) => language.code === value), {
      message: 'Idioma no válido'
    }),
    estado_publicacion: z.string(),
    rol_usuario_creador: z.string()
  })
)

const form = useForm({
  validationSchema: formSchema
})

// Calculate years for the year picker
const currentYear = new Date().getFullYear()
let years = Array.from({ length: currentYear - 1899 }, (_, index) => currentYear - index)

const emit = defineEmits(['submit'])

const handleSubmit = form.handleSubmit((data, { resetForm }) => {
  emit('submit', data)
  resetForm()
})
</script>

<template>
  <form @submit="handleSubmit" class="space-y-4">
    <div>
        <h2 class="text-lg font-semibold">Información general</h2>
        <p class="text-muted-foreground text-sm">
            Llena los siguientes campos para crear un libro
        </p>
        <Separator class="mt-2 mb-3" />
    </div>
    <FormField v-slot="{ componentField }" name="titulo">
      <FormItem>
        <FormLabel>Título*</FormLabel>
        <FormControl>
          <Input type="text" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <div class="grid gap-4 sm:grid-cols-2">
      <FormField v-slot="{ componentField }" name="isbn">
        <FormItem>
          <FormLabel>ISBN*</FormLabel>
          <FormControl>
            <Input type="text" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="doi">
        <FormItem>
          <FormLabel>DOI*</FormLabel>
          <FormControl>
            <Input type="text" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>
    <div class="grid gap-4 md:grid-cols-3">
      <FormField v-slot="{ componentField }" name="anio_publicacion">
        <FormItem>
          <FormLabel>Año de publicación*</FormLabel>
          <Select v-bind="componentField">
            <FormControl>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Año de publicación</SelectLabel>
                  <SelectItem v-for="year in years" :value="year.toString()" :key="year">{{
                    year
                    }}</SelectItem>
                </SelectGroup>
              </SelectContent>
            </FormControl>
          </Select>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="pais">
        <FormItem>
          <FormLabel>País*</FormLabel>
          <Select v-bind="componentField">
            <FormControl>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>País</SelectLabel>
                  <SelectItem v-for="country in countries" :value="country.country" :key="country.iso_code">{{
                    country.country }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </FormControl>
          </Select>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="idioma">
        <FormItem>
          <FormLabel>Idioma*</FormLabel>
          <Select v-bind="componentField">
            <FormControl>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Idioma</SelectLabel>
                  <SelectItem v-for="language in languages" :value="language.code" :key="language.code">{{
                    language.name }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </FormControl>
          </Select>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>
    <div class="grid grid-cols-3 gap-4">
      <FormField v-slot="{ componentField }" name="editorial">
        <FormItem>
          <FormLabel>Editorial*</FormLabel>
          <FormControl>
            <Input type="text" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="rol_usuario_creador">
        <FormItem>
          <FormLabel>Rol*</FormLabel>
          <Select v-bind="componentField">
            <FormControl>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                    <SelectItem v-for="[key, value] of Object.entries(AuthorRole)" :value="key" :key="key">{{value}}</SelectItem>
                </SelectGroup>
              </SelectContent>
            </FormControl>
          </Select>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="estado_publicacion">
        <FormItem>
          <FormLabel>Estado*</FormLabel>
          <Select v-bind="componentField">
            <FormControl>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                <SelectItem v-for="[key, value] of Object.entries(BookStatus)" :value="key" :key="key">{{value}}</SelectItem>
                </SelectGroup>
              </SelectContent>
            </FormControl>
          </Select>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>
  </form>
</template>
