<script setup lang="ts">
import { Card } from '@/components/ui/card'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
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
import AuthorForm from '@/components/AuthorForm.vue'
import AuthorTable from '@/components/AuthorTable.vue'
import { toast } from 'vue-sonner'

import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from '@/lib/zod'
import { ref } from 'vue'
import axios from '@/lib/axios'

import { BookStatus } from '@/lib/enums/BookStatus'
import { AuthorRole } from '@/lib/enums/AuthorRole'
import { Country as countries } from '@/lib/enums/Country'
import { Language as languages } from '@/lib/enums/Language'

// Define the form schema
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

// Create the form instance
const form = useForm({
  validationSchema: formSchema
})

// Calculate the years for the date picker
const currentYear = new Date().getFullYear()
let years = Array.from({ length: currentYear - 1899 }, (_, index) => currentYear - index)

// An additional form is used to allow adding multiple authors as needed, so an additional schema, `autorFormSchema`,
// is defined to validate each author's data. A buffer array, `autores`, is also created to store
// the details of all added authors.

const authors = ref([])

const addAuthor = (author) => {
  author.id = Date.now()
  authors.value = [...authors.value, author]
}

const removeAuthor = (id) => {
  authors.value = authors.value.filter((author) => author.id !== id)
}

// This function handles the form submission, it makes an axios request to the backend
// and handles the backend validation issues if there are any
const handleSubmit = form.handleSubmit(async (req) => {
  if (authors.value.length > 0) {
    req.autores = authors.value
  }

  try {
    const res = await axios.post('/api/v1/user/books', req)
    console.log(res)
  } catch (error) {
    console.error(error)
    console.error(error.response.data)
    for (const [err, msj] of Object.entries(error.response.data.errors)) {
      toast.error('Error: ' + msj[0])
    }
  }
})
</script>

<template>
  <div class="py-8 space-y-4 max-w-6xl mx-auto">
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <RouterLink to="/" title="Boton para el index Cursos">
            <BreadcrumbLink>Inicio </BreadcrumbLink>
          </RouterLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <RouterLink to="/libros" title="Ir a libros">
            <BreadcrumbLink>Libros </BreadcrumbLink>
          </RouterLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Crear</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
    <h1 class="text-3xl font-semibold">Crear un libro</h1>
    <form @submit="handleSubmit" class="space-y-5">
      <Card class="bg-background p-4 col-span-2 space-y-4">
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
                      <SelectItem
                        v-for="country in countries"
                        :value="country.country"
                        :key="country.iso_code"
                        >{{ country.country }}
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
                      <SelectItem
                        v-for="language in languages"
                        :value="language.code"
                        :key="language.code"
                        >{{ language.name }}
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
                      <SelectItem
                        v-for="[key, value] of Object.entries(AuthorRole)"
                        :value="key"
                        :key="key"
                        >{{ value }}</SelectItem
                      >
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
                      <SelectItem
                        v-for="[key, value] of Object.entries(BookStatus)"
                        :value="key"
                        :key="key"
                        >{{ value }}</SelectItem
                      >
                    </SelectGroup>
                  </SelectContent>
                </FormControl>
              </Select>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>
      </Card>
      <Card class="p-4 bg-background space-y-4">
        <div>
          <h2 class="text-lg font-semibold">Autores</h2>
          <p class="text-muted-foreground text-sm">Agrega los autores del libro</p>
          <Separator class="mt-2 mb-3" />
        </div>
        <AuthorForm @submit="addAuthor" />
      </Card>
      <Card class="p-4">
        <AuthorTable v-if="authors.length > 0" :authors="authors" @removeAuthor="removeAuthor" />
        <div v-else class="h-10 flex justify-center items-center">
          <h1 class="text-sm text-muted-foreground">Aquí apareceran los autores agregados</h1>
        </div>
      </Card>
      <div class="flex justify-end">
        <Button class="w-28">Crear</Button>
      </div>
    </form>
  </div>
</template>
