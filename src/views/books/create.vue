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
  SelectValue
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Info } from 'lucide-vue-next'

import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from '@/lib/zod'
import { countries, languages } from '@/lib/utils'

// Define the form schema
const formSchema = toTypedSchema(
  z
    .object({
      isbn: z.string().length(13),
      doi: z.string().min(2),
      titulo: z.string(),
      ano_publication: z.number().min(1900).max(2100),
      editorial: z.string(),
      pais: z.string().refine((value) => countries.some((country) => country.country === value), {
        message: 'País no válido'
      }),
      idioma: z.string().refine((value) => languages.some((language) => language.code === value), {
        message: 'Idioma no válido'
      }),
      isbn_traduccion: z.string(),
      idioma_traduccion: z.string(),
      titulo_traduccion: z.string(),
      apoyo_conahcyt: z.boolean().default(false),
      programa_conahcyt: z.string().optional(),
      rol_autor: z.string(),
      estado_publicacion: z.string(),
      objetivo: z.string(),
      dictaminado: z.boolean().default(false),
      portada: z.string(),
      url_cita: z.string(),
      cita_a: z.number(),
      cita_b: z.number()
    })
    .superRefine(({ apoyo_conahcyt, programa_conahcyt }, refinementContext) => {
      // Require programa_conahcyt if apoyo_conahcyt is true
      if (apoyo_conahcyt && programa_conahcyt == '') {
        return refinementContext.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Requerido',
          path: ['programa_conahcyt']
        })
      }
    })
)

// Create the form instance
const form = useForm({
  validationSchema: formSchema
})

const handleSubmit = form.handleSubmit((values, actions) => {
  console.log('Form submitted!', values)
})

const autorRolDictionary = {
  ASESOR_PRINCIPAL: 'Asesor principal',
  AUTOR: 'Autor',
  AUTOR_PARA_CORRESPONDENCIA: 'Autor para correspondencia',
  AUTOR_PRINCIPAL: 'Autor principal',
  AUTOR_UNICO: 'Autor único',
  AUTOR_DE_CORRESPONDENCIA: 'Autor de correspondencia',
  CO_AUTOR: 'Co-autor',
  CO_COORDINADOR: 'Co-coordinador',
  CO_INVENTOR: 'Co-inventor',
  COLABORADOR: 'Colaborador',
  COMPIADOR: 'Compilador',
  COORDINADOR: 'Coordinador',
  DIRECTOR: 'Director',
  DIRECTOR_Y_O_ASESOR_PRINCIPAL: 'Director y/o asesor principal',
  EDITOR: 'Editor',
  ESTUDIANTE_AUTOR_PRINCIPAL: 'Estudiante es el autor principal',
  INVENTOR: 'Inventor',
  LIDER: 'Líder',
  PARTICIPANTE: 'Participante',
  TECNICO: 'Técnico',
  TRADUCTOR: 'Traductor'
}

// Calculate the years for the date picker
const currentYear = new Date().getFullYear()
let years = Array.from({ length: currentYear - 1899 }, (_, index) => currentYear - index)
</script>

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
    <div class="grid grid-cols-5 gap-4">
      <div class="col-span-3">
        <form @submit="handleSubmit" class="space-y-5">
          <div class="bg-background border rounded-md p-4 col-span-2 shadow space-y-4">
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
              <FormField v-slot="{ componentField }" name="ano_publication">
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
                          <SelectItem v-for="year in years" :value="year" :key="year">{{
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
            <FormField v-slot="{ componentField }" name="editorial">
              <FormItem>
                <FormLabel>Editorial*</FormLabel>
                <FormControl>
                  <Input type="text" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <div class="grid grid-cols-2 gap-4">
              <FormField v-slot="{ componentField }" name="estado_publicacion">
                <FormItem>
                  <FormLabel>Estado de la publicación</FormLabel>
                  <Select v-bind="componentField">
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un estado" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="Pendiente"> Pendiente </SelectItem>
                          <SelectItem value="Revisión"> En Revisión </SelectItem>
                          <SelectItem value="Publicado"> Publicado </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </FormControl>
                  </Select>
                  <FormMessage />
                </FormItem>
              </FormField>
              <FormField v-slot="{ value, handleChange }" name="dictaminado">
                <FormItem>
                  <FormLabel>Está dictaminado</FormLabel>
                  <FormControl>
                    <div class="pt-[.5rem]">
                      <Switch :checked="value" @update:checked="handleChange" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
            </div>
          </div>
          <div class="border rounded-md p-4 col-span-1 bg-background shadow space-y-4">
            <div>
              <h2 class="text-lg font-semibold">Traducción</h2>
              <p class="text-zinc-500 text-sm">
                Si el libro es una traducción, llena los siguientes campos
              </p>
              <Separator class="mt-2 mb-3" />
            </div>
            <FormField v-slot="{ componentField }" name="titulo_traduccion">
              <FormItem>
                <FormLabel>Título</FormLabel>
                <FormControl>
                  <Input type="text" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <div class="grid grid-cols-2 gap-4">
              <FormField v-slot="{ componentField }" name="isbn_traduccion">
                <FormItem>
                  <FormLabel>ISBN</FormLabel>
                  <FormControl>
                    <Input type="text" v-bind="componentField" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
              <FormField v-slot="{ componentField }" name="idioma_traduccion">
                <FormItem>
                  <FormLabel>Idioma</FormLabel>
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
                            :value="language.language"
                            :key="language.iso_code"
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
          </div>
          <div class="border p-4 rounded-md bg-background shadow">
            <div>
              <h2 class="text-lg font-semibold">Autores</h2>
              <p class="text-muted-foreground text-sm">Agrega los autores del libro</p>
              <Separator class="mt-2 mb-3" />
            </div>
            <FormField v-slot="{ componentField }" name="rol_autor">
              <FormItem>
                <FormLabel>Rol de partipación</FormLabel>
                <Select v-bind="componentField">
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="ASESOR_PRINCIPAL">Asesor principal</SelectItem>
                        <SelectItem value="AUTOR">Autor</SelectItem>
                        <SelectItem value="AUTOR_PARA_CORRESPONDENCIA"
                          >Autor para correspondencia</SelectItem
                        >
                        <SelectItem value="AUTOR_PRINCIPAL">Autor principal</SelectItem>
                        <SelectItem value="AUTOR_UNICO">Autor único</SelectItem>
                        <SelectItem value="AUTOR_DE_CORRESPONDENCIA"
                          >Autor de correspondencia</SelectItem
                        >
                        <SelectItem value="CO_AUTOR">Co-autor</SelectItem>
                        <SelectItem value="CO_COORDINADOR">Co-coordinador</SelectItem>
                        <SelectItem value="CO_INVENTOR">Co-inventor</SelectItem>
                        <SelectItem value="COLABORADOR">Colaborador</SelectItem>
                        <SelectItem value="COMPIADOR">Compilador</SelectItem>
                        <SelectItem value="COORDINADOR">Coordinador</SelectItem>
                        <SelectItem value="DIRECTOR">Director</SelectItem>
                        <SelectItem value="DIRECTOR_Y_O_ASESOR_PRINCIPAL"
                          >Director y/o asesor principal</SelectItem
                        >
                        <SelectItem value="EDITOR">Editor</SelectItem>
                        <SelectItem value="ESTUDIANTE_AUTOR_PRINCIPAL"
                          >Estudiante es el autor principal</SelectItem
                        >
                        <SelectItem value="INVENTOR">Inventor</SelectItem>
                        <SelectItem value="LIDER">Líder</SelectItem>
                        <SelectItem value="PARTICIPANTE">Participante</SelectItem>
                        <SelectItem value="TECNICO">Técnico</SelectItem>
                        <SelectItem value="TRADUCTOR">Traductor</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                    <FormDescription> Seleccione su rol de participación </FormDescription>
                  </FormControl>
                </Select>
                <FormMessage />
              </FormItem>
            </FormField>
            <div>
              <h3>Autores adicionales</h3>
              <Label for="autorName">Nombre</Label>
              <Input type="text" id="autorName" />
            </div>
          </div>
          <div class="border p-4 rounded-md bg-background shadow space-y-4">
            <div>
              <h2 class="text-lg font-semibold">Citas</h2>
              <p class="text-muted-foreground text-sm">Agrega las citas del libro</p>
              <Separator class="mt-2 mb-3" />
            </div>
            <div className="bg-blue-50 p-4 relative rounded-md border border-blue-300 text-sm">
              <div
                className="absolute top-[50%] -left-3 -translate-y-2/4 bg-blue-50 text-blue-400 rounded-full"
              >
                <Info />
              </div>
              <p className="text-blue-500">
                Ingrese la información de la URL de citas, si no cuenta con dicha información, podrá
                registrar URL de Google Scholar, ArXiv, algún repositorio, o la liga de su página de
                trabajos o alguna referente a éstos.
              </p>
            </div>
            <FormField v-slot="{ componentField }" name="url_cita">
              <FormItem>
                <FormLabel>URL Cita*</FormLabel>
                <Input type="text" v-bind="componentField" />
                <FormMessage />
              </FormItem>
            </FormField>
            <div className="grid grid-cols-3 gap-2">
              <FormField v-slot="{ componentField }" name="cita_a">
                <FormItem>
                  <FormLabel>Cita A*</FormLabel>
                  <Input type="number" v-bind="componentField" />
                  <FormMessage />
                </FormItem>
              </FormField>
              <FormField v-slot="{ componentField }" name="cita_b">
                <FormItem>
                  <FormLabel>Cita B*</FormLabel>
                  <Input type="number" v-bind="componentField" />
                  <FormMessage />
                </FormItem>
              </FormField>
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Total de citas</Label>
                <Input :value="form.values.cita_a + form.values.cita_b" disabled />
              </div>
            </div>
          </div>
          <div class="border p-4 rounded-md bg-background shadow space-y-4">
            <FormField v-slot="{ value, handleChange }" name="apoyo_conahcyt">
              <FormItem class="flex items-center justify-between">
                <div class="space-y-0.5">
                  <FormLabel class="text-lg font-semibold">Recibió apoyo del CONAHCYT</FormLabel>
                  <FormDescription class="text-muted-foreground text-sm">
                    Llena los siguientes campos relacionados con el CONAHCYT
                  </FormDescription>
                </div>
                <FormControl>
                  <div>
                    <Switch :checked="value" @update:checked="handleChange" />
                  </div>
                </FormControl>
              </FormItem>
            </FormField>
            <div v-if="form.values.apoyo_conahcyt">
              <Separator class="mt-2 mb-3" />
              <FormField v-slot="{ componentField }" name="programa_conahcyt">
                <FormItem>
                  <FormLabel>Programa</FormLabel>
                  <Select v-bind="componentField">
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un programa" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="programa1"> Programa 1 </SelectItem>
                          <SelectItem value="programa2"> Programa 2 </SelectItem>
                          <SelectItem value="programa3"> Programa 3 </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </FormControl>
                  </Select>
                  <FormDescription>
                    Seleccione el programa que apoyó la publicación
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              </FormField>
            </div>
          </div>
        </form>
      </div>
      <div class="col-span-2">
        <div class="border rounded-md p-4 sticky top-5 bg-background shadow">
          <h1 class="text-lg font-semibold">Vista previa</h1>
          <p class="text-sm text-muted-foreground">
            Revisa la información antes de continuar
            <Separator class="mt-2 mb-3" />
          </p>
          <div class="space-y-2">
            <h3 class="text-sm font-semibold">Información General</h3>
            <div>
              <h4 class="text-muted-foreground text-xs">Título</h4>
              <Separator class="mt-[1.45rem]" v-if="!form.values.titulo" />
              <p>{{ form.values.titulo }}</p>
            </div>
            <div class="grid grid-cols-2 gap-2">
              <div>
                <h4 class="text-muted-foreground text-xs">ISBN</h4>
                <Separator class="mt-5" v-if="!form.values.isbn" />
                <p class="text-sm">{{ form.values.isbn }}</p>
              </div>
              <div>
                <h4 class="text-muted-foreground text-xs">DOI</h4>
                <Separator class="mt-5" v-if="!form.values.doi" />
                <p class="text-sm">{{ form.values.doi }}</p>
              </div>
            </div>
            <div class="grid grid-cols-3 gap-2">
              <div>
                <h4 class="text-muted-foreground text-xs">Año de publicación</h4>
                <Separator class="mt-5" v-if="!form.values.ano_publication" />
                <p class="text-sm">{{ form.values.ano_publication }}</p>
              </div>
              <div>
                <h4 class="text-muted-foreground text-xs">País</h4>
                <Separator class="mt-5" v-if="!form.values.pais" />
                <p class="text-sm">{{ form.values.pais }}</p>
              </div>
              <div>
                <h4 class="text-muted-foreground text-xs">Idioma</h4>
                <Separator class="mt-5" v-if="!form.values.idioma" />
                <p class="text-sm">
                  {{ languages.find((language) => language.code === form.values.idioma)?.name }}
                </p>
              </div>
            </div>
            <div>
              <h4 class="text-muted-foreground text-xs">Editorial</h4>
              <Separator class="mt-5" v-if="!form.values.editorial" />
              <p class="text-sm">{{ form.values.editorial }}</p>
            </div>
            <div class="grid grid-cols-2 gap-2">
              <div>
                <h4 class="text-muted-foreground text-xs">Estado</h4>
                <Separator class="mt-5" v-if="!form.values.editorial" />
                <p class="text-sm">{{ form.values.editorial }}</p>
              </div>
              <div>
                <h4 class="text-muted-foreground text-xs">Dictaminado</h4>
                <p v-if="form.values.dictaminado" class="text-sm">Si</p>
                <p v-else class="text-sm">No</p>
              </div>
            </div>
          </div>
          <div class="space-y-2 mt-4">
            <h3 class="text-sm font-semibold">Traducción</h3>
            <div>
              <h4 class="text-muted-foreground text-xs">Título</h4>
              <Separator class="mt-5" v-if="!form.values.titulo_traduccion" />
              <p class="text-sm">{{ form.values.titulo_traduccion }}</p>
            </div>
            <div class="grid grid-cols-2 gap-2">
              <div>
                <h4 class="text-muted-foreground text-xs">ISBN</h4>
                <Separator class="mt-5" v-if="!form.values.isbn_traduccion" />
                <p class="text-sm">{{ form.values.isbn_traduccion }}</p>
              </div>
              <div>
                <h4 class="text-muted-foreground text-xs">Idioma</h4>
                <Separator class="mt-5" v-if="!form.values.idioma_traduccion" />
                <p class="text-sm">{{ form.values.idioma_traduccion }}</p>
              </div>
            </div>
          </div>
          <div class="space-y-2 mt-4">
            <h3 class="text-sm font-semibold">Autores</h3>
            <div>
              <h4 class="text-muted-foreground text-xs">Rol de tu participación</h4>
              <Separator class="mt-5" v-if="!form.values.rol_autor" />
              <p class="text-sm">{{ autorRolDictionary[form.values.rol_autor] }}</p>
            </div>
          </div>
          <div class="flex justify-end">
            <Button class="mt-4 w-28" @click="() => form.submit()">Enviar</Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
