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
          <BreadcrumbPage>Editar</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
    <div class="py-4 flex flex-col gap-4">
      <form @submit="onSubmit">
        <div class="flex justify-between">
          <p class="text-3xl font-semibold">Editar una publicación</p>
          <div class="flex gap-2">
            <Button
              type="button"
              @click="turnBack"
              class="bg-white-500 text-black hover:bg-gray-200"
              >Cancelar</Button
            >
            <AlertDialog>
              <AlertDialogTrigger>
                <Button type="button" @click="showFormInfo">Confirmar</Button></AlertDialogTrigger
              >
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    ¿Estás seguro de que deseas editar este elemento?
                    <p class="text-sm font-normal">
                      Esta acción modificará la información existente. Revisa cuidadosamente los
                      cambios antes de confirmar la edición.
                    </p>
                  </AlertDialogTitle>
                  <AlertDialogDescription class="h-60 overflow-auto">
                    <div class="flex flex-col gap-2">
                      <p>
                        <span class="capitalize text-gray-600 font-semibold">ISSN Tipo</span>:
                        {{ form.values.issn_tipo }}
                      </p>
                      <p>
                        <span class="capitalize text-gray-600 font-semibold">ISSN Impreso</span>:
                        {{ form.values.issn_impreso }}
                      </p>
                      <p>
                        <span class="capitalize text-gray-600 font-semibold">ISSN Electrónico</span
                        >:
                        {{ form.values.issn_electronico }}
                      </p>
                      <p>
                        <span class="capitalize text-gray-600 font-semibold">DOI</span>:
                        {{ form.values.doi }}
                      </p>
                      <p>
                        <span class="capitalize text-gray-600 font-semibold"
                          >Nombre de la Revista</span
                        >:
                        {{ form.values.nombre_revista }}
                      </p>
                      <p>
                        <span class="capitalize text-gray-600 font-semibold">Título</span>:
                        {{ form.values.titulo }}
                      </p>
                      <p>
                        <span class="capitalize text-gray-600 font-semibold"
                          >Año de Publicación</span
                        >:
                        {{ form.values.anio_publicacion }}
                      </p>
                      <p>
                        <span class="capitalize text-gray-600 font-semibold">Programa CONACYT</span
                        >:
                        {{ form.values.programa_conahcyt }}
                      </p>
                      <p>
                        <span class="capitalize text-gray-600 font-semibold">Estado</span>:
                        {{ form.values.estatus }}
                      </p>
                      <p>
                        <span class="capitalize text-gray-600 font-semibold">Objetivo</span>:
                        {{ form.values.objetivo }}
                      </p>
                      <p>
                        <span class="capitalize text-gray-600 font-semibold">URL de Citas</span>:
                        {{ form.values.url_cita }}
                      </p>
                      <p>
                        <span class="capitalize text-gray-600 font-semibold">Cita A</span>:
                        {{ form.values.cita_a }}
                      </p>
                      <p>
                        <span class="capitalize text-gray-600 font-semibold">Cita B</span>:
                        {{ form.values.cita_b }}
                      </p>
                      <p>
                        <span class="capitalize text-gray-600 font-semibold">Total de Citas</span>:
                        {{ form.values.total_citas }}
                      </p>
                    </div>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction>
                    <Button type="submit" @click="onSubmit">Confirmar</Button>
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
        <div class="flex flex-col border p-4 rounded-md gap-2 mt-2">
          <FormField v-slot="{ componentField }" name="issn_tipo">
            <FormItem>
              <div class="flex items-center gap-3">
                <FormLabel>¿Tiene ISSN? *</FormLabel>
                <FormDescription>
                  Elija el medio que tiene el número International Standard Serial Numbers (ISSN).
                </FormDescription>
              </div>
              <FormControl>
                <RadioGroup
                  default-value="option-one"
                  class="flex gap-4"
                  v-bind="componentField"
                  v-model="issn_type"
                >
                  <div class="flex items-center space-x-2">
                    <RadioGroupItem id="option-one" value="IMPRESO" v-model="issn_type" />
                    <Label for="option-one">Impreso</Label>
                  </div>
                  <div class="flex items-center space-x-2">
                    <RadioGroupItem id="option-two" value="ELECTRONICO" v-model="issn_type" />
                    <Label for="option-two">Electrónico</Label>
                  </div>
                  <div class="flex items-center space-x-2">
                    <RadioGroupItem id="option-three" value="AMBOS" />
                    <Label for="option-three">Ambos</Label>
                  </div>
                </RadioGroup>
              </FormControl>

              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="issn_impreso">
            <FormItem>
              <FormLabel>ISSN Impreso *</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  v-bind="componentField"
                  placeholder="Escribe tu ISSN impreso."
                  :disabled="isIssnImpresoEnabled"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="issn_electronico">
            <FormItem>
              <FormLabel>ISSN Electronico? *</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  v-bind="componentField"
                  placeholder="Escribe tu ISSN electronico."
                  :disabled="isIssnElectronicoEnabled"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>
        <div class="flex justify-between gap-10 border p-4 rounded-md mt-2">
          <div class="flex flex-col w-full">
            <FormField v-slot="{ componentField }" name="doi">
              <FormItem>
                <FormLabel>DOI</FormLabel>
                <FormControl>
                  <Input type="text" v-bind="componentField" placeholder="Código DOI" />
                </FormControl>
                <FormDescription>Escribe aquí el DOI de tu publicacion.</FormDescription>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="titulo">
              <FormItem>
                <FormLabel>Título</FormLabel>
                <FormControl>
                  <Input type="text" v-bind="componentField" placeholder="Titulo publicacion" />
                </FormControl>
                <FormDescription>Escribe aquí el título.</FormDescription>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="estatus">
              <FormItem>
                <FormLabel>Estado</FormLabel>
                <Select v-bind="componentField">
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione el estado de su proyecto" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="PUBLICADO"> Publicado </SelectItem>
                      <SelectItem value="ACEPTADO"> Aceptado para su publicación </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormDescription>Selecciona el estado actual del proyecto.</FormDescription>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="objetivo">
              <FormItem>
                <FormLabel>Objetivo</FormLabel>
                <Select v-bind="componentField">
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione el objetivo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="INVESTIGACION"> Investigacion </SelectItem>
                      <SelectItem value="TRABAJO_DIFUSION"> Trabajo de difusión </SelectItem>
                      <SelectItem value="LIBROS_DOCENCIA"> Libro de docencia </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormDescription
                  >Selecciona el area al que tu proyecto se acerca más.</FormDescription
                >
                <FormMessage />
              </FormItem>
            </FormField>
          </div>

          <div class="flex flex-col w-full">
            <FormField v-slot="{ componentField }" name="nombre_revista">
              <FormItem>
                <FormLabel>Nombre de la revista</FormLabel>
                <FormControl>
                  <Input type="text" v-bind="componentField" placeholder="Nombre de la revista" />
                </FormControl>
                <FormDescription>Escribe aquí el nombre de la revista.</FormDescription>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="anio_publicacion">
              <FormItem>
                <FormLabel>Año de publicación</FormLabel>
                <Select v-bind="componentField">
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione su el año" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem
                        v-for="year in arrayOfValidYears"
                        :value="year.toString()"
                        :key="year"
                      >
                        {{ year }}
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormDescription>Seleccione el año de publicación.</FormDescription>
                <FormMessage />
              </FormItem>
            </FormField>

            <div class="flex items-center gap-3 mt-6">
              <div class="flex gap-2 items-center">
                <p class="font-semibold py-3">¿Recibio apoyo del CONAHCYT?</p>
                <Checkbox :checked="recibio_apoyo_conahcyt" @update:checked="handleChange" />
              </div>
              <FormField
                v-slot="{ componentField }"
                name="programa_conahcyt"
                v-if="recibio_apoyo_conahcyt"
              >
                <FormItem>
                  <Select v-bind="componentField" v-model="preSelectedProgram">
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue class="max-w-52" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem disabled value="vacio">
                          <span>Seleccione el programa</span>
                        </SelectItem>
                        <SelectItem
                          v-for="programa in programas_conahcyt"
                          :value="programa"
                          :key="programa"
                        >
                          {{ programa.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) }}
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              </FormField>
            </div>
          </div>
        </div>
        <div class="border p-4 mt-4 rounded-md">
          <p class="text-2xl font-bold pb-4">Citas</p>
          <FormField v-slot="{ componentField }" name="url_cita">
            <FormItem>
              <FormLabel>URL de la cita</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  v-bind="componentField"
                  placeholder="Ingrese el URL de su cita"
                />
              </FormControl>
              <FormDescription>Escribe aquí el nombre de la revista.</FormDescription>
              <FormMessage />
            </FormItem>
          </FormField>
          <div class="flex gap-4 w-full">
            <FormField v-slot="{ componentField }" name="cita_a">
              <FormItem class="w-full">
                <FormLabel>URL de la cita</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    v-bind="componentField"
                    placeholder="Cita A"
                    v-model="citas_aRef"
                  />
                </FormControl>
                <FormDescription>Escribe aquí el nombre de la revista.</FormDescription>
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="cita_b" class="w-full">
              <FormItem class="w-full">
                <FormLabel>URL de la cita</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    v-bind="componentField"
                    placeholder="Cita B"
                    v-model="citas_bRef"
                  />
                </FormControl>
                <FormDescription>Escribe aquí el nombre de la revista.</FormDescription>
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="total_citas" class="w-full">
              <FormItem class="w-full">
                <FormLabel>URL de la cita</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    disabled
                    v-bind="componentField"
                    placeholder="Total de citas"
                    v-model="total_citasRef"
                  />
                </FormControl>
                <FormDescription>Escribe aquí el nombre de la revista.</FormDescription>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>
        </div>
        <div class="border p-4 mt-4 rounded-md">
          <p class="text-2xl font-bold pb-4">Eje CONAHCYT *</p>
          <FormField v-slot="{ componentField }" name="eje_conahcyt">
            <FormItem>
              <Select v-bind="componentField">
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione el eje" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="DESARROLLO_TECNOLOGIAS">
                      Desarrollo de Tecnologías Estrategias de Vanguardia e Innovación Abierta para
                      la Transformación Social
                    </SelectItem>
                    <SelectItem value="DIFUSION_CIENCIA">
                      Difusión y Acceso Universal a la Ciencia
                    </SelectItem>
                    <SelectItem value="FORTALECIMIENTO_COMUNIDAD">
                      Fortalecimiento de la Comunidad Científica
                    </SelectItem>
                    <SelectItem value="IMPULSO_FRONTERAS">
                      Impulso a la Investigación de Fronteras y la Ciencia Básica en todos los
                      campos de Conocimiento
                    </SelectItem>
                    <SelectItem value="INCIDENCIA_PROBLEMATICAS">
                      Incidencia y Atención de Problemáticas Nacionales
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormDescription>Seleccione el eje al que pertenezca su publicación.</FormDescription>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>
        <div class="flex justify-end pt-4">
          <AlertDialog>
            <AlertDialogTrigger> <Button type="button">Confirmar</Button></AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  ¿Estás seguro de que deseas editar este elemento?
                  <p class="text-sm font-normal">
                    Esta acción modificará la información existente. Revisa cuidadosamente los
                    cambios antes de confirmar la edición.
                  </p>
                </AlertDialogTitle>
                <AlertDialogDescription class="h-60 overflow-auto">
                  <div class="flex flex-col gap-2">
                    <p>
                      <span class="capitalize text-gray-600 font-semibold">ISSN Tipo</span>:
                      {{ form.values.issn_tipo }}
                    </p>
                    <p>
                      <span class="capitalize text-gray-600 font-semibold">ISSN Impreso</span>:
                      {{ form.values.issn_impreso }}
                    </p>
                    <p>
                      <span class="capitalize text-gray-600 font-semibold">ISSN Electrónico</span>:
                      {{ form.values.issn_electronico }}
                    </p>
                    <p>
                      <span class="capitalize text-gray-600 font-semibold">DOI</span>:
                      {{ form.values.doi }}
                    </p>
                    <p>
                      <span class="capitalize text-gray-600 font-semibold"
                        >Nombre de la Revista</span
                      >:
                      {{ form.values.nombre_revista }}
                    </p>
                    <p>
                      <span class="capitalize text-gray-600 font-semibold">Título</span>:
                      {{ form.values.titulo }}
                    </p>
                    <p>
                      <span class="capitalize text-gray-600 font-semibold">Año de Publicación</span
                      >:
                      {{ form.values.anio_publicacion }}
                    </p>
                    <p>
                      <span class="capitalize text-gray-600 font-semibold">Programa CONACYT</span>:
                      {{ form.values.programa_conahcyt }}
                    </p>
                    <p>
                      <span class="capitalize text-gray-600 font-semibold">Estado</span>:
                      {{ form.values.estatus }}
                    </p>
                    <p>
                      <span class="capitalize text-gray-600 font-semibold">Objetivo</span>:
                      {{ form.values.objetivo }}
                    </p>
                    <p>
                      <span class="capitalize text-gray-600 font-semibold">URL de Citas</span>:
                      {{ form.values.url_cita }}
                    </p>
                    <p>
                      <span class="capitalize text-gray-600 font-semibold">Cita A</span>:
                      {{ form.values.cita_a }}
                    </p>
                    <p>
                      <span class="capitalize text-gray-600 font-semibold">Cita B</span>:
                      {{ form.values.cita_b }}
                    </p>
                    <p>
                      <span class="capitalize text-gray-600 font-semibold">Total de Citas</span>:
                      {{ form.values.total_citas }}
                    </p>
                  </div>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction>
                  <Button type="submit" @click="onSubmit">Confirmar</Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useForm } from 'vee-validate'
import { DotFilledIcon } from '@radix-icons/vue'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { ref, watch } from 'vue'
import { toast } from 'vue-sonner'
import { useRouter, useRoute } from 'vue-router'
import axios from '@/lib/axios'

const route = useRoute()
const dataId = route.params.id
const preSelectedProgram = ref('')
const loadData = async () => {
  try {
    const res = await axios.get(`api/v1/publications/${dataId}`)
    const publicationData = res.data

    // Establecer los valores en el formulario
    form.setFieldValue('issn_tipo', publicationData.issn_tipo)
    form.setFieldValue(
      'issn_impreso',
      publicationData.issn_impreso !== null ? publicationData.issn_impreso.toString() : '88888888'
    )
    form.setFieldValue(
      'issn_electronico',
      publicationData.issn_electronico !== null
        ? publicationData.issn_electronico.toString()
        : '88888888'
    )
    form.setFieldValue('doi', publicationData.doi)
    form.setFieldValue('nombre_revista', publicationData.nombre_revista)
    form.setFieldValue('titulo', publicationData.titulo)
    form.setFieldValue('anio_publicacion', publicationData.anio_publicacion.toString())
    form.setFieldValue('programa_conahcyt', publicationData.programa_conahcyt)
    form.setFieldValue('estatus', publicationData.estatus)
    form.setFieldValue('objetivo', publicationData.objetivo)
    form.setFieldValue('url_cita', publicationData.url_cita)
    form.setFieldValue('cita_a', publicationData.cita_a)
    form.setFieldValue('cita_b', publicationData.cita_b)
    form.setFieldValue('total_citas', publicationData.total_citas)
    form.setFieldValue('eje_conahcyt', publicationData.eje_conahcyt)
    recibio_apoyo_conahcyt.value = publicationData.recibio_apoyo_conahcyt == 1 ? true : false
    if (recibio_apoyo_conahcyt.value == false) form.setFieldValue('programa_conahcyt', 'vacio')
    preSelectedProgram.value = publicationData.programa_conahcyt
  } catch (error) {
    console.error('Error al cargar los datos de la publicación:', error)
  }
}
loadData()

const isURL = (url) => {
  // Expresión regular para validar URLs
  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/
  return urlRegex.test(url)
}
const formSchema = toTypedSchema(
  z.object({
    issn_tipo: z.string().min(2, { message: 'Demasiado corto' }),
    issn_impreso: z.string().regex(/^\d{8}$/, { message: 'Debe contener exactamente 8 dígitos' }),
    issn_electronico: z.string().regex(/^\d{8}$/, { message: 'Debe ser de 8 dígitos' }),
    doi: z.string().min(2, { message: 'Demasiado corto' }),
    nombre_revista: z.string().min(2, { message: 'Demasiado corto' }),
    titulo: z.string().min(2).max(100),
    anio_publicacion: z.string().min(2, { message: 'Demasiado corto' }),
    programa_conahcyt: z.string().min(2, { message: 'Demasiado corto' }),
    estatus: z.string().min(2).max(50),
    objetivo: z.string().min(2, { message: 'Demasiado corto' }),
    url_cita: z
      .string()
      .min(2, { message: 'Demasiado corto' })
      .refine((url) => isURL(url), { message: 'URL no válida' }),
    cita_a: z.number(),
    cita_b: z.number(),
    total_citas: z.number(),
    eje_conahcyt: z.string().min(2, { message: 'Demasiado corto' })
  })
)

const participantList = ref([])
const referencesList = ref([])
const participantInformation = ref('')
const referenceInformation = ref('')
const issn_type = ref('empty')
const isIssnImpresoEnabled = ref(true)
const isIssnElectronicoEnabled = ref(true)
const router = useRouter()
const recibio_apoyo_conahcyt = ref(false)
const arrayOfValidYears = ref([])
const startUpYear = 2025
const quantityOfYears = 125
const total_citasRef = ref(0)
const citas_aRef = ref(null)
const citas_bRef = ref(null)
const programas_conahcyt = ref([
  'FONDO_INSTITUCIONAL',
  'FONDO_MIXTO',
  'FONDO_MIXTO_AS',
  'FONDO_MIXTO_BC',
  'FONDO_MIXTO_BCS',
  'FONDO_MIXTO_CC',
  'FONDO_MIXTO_CS',
  'FONDO_MIXTO_CH',
  'FONDO_MIXTO_DF',
  'FONDO_MIXTO_CIUDAD_JUAREZ',
  'FONDO_MIXTO_CL',
  'FONDO_MIXTO_CM',
  'FONDO_MIXTO_DG',
  'FONDO_MIXTO_ESTADO_MEXICO',
  'FONDO_MIXTO_GT',
  'FONDO_MIXTO_GR',
  'FONDO_MIXTO_HG',
  'Fondo Mixto Jalisco',
  'Fondo Mixto Michoacán',
  'Fondo Mixto Morelos',
  'Fondo Mixto Municipio de La Paz',
  'Fondo Mixto Municipio de Puebla',
  'Fondo Mixto Nayarit',
  'Fondo Mixto Nuevo León',
  'Fondo Mixto Oaxaca',
  'Fondo Mixto Puebla',
  'Fondo Mixto Querétaro',
  'Fondo Mixto Quintana Roo',
  'Fondo Mixto San Luis Potosí',
  'Fondo Mixto Sinaloa',
  'Fondo Mixto Sonora',
  'Fondo Mixto Tabasco',
  'Fondo Mixto Tamaulipas',
  'Fondo Mixto Tlaxcala',
  'Fondo Mixto Veracruz',
  'Fondo Mixto Yucatán',
  'Fondo Mixto Zacatecas',
  'Fondo sectorial',
  'Fondo Sectorial CONACYT Secretaría de Energía Hidrocarburos',
  'Fondo Sectorial CONACYT Secretaría de Energía Sustentabilidad Energética',
  'Fondo Sectorial CONACYT SEGOB CNS para la Seguridad Pública',
  'Fondo Sectorial Convocatoria de Investigación Científica Básica',
  'Fondo Sectorial Convocatoria de Investigación en Juventud',
  'Fondo Sectorial Convocatoria de Investigación para la Educación Indígena e Intercultural',
  'Fondo Sectorial Convocatoria de la Administración Federal de Servicios Educativos en el Distrito Federal (AFSEDF)',
  'Fondo Sectorial Convocatoria de la Subsecretaría de Educación Básica',
  'Fondo Sectorial de Innovación (FINNOVA)',
  'Fondo Sectorial de Investigación Ambiental',
  'Fondo Sectorial de Investigación CONACYT INEGI',
  'Fondo Sectorial de Investigación, Desarrollo Tecnológico e Innovación del Ejército y Fuerza Aérea Mexicanos',
  'Fondo Sectorial de Investigación, Desarrollo Tecnológico e Innovación en Actividades Espaciales CONACYT AEM',
  'Fondo Sectorial de Investigación en Materias Agrícola, Pecuaria, Acuacultura, Agrobiotecnología y Recursos Fitogenéticos',
  'Fondo Sectorial de Investigación en Salud y Seguridad Social',
  'Fondo Sectorial de Investigación INIFED CONACYT',
  'Fondo Sectorial de Investigación para el Desarrollo Aeroportuario y la Navegación Aérea',
  'Fondo Sectorial de Investigación para el Desarrollo Social',
  'Fondo Sectorial de Investigación para la Educación',
  'Fondo Sectorial de Investigación para la Evaluación de la Educación CONACYT INEE',
  'Fondo Sectorial de Investigación SECTUR CONACYT',
  'Fondo Sectorial de Investigación SRE CONACYT',
  'Fondo Sectorial de Investigación y Desarrollo en Ciencias Navales',
  'Fondo Sectorial de Investigación y Desarrollo INMUJERES CONACYT',
  'Fondo Sectorial de Investigación y Desarrollo sobre el Agua',
  'Fondo Sectorial Fondo de Desarrollo Científico y Tecnológico para el Fomento de la Producción y Financiamiento de Vivienda y el Crecimiento del Sector Habitacional',
  'Fondo Sectorial Fondo de Innovación Tecnológica (FIT)',
  'Fondo Sectorial Investigaciones Acerca de la Violencia de Género. Investigaciones con Enfoque de Género',
  'Fondo Sectorial para Investigación y Desarrollo Tecnológico en Energía',
  'Fondo Sectorial para la Investigación, el Desarrollo y la Innovación Tecnológica Forestal',
  'Fondo Sectorial Subcuenta de Investigación para la Evaluación de la Educación',
  'Fondos y Apoyos Institucionales - Apoyos Complementarios para la Adquisición de Equipo Científico',
  'Fondos y Apoyos Institucionales - Estímulos Fiscales a la Investigación y Desarrollo de Tecnología (EFIDT)',
  'Fondos y Apoyos Institucionales - Fondo de Cooperación Internacional en Ciencia y Tecnología del CONACYT (FONCICY)',
  'Fondos y Apoyos Institucionales -Fondo Institucional de Fomento Regional para el Desarrollo Científico, Tecnológico y de Innovación (FORDECYT)',
  'Fondos y Apoyos Institucionales - Fondo Institucional del CONACYT (FOINS)',
  'Fondos y Apoyos Institucionales - Fondo para el Fomento y Apoyo a la Investigación Científica y Tecnológica en Bioseguridad y Biotecnología (Fondo CIBIOGEM)',
  'Fondos y Apoyos Institucionales - Programa de Apoyos para Actividades Científicas Tecnológicas y de Innovación',
  'Fondos y Apoyos Institucionales Programa Estímulos a la Innovación (PEI)',
  'Programa CONACYT- Apoyo a Madres Jefas de Familia',
  'Programa CONACYT - Beca al Extranjero',
  'Programa CONACYT - Beca Mixta',
  'Programa CONACYT - Beca Nacional',
  'Programa CONACYT - Estancias Posdoctorales',
  'Programa CONACYT - Estancias Sabáticas',
  'Programa CONACYT - Formación de Alto Nivel para la Administración Pública',
  'Programa CONACYT -Fortalecimiento Académico para Indígenas',
  'Programa CONACYT - Jóvenes Talentos',
  'Programa CONACYT - Otro',
  'Programa CONACYT - Repatriaciones y Retenciones'
])

for (let i = 0; i < quantityOfYears; i++) {
  arrayOfValidYears.value.push(startUpYear - i)
}

const form = useForm({
  validationSchema: formSchema
})

const onSubmit = form.handleSubmit((values) => {
  values.referencesList = referencesList.value
  values.participantList = participantList.value
  values.recibio_apoyo_conahcyt = recibio_apoyo_conahcyt.value
  console.log(recibio_apoyo_conahcyt.value)
  if (form.values.programa_conahcyt == 'vacio' && recibio_apoyo_conahcyt.value) {
    toast.error('Tiene que escoger un programa CONAHCYT valido')
    return
  } else if (!recibio_apoyo_conahcyt.value) {
    values.programa_conahcyt = null
  }
  if (form.values.issn_electronico === '88888888') {
    values.issn_electronico = null
  }
  if (form.values.issn_impreso === '88888888') {
    values.issn_impreso = null
  }
  values.issn_tipo = values.issn_tipo.toUpperCase()
  axios
    .put(`api/v1/publications/${dataId}`, values)
    .then((res) => {
      toast.success('Su publicacion ha sido editada con éxito')
      router.push(`/publicaciones`)
    })
    .catch((error) => {
      toast.error('Ha ocurrido un error inesperado.')
      console.log(error)
    })
})

function addParticipant() {
  if (participantInformation.value) participantList.value.push(participantInformation.value)
  participantInformation.value = ''
}

function addReference() {
  if (referenceInformation.value) referencesList.value.push(referenceInformation.value)
  referenceInformation.value = ''
}

const turnBack = () => {
  router.push(`/publicaciones`)
}

const removeItem = (list, value) => {
  const index = list.indexOf(value)
  if (index !== -1) {
    list.splice(index, 1)
  }
}

const showFormInfo = () => {
  console.log(form.values.issn_tipo)
  console.log(form.values)
}

watch(issn_type, async () => {
  if (issn_type.value === 'IMPRESO') {
    isIssnImpresoEnabled.value = false
    isIssnElectronicoEnabled.value = true
    form.setFieldValue('issn_electronico', '88888888', { shouldValidate: false })
    form.setFieldValue('issn_impreso', undefined, { shouldValidate: false })
  } else if (issn_type.value === 'ELECTRONICO') {
    isIssnElectronicoEnabled.value = false
    isIssnImpresoEnabled.value = true
    form.setFieldValue('issn_impreso', '88888888', { shouldValidate: false })
    form.setFieldValue('issn_electronico', undefined, { shouldValidate: false })
  } else {
    isIssnElectronicoEnabled.value = false
    isIssnImpresoEnabled.value = false
    form.setFieldValue('issn_impreso', undefined, { shouldValidate: false })
    form.setFieldValue('issn_electronico', undefined, { shouldValidate: false })
  }

  await form.validateField('issn_impreso')
  await form.validateField('issn_electronico')
})

watch(citas_aRef, async () => {
  total_citasRef.value = citas_aRef.value + citas_bRef.value
})
watch(citas_bRef, async () => {
  total_citasRef.value = citas_aRef.value + citas_bRef.value
  form.setFieldValue('total_citas', total_citasRef.value, { shouldValidate: false })

  await form.validateField('total_citas')
})

form.setFieldValue('programa_conahcyt', 'vacio', { shouldValidate: false })
watch(recibio_apoyo_conahcyt, async () => {
  if (recibio_apoyo_conahcyt.value) {
    form.setFieldValue('programa_conahcyt', 'vacio', { shouldValidate: false })
  } else {
    form.setFieldValue('programa_conahcyt', null, { shouldValidate: false })
  }

  await form.validateField('programa_conahcyt')
})

const handleChange = () => {
  recibio_apoyo_conahcyt.value = !recibio_apoyo_conahcyt.value
}
</script>
