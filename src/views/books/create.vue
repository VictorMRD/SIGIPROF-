<template>
  <div class="p-8 space-y-4">
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
    <form @submit="onSubmit" class="space-y-3">
      <div class="gap-4 grid md:grid-cols-3">
        <div class="border rounded-md p-4 col-span-2">
          <div>
            <h2 class="text-lg font-semibold">Información general</h2>
            <p class="text-zinc-500 text-sm">Llena los siguientes campos para crear un libro</p>
            <Separator class="mt-2 mb-3" />
          </div>
          <FormField v-slot="{ componentField }" name="titulo">
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input type="text" placeholder="El principito" v-bind="componentField" />
              </FormControl>
              <FormDescription> Título del libro a crear </FormDescription>
              <FormMessage />
            </FormItem>
          </FormField>
          <div class="grid gap-4 sm:grid-cols-2">
            <FormField v-slot="{ componentField }" name="isbn">
              <FormItem>
                <FormLabel>ISBN</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="xxx-xx-xxxxx-xx-x" v-bind="componentField" />
                </FormControl>
                <FormDescription> ISBN del libro a crear </FormDescription>
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="doi">
              <FormItem>
                <FormLabel>DOI</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="xxx-xx-xxxxx-xx-x" v-bind="componentField" />
                </FormControl>
                <FormDescription> DOI del libro a crear </FormDescription>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>
          <div class="grid gap-4 md:grid-cols-3">
            <FormField v-slot="{ componentField }" name="ano_publication">
              <FormItem>
                <FormLabel>Fecha de publicación</FormLabel>
                <FormControl>
                  <div>
                    <Popover>
                      <PopoverTrigger as-child>
                        <Button
                          variant="outline"
                          class="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon class="mr-2 h-4 w-4" />
                          {{
                            value
                              ? df.format(value.toDate(getLocalTimeZone()))
                              : 'Selecciona una fecha'
                          }}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent class="w-auto p-0">
                        <Calendar v-bind="componentField" initial-focus />
                      </PopoverContent>
                    </Popover>
                  </div>
                </FormControl>
                <FormDescription> Fecha en que el libro fue publicado </FormDescription>
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="pais">
              <FormItem>
                <FormLabel>País</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="México" v-bind="componentField" />
                </FormControl>
                <FormDescription> País donde el libro fue publicado </FormDescription>
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="idioma">
              <FormItem>
                <FormLabel>Idioma</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Español" v-bind="componentField" />
                </FormControl>
                <FormDescription> Idioma </FormDescription>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>
          <FormField v-slot="{ componentField }" name="editorial">
            <FormItem>
              <FormLabel>Editorial</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Editorial de muestra" v-bind="componentField" />
              </FormControl>
              <FormDescription> La editorial de tu libro </FormDescription>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>
        <div class="border rounded-md p-4 col-span-1">
          <div>
            <h2 class="text-lg font-semibold">Traducción</h2>
            <p class="text-zinc-500 text-sm">
              Si el libro es una traducción, llena los siguientes campos
            </p>
            <Separator class="mt-2 mb-3" />
          </div>
          <FormField v-slot="{ componentField }" name="titulo_traduccion">
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input type="text" placeholder="El principito" />
              </FormControl>
              <FormDescription> Título de la traducción </FormDescription>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="isbn_traduccion">
            <FormItem>
              <FormLabel>ISBN</FormLabel>
              <FormControl>
                <Input type="text" placeholder="xxx-xx-xxxxx-xx-x" v-bind="componentField" />
              </FormControl>
              <FormDescription> ISBN de la traducción </FormDescription>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="idioma_traduccion">
            <FormItem>
              <FormLabel>Idioma</FormLabel>
              <FormControl>
                <Input type="text" placeholder="xxx-xx-xxxxx-xx-x" v-bind="componentField" />
              </FormControl>
              <FormDescription>Idioma de la traducción</FormDescription>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>
      </div>
      <div class="border p-4 rounded-md">
        <FormField v-slot="{ componentField }" name="rol_autor">
          <FormItem>
            <FormLabel>Rol del autor</FormLabel>
            <FormControl>
              <Input type="text" placeholder="xxx-xx-xxxxx-xx-x" v-bind="componentField" />
            </FormControl>
            <FormDescription>Idioma de la traducción</FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="apoyo_conahcyt">
          <FormItem>
            <FormLabel>Recibió apoyo del CONAHCYT</FormLabel>
            <FormControl>
              <div>
                <Switch v-bind="componentField" />
              </div>
            </FormControl>
            <FormDescription>
              Si el libro recibió apoyo del CONAHCYT, selecciona esta opción
            </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="estado_publicacion">
          <FormItem>
            <FormLabel>Estado de la publicación</FormLabel>
            <FormControl>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Pendiente">
                      Pendiente
                    </SelectItem>
                    <SelectItem value="Revisión">
                      En Revisión
                    </SelectItem>
                    <SelectItem value="Publicado">
                      Publicado
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="objetivo">
          <FormItem>
            <FormLabel>Objetivo de la publicación</FormLabel>
            <FormControl>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un objetivo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="1">
                      Objetivo 1
                    </SelectItem>
                    <SelectItem value="2">
                      Objetivo 2
                    </SelectItem>
                    <SelectItem value="3">
                      Objetivo 3
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField> 
        <FormField v-slot="{ componentField }" name="dictaminado">
          <FormItem>
            <FormLabel>Está dictaminado</FormLabel>
            <FormControl>
              <div>
                <Switch v-bind="componentField" />
              </div>
            </FormControl>
            <FormDescription>
              Si el libro se encuentra dictaminado
            </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>
    </form>
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
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { CalendarIcon } from '@radix-icons/vue'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { DateFormatter, type DateValue, getLocalTimeZone } from '@internationalized/date'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

const formSchema = toTypedSchema(
  z.object({
    isbn: z.string().length(13, { message: 'Must be 13 characters long' }),
    doi: z.string().min(2),
    titulo: z.string(),
    ano_publication: z.string().date(),
    editorial: z.string(),
    pais: z.string(),
    idioma: z.string(),
    isbn_traduccion: z.string(),
    idioma_traduccion: z.string(),
    titulo_traduccion: z.string(),

    apoyo_conahcyt: z.boolean(),
    rol_autor: z.string(),
    estado_publicacion: z.string(),
    objetivo: z.string(),
    dictaminado: z.boolean(),
    portada: z.string()
  })
)

const form = useForm({
  validationSchema: formSchema
})

const onSubmit = form.handleSubmit((values) => {
  console.log('Form submitted!', values)
})
</script>
