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
          <RouterLink to="/cursos" title="Boton para el index Cursos">
            <BreadcrumbLink>Cursos </BreadcrumbLink>
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
          <p class="text-3xl font-semibold">Editar un curso</p>
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
            <FormField v-slot="{ componentField }" name="tipo_formacion">
              <FormItem>
                <FormLabel>Tipo de formacion *</FormLabel>
                <Select v-bind="componentField">
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione la formacion correspondiente" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="ACREDITACION"> Acreditacion </SelectItem>
                      <SelectItem value="CERTIFICACION"> Certificacion </SelectItem>
                      <SelectItem value="COACHING"> Coaching </SelectItem>
                      <SelectItem value="CURSO"> Curso </SelectItem>
                      <SelectItem value="DIPLOMADO"> Diplomado </SelectItem>
                      <SelectItem value="SEMINARIO"> Seminario </SelectItem>
                      <SelectItem value="TALLER"> Taller </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormDescription>Selecciona el tipo de la formacion del curso.</FormDescription>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="nombre">
              <FormItem>
                <FormLabel>Nombre del curso *</FormLabel>
                <FormControl>
                  <Input type="text" v-bind="componentField" />
                </FormControl>
                <FormDescription>Ingresa el nombre de tu curso.</FormDescription>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="anio">
              <FormItem>
                <FormLabel>Año del curso *</FormLabel>
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
                <FormDescription
                  >Selecciona el area al que tu proyecto se acerca más.</FormDescription
                >
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="horas_totales">
              <FormItem>
                <FormLabel>Horas totales</FormLabel>
                <FormControl>
                  <Input type="number" v-bind="componentField" />
                </FormControl>
                <FormDescription>Escribe aquí las referencias.</FormDescription>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>

          <div class="flex flex-col w-full">
            <FormField v-slot="{ componentField }" name="institucion">
              <FormItem>
                <FormLabel>Nombre de la institucion *</FormLabel>
                <FormControl>
                  <Input type="text" v-bind="componentField" />
                </FormControl>
                <FormDescription>Escribe aquí el autor.</FormDescription>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="tipo_institucion">
              <FormItem>
                <FormLabel>Tipo de institucion *</FormLabel>
                <Select v-bind="componentField">
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione el tipo de institucion" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="EXTRANJERA"> Extranjera </SelectItem>
                      <SelectItem value="NACIONAL"> Nacional </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormDescription>Escribe aquí la fecha de publicación.</FormDescription>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="modalidad_institucion">
              <FormItem>
                <FormLabel>Modalidad de la institucion *</FormLabel>
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

            <FormField v-slot="{ componentField }" name="descripcion">
              <FormItem>
                <FormLabel>Descripcion *</FormLabel>
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
                      <span class="capitalize text-gray-600 font-semibold">Tipo de formacion:</span
                      >:
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
import { DotFilledIcon } from '@radix-icons/vue'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { ref } from 'vue'
import { toast } from 'vue-sonner'
import { useRouter, useRoute } from 'vue-router'
import axios from '@/lib/axios'

const route = useRoute()
const dataId = route.params.id
const preSelectedProgram = ref('')
const loadData = async () => {
  try {
    const res = await axios.get(`api/v1/courses/${dataId}`)
    const itemData = res.data

    form.setFieldValue('tipo_formacion', itemData.tipo_formacion)
    form.setFieldValue('nombre', itemData.nombre)
    form.setFieldValue('anio', itemData.anio.toString())
    form.setFieldValue('horas_totales', itemData.horas_totales)
    form.setFieldValue('institucion', itemData.institucion)
    form.setFieldValue('tipo_institucion', itemData.tipo_institucion)
    form.setFieldValue('modalidad_institucion', itemData.modalidad_institucion)
    form.setFieldValue('descripcion', itemData.descripcion)
    console.log(itemData.modalidad_institucion)
  } catch (error) {
    console.error('Error al cargar los datos', error)
  }
}
loadData()

const formSchema = toTypedSchema(
  z.object({
    tipo_formacion: z
      .string({ message: 'El tipo de formación es necesario para crear una nueva publicación' })
      .min(2, { message: 'El tipo de formación debe tener al menos 2 caracteres' })
      .max(50, { message: 'El tipo de formación no debe exceder los 50 caracteres' }),
    nombre: z
      .string({ message: 'El nombre del curso es necesario para crear una nueva publicación' })
      .min(2, { message: 'El nombre del curso debe tener al menos 2 caracteres' })
      .max(100, { message: 'El nombre del curso no debe exceder los 100 caracteres' }),
    anio: z.string({
      message: 'El año del curso es necesario para crear una nueva publicación'
    }),
    horas_totales: z.number({
      message: 'El número total de horas es necesario para crear una nueva publicación'
    }),
    institucion: z
      .string({
        message: 'El nombre de la institución es necesario para crear una nueva publicación'
      })
      .min(2, { message: 'El nombre de la institución debe tener al menos 2 caracteres' })
      .max(150, { message: 'El nombre de la institución no debe exceder los 150 caracteres' }),
    tipo_institucion: z.string({
      message: 'El tipo de institución es necesario para crear una nueva publicación'
    }),
    modalidad_institucion: z.string({
      message: 'La modalidad de la institución es necesaria para crear una nueva publicación'
    }),
    descripcion: z
      .string({ message: 'La descripción es necesaria para crear una nueva publicación' })
      .min(10, { message: 'La descripción debe tener al menos 10 caracteres' })
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
</script>
