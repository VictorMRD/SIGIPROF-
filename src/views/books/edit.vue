<template>
  <div class="max-w-6xl mx-auto space-y-4 py-8">
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <RouterLink to="/" title="Boton para el index Libros">
            <BreadcrumbLink>Inicio </BreadcrumbLink>
          </RouterLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <RouterLink to="/cursos" title="Boton para el index Libros">
            <BreadcrumbLink>Libros </BreadcrumbLink>
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
          <p class="text-3xl font-semibold">Editar un libro</p>
          <div class="flex gap-2">
            <Button
              type="button"
              @click="turnBack"
              class="bg-white-500 text-black hover:bg-gray-200"
              >Cancelar</Button
            >
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
                        <span class="capitalize text-gray-600 font-semibold"
                          >Tipo de formacion:</span
                        >:
                        {{ form.values.tipo_formacion }}
                      </p>
                      <p>
                        <span class="capitalize text-gray-600 font-semibold">Nombre del curso:</span
                        >:
                        {{ form.values.nombre }}
                      </p>
                      <p>
                        <span class="capitalize text-gray-600 font-semibold">Año del curso</span>:
                        {{ form.values.anio }}
                      </p>
                      <p>
                        <span class="capitalize text-gray-600 font-semibold">Horas totales</span>:
                        {{ form.values.anio }}
                      </p>
                      <p>
                        <span class="capitalize text-gray-600 font-semibold">Institucion</span>:
                        {{ form.values.institucion }}
                      </p>
                      <p>
                        <span class="capitalize text-gray-600 font-semibold"
                          >Tipo de institucion</span
                        >: {{ form.values.tipo_institucion }}
                      </p>
                      <p>
                        <span class="capitalize text-gray-600 font-semibold"
                          >Modalidad del institucion</span
                        >: {{ form.values.modalidad_institucion }}
                      </p>
                      <p>
                        <span class="capitalize text-gray-600 font-semibold">Descripcion</span>:
                        {{ form.values.descripcion }}
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
        <div class="flex justify-between gap-10 border p-4 rounded-md mt-2">
          <div class="flex flex-col w-full">
            <FormField v-slot="{ componentField }" name="isbn">
              <FormItem>
                <FormLabel>ISBN *</FormLabel>
                <FormControl>
                  <Input type="text" v-bind="componentField" />
                </FormControl>
                <FormDescription>Selecciona el tipo de la formacion del curso.</FormDescription>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="doi">
              <FormItem>
                <FormLabel>DOI *</FormLabel>
                <FormControl>
                  <Input type="text" v-bind="componentField" />
                </FormControl>
                <FormDescription>Ingresa el nombre de tu curso.</FormDescription>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="titulo">
              <FormItem>
                <FormLabel>Titulo del libro *</FormLabel>
                <FormControl>
                  <Input type="text" v-bind="componentField" />
                </FormControl>
                <FormDescription
                  >Selecciona el area al que tu proyecto se acerca más.</FormDescription
                >
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="anio_publicacion">
              <FormItem>
                <FormLabel>Año de la publicacion</FormLabel>
                <FormControl>
                  <Input type="number" v-bind="componentField" />
                </FormControl>
                <FormDescription>Escribe aquí las referencias.</FormDescription>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="cita_a">
              <FormItem>
                <FormLabel>Cita A *</FormLabel>
                <FormControl>
                  <Input type="number" v-bind="componentField" />
                </FormControl>
                <FormDescription>Escribe aquí los participantes.</FormDescription>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="cita_b">
              <FormItem>
                <FormLabel>Cita B *</FormLabel>
                <FormControl>
                  <Input type="number" v-bind="componentField" />
                </FormControl>
                <FormDescription>Escribe aquí los participantes.</FormDescription>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="total_citas">
              <FormItem>
                <FormLabel>Total de citas *</FormLabel>
                <FormControl>
                  <Input type="number" v-bind="componentField" v-model="citas_total" disabled />
                </FormControl>
                <FormDescription>Escribe aquí los participantes.</FormDescription>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>

          <div class="flex flex-col w-full">
            <FormField v-slot="{ componentField }" name="estado_publicacion">
              <FormItem>
                <FormLabel>Estado de publicacion *</FormLabel>
                <FormControl>
                  <Input type="number" v-bind="componentField" />
                </FormControl>
                <FormDescription>Escribe aquí los participantes.</FormDescription>
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="editorial">
              <FormItem>
                <FormLabel>Editorial *</FormLabel>
                <FormControl>
                  <Input type="text" v-bind="componentField" />
                </FormControl>
                <FormDescription>Escribe aquí el autor.</FormDescription>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="pais">
              <FormItem>
                <FormLabel>Pais *</FormLabel>
                <FormControl>
                  <Input type="text" v-bind="componentField" />
                </FormControl>
                <FormDescription>Escribe aquí la fecha de publicación.</FormDescription>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="idioma">
              <FormItem>
                <FormLabel>Idioma *</FormLabel>
                <Select v-bind="componentField">
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione su rol correspondiente" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="PUBLICA_FEDERAL"> Publica - Federal </SelectItem>
                      <SelectItem value="PUBLICA_ESTATAL"> Publica - Estatal </SelectItem>
                      <SelectItem value="PUBLICA_MUNICIPAL"> Publica - Municipal </SelectItem>
                      <SelectItem value="PRIVADA"> Privada </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormDescription>Escribe aquí el rol de participación.</FormDescription>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="recibio_apoyo_conahcyt">
              <FormItem>
                <FormLabel>Recibio apoyo del CONAHCYT *</FormLabel>
                <FormControl>
                  <Input type="text" v-bind="componentField" />
                </FormControl>
                <FormDescription>Escribe aquí los participantes.</FormDescription>
                <FormMessage />
              </FormItem>
            </FormField>

            <div class="flex gap-2 items-center">
              <p class="font-semibold py-3 my-6">¿Esta dictaminado?</p>
              <Checkbox :checked="esta_dictaminado" @update:checked="handleChange" />
            </div>

            <FormField v-slot="{ componentField }" name="url_cita">
              <FormItem>
                <FormLabel>URL de la cita *</FormLabel>
                <FormControl>
                  <Input type="text" v-bind="componentField" />
                </FormControl>
                <FormDescription>Escribe aquí los participantes.</FormDescription>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>
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
                      <span class="capitalize text-gray-600 font-semibold">ISBN:</span>:
                      {{ form.values.tipo_formacion }}
                    </p>
                    <p>
                      <span class="capitalize text-gray-600 font-semibold">Nombre del curso:</span>:
                      {{ form.values.nombre }}
                    </p>
                    <p>
                      <span class="capitalize text-gray-600 font-semibold">Año del curso</span>:
                      {{ form.values.anio }}
                    </p>
                    <p>
                      <span class="capitalize text-gray-600 font-semibold">Horas totales</span>:
                      {{ form.values.anio }}
                    </p>
                    <p>
                      <span class="capitalize text-gray-600 font-semibold">Institucion</span>:
                      {{ form.values.institucion }}
                    </p>
                    <p>
                      <span class="capitalize text-gray-600 font-semibold">Tipo de institucion</span
                      >: {{ form.values.tipo_institucion }}
                    </p>
                    <p>
                      <span class="capitalize text-gray-600 font-semibold"
                        >Modalidad del institucion</span
                      >: {{ form.values.modalidad_institucion }}
                    </p>
                    <p>
                      <span class="capitalize text-gray-600 font-semibold">Descripcion</span>:
                      {{ form.values.descripcion }}
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
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { ref, watch } from 'vue'
import { toast } from 'vue-sonner'
import { useRouter, useRoute } from 'vue-router'
import axios from '@/lib/axios'
import { Checkbox } from '@/components/ui/checkbox'

const route = useRoute()
const dataId = route.params.id
const preSelectedProgram = ref('')
const esta_dictaminado = ref(false)
const citas_a = ref(0)
const citas_b = ref(0)
const citas_total = ref(0)

const loadData = async () => {
  try {
    const res = await axios.get(`api/v1/books/${dataId}`)
    const itemData = res.data

    form.setFieldValue('isbn', itemData.isbn)
    form.setFieldValue('doi', itemData.doi)
    form.setFieldValue('titulo', itemData.titulo.toString())
    form.setFieldValue('anio_publicacion', itemData.anio_publicacion.toString())
    form.setFieldValue('editorial', itemData.editorial)
    form.setFieldValue('pais', itemData.pais)
    form.setFieldValue('idioma', itemData.idioma)
    form.setFieldValue('recibio_apoyo_conahcyt', itemData.recibio_apoyo_conahcyt)
    form.setFieldValue('programa_conahcyt', itemData.programa_conahcyt)
    form.setFieldValue('esta_dictaminado', itemData.esta_dictaminado)
    form.setFieldValue('url_cita', itemData.url_cita)
    form.setFieldValue('cita_a', itemData.cita_a)
    form.setFieldValue('cita_b', itemData.cita_b)
    form.setFieldValue('total_citas', itemData.total_citas)
    form.setFieldValue('estado_publicacion', itemData.estado_publicacion)
    esta_dictaminado.value = itemData.esta_dictaminado
    console.log(itemData.modalidad_institucion)
    citas_a.value = itemData.cita_a
    citas_b.value = itemData.cita_b
    citas_total.value = itemData.cita_b + itemData.cita_a
  } catch (error) {
    console.error('Error al cargar los datos', error)
  }
}
loadData()

const formSchema = toTypedSchema(
  z.object({
    isbn: z.string({
      message: 'El ISBN es necesario para crear una nueva publicación'
    }),
    doi: z.string({
      message: 'El DOI es necesario para crear una nueva publicación'
    }),
    titulo: z
      .string({ message: 'El título es necesario para crear una nueva publicación' })
      .min(2, { message: 'El título debe tener al menos 2 caracteres' })
      .max(255, { message: 'El título no debe exceder los 255 caracteres' }),
    anio_publicacion: z.string({
      message: 'El año de publicación es necesario para crear una nueva publicación'
    }),
    editorial: z
      .string({
        message: 'La editorial es necesaria para crear una nueva publicación'
      })
      .min(2, { message: 'La editorial debe tener al menos 2 caracteres' })
      .max(100, { message: 'La editorial no debe exceder los 100 caracteres' }),
    pais: z.string({
      message: 'El país es necesario para crear una nueva publicación'
    }),
    idioma: z.string({
      message: 'El idioma es necesario para crear una nueva publicación'
    }),
    estado_publicacion: z.string({
      message: 'El estado de la publicación es necesario para crear una nueva publicación'
    }),
  })
)

const participantList = ref([])
const referencesList = ref([])
const participantInformation = ref('')
const referenceInformation = ref('')
const arrayOfValidYears = ref([])
const router = useRouter()
const quantityOfYears = 125
const startUpYear = 2025

for (let i = 0; i < quantityOfYears; i++) {
  arrayOfValidYears.value.push(startUpYear - i)
}

const form = useForm({
  validationSchema: formSchema
})

const onSubmit = form.handleSubmit((values) => {
  console.log('Form submitted!', values)
  axios
    .put(`api/v1/courses/${dataId}`, values)
    .then((res) => {
      toast.success('Su curso ha sido editado con éxito')
      router.push(`/cursos`)
    })
    .catch((error) => {
      toast.error('Ha ocurrido un error inesperado.')
      console.log(error)
    })
})

function addParticipant() {
  if (participantInformation.value != null && participantInformation.value != '')
    participantList.value.push(participantInformation.value)

  participantInformation.value = ''
}
function addReference() {
  if (referenceInformation.value != null && referenceInformation.value != '')
    referencesList.value.push(referenceInformation.value)

  referenceInformation.value = ''
}
const turnBack = () => {
  router.push(`/cursos`)
}
const removeItem = (list, value) => {
  const index = list.indexOf(value)
  if (index !== -1) {
    list.splice(index, 1)
  }
}
const handleChange = () => {
  esta_dictaminado.value = !esta_dictaminado.value
}
</script>
