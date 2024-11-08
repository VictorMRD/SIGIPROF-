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
                        <span class="capitalize text-gray-600 font-semibold">Estado</span>:
                        {{ form.values.estatus }}
                      </p>
                    </div>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogCancel
                    class="bg-black text-white hover:bg-slate-800 hover:text-white"
                    type="submit"
                    @click="onSubmit"
                  >
                    Confirmar
                  </AlertDialogCancel>
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
                    <RadioGroupItem id="option-one" value="IMPRESO" />
                    <Label for="option-one">Impreso</Label>
                  </div>
                  <div class="flex items-center space-x-2">
                    <RadioGroupItem id="option-two" value="ELECTRONICO" />
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
          </div>
        </div>
        <div class="flex justify-end pt-4 gap-2">
          <Button type="button" @click="turnBack" class="bg-white-500 text-black hover:bg-gray-200">
            Cancelar
          </Button>
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
                      <span class="capitalize text-gray-600 font-semibold">Estado</span>:
                      {{ form.values.estatus }}
                    </p>
                  </div>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogCancel
                  class="bg-black text-white hover:bg-slate-800 hover:text-white"
                  type="submit"
                  @click="onSubmit"
                >
                  Confirmar
                </AlertDialogCancel>
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
const dontDeleteIssnFlag = ref(true)
const loadData = async () => {
  try {
    const res = await axios.get(`api/v1/publications/${dataId}`)
    const publicationData = res.data

    // Establecer los valores en el formulario
    form.setFieldValue('issn_tipo', publicationData.issn_tipo)
    issn_type.value = publicationData.issn_tipo
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
    form.setFieldValue('estatus', publicationData.estatus)
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
    estatus: z.string().min(2).max(50)
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
const arrayOfValidYears = ref([])
const startUpYear = 2025
const quantityOfYears = 125

for (let i = 0; i < quantityOfYears; i++) {
  arrayOfValidYears.value.push(startUpYear - i)
}

const form = useForm({
  validationSchema: formSchema
})

const onSubmit = form.handleSubmit((values) => {
  values.referencesList = referencesList.value
  values.participantList = participantList.value
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
  if (dontDeleteIssnFlag.value) {
    dontDeleteIssnFlag.value = false
    if (issn_type.value === 'ELECTRONICO') {
      isIssnElectronicoEnabled.value = false
      isIssnImpresoEnabled.value = true
    } else if (issn_type.value === 'IMPRESO') {
      isIssnElectronicoEnabled.value = true
      isIssnImpresoEnabled.value = false
    }
    return
  }
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
</script>
