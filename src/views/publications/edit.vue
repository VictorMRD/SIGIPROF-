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
              <AlertDialogTrigger> <Button type="button">Confirmar</Button></AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    ¿Estás completamente seguro de que quieres editar este elemento?
                    <p class="text-sm font-normal">
                      Esta acción puede afectar los datos existentes. Revisa la información
                      cuidadosamente antes de confirmar los cambios.
                    </p>
                  </AlertDialogTitle>
                  <AlertDialogDescription class="h-60 overflow-auto">
                    <div class="p-1 flex flex-col gap-2">
                      <p>
                        <span class="capitalize text-gray-600 font-semibold">Título</span>:
                        {{ form.values.titulo }}
                      </p>
                      <p>
                        <span class="capitalize text-gray-600 font-semibold">Estado</span>:
                        {{ form.values.estado }}
                      </p>
                      <p>
                        <span class="capitalize text-gray-600 font-semibold"
                          >Área de especialidad</span
                        >: {{ form.values.area }}
                      </p>
                      <p>
                        <span class="capitalize text-gray-600 font-semibold">Referencias</span>:
                        {{ referencesList }}
                      </p>
                      <p>
                        <span class="capitalize text-gray-600 font-semibold">Autor</span>:
                        {{ form.values.autor }}
                      </p>
                      <p>
                        <span class="capitalize text-gray-600 font-semibold"
                          >Fecha de Publicación</span
                        >: {{ form.values.fechaPublicacion }}
                      </p>
                      <p>
                        <span class="capitalize text-gray-600 font-semibold"
                          >Rol de Participación</span
                        >: {{ form.values.rolParticipacion }}
                      </p>
                      <p>
                        <span class="capitalize text-gray-600 font-semibold">Participantes</span>:
                        {{ participantList }}
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
            <FormField v-slot="{ componentField }" name="titulo">
              <FormItem>
                <FormLabel>Título</FormLabel>
                <FormControl>
                  <Input type="text" v-bind="componentField" />
                </FormControl>
                <FormDescription>Escribe aquí el título.</FormDescription>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="estado">
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
                      <SelectItem value="Planeacion"> Planeación </SelectItem>
                      <SelectItem value="EnProgreso"> En Progreso </SelectItem>
                      <SelectItem value="Revision"> Revisión </SelectItem>
                      <SelectItem value="Completado"> Completado </SelectItem>
                      <SelectItem value="Atrasado"> Atrasado </SelectItem>
                      <SelectItem value="Cancelado"> Cancelado </SelectItem>
                      <SelectItem value="Pausado"> Pausado </SelectItem>
                      <SelectItem value="Entrega"> Entrega </SelectItem>
                      <SelectItem value="EnEsperaDeAprobacion">
                        En Espera de Aprobación
                      </SelectItem>
                      <SelectItem value="Aprobado"> Aprobado </SelectItem>
                      <SelectItem value="Rechazado"> Rechazado </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormDescription>Selecciona el estado actual del proyecto.</FormDescription>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="area">
              <FormItem>
                <FormLabel>Area de especialidad</FormLabel>
                <Select v-bind="componentField">
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione el area correspondiente" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Matematicas"> Matemáticas </SelectItem>
                      <SelectItem value="Fisica"> Física </SelectItem>
                      <SelectItem value="Quimica"> Química </SelectItem>
                      <SelectItem value="Biologia"> Biología </SelectItem>
                      <SelectItem value="CienciasDeLaComputacion">
                        Ciencias de la Computación
                      </SelectItem>
                      <SelectItem value="Ingenieria"> Ingeniería </SelectItem>
                      <SelectItem value="Lenguaje"> Lenguaje </SelectItem>
                      <SelectItem value="Historia"> Historia </SelectItem>
                      <SelectItem value="Geografia"> Geografía </SelectItem>
                      <SelectItem value="Arte"> Arte </SelectItem>
                      <SelectItem value="Musica"> Música </SelectItem>
                      <SelectItem value="EducacionFisica"> Educación Física </SelectItem>
                      <SelectItem value="Filosofia"> Filosofía </SelectItem>
                      <SelectItem value="Psicologia"> Psicología </SelectItem>
                      <SelectItem value="Sociologia"> Sociología </SelectItem>
                      <SelectItem value="Antropologia"> Antropología </SelectItem>
                      <SelectItem value="Economia"> Economía </SelectItem>
                      <SelectItem value="Derecho"> Derecho </SelectItem>
                      <SelectItem value="Politica"> Ciencia Política </SelectItem>
                      <SelectItem value="Idiomas"> Idiomas </SelectItem>
                      <SelectItem value="InvestigacionEducativa">
                        Investigación Educativa
                      </SelectItem>
                      <SelectItem value="EstudiosAmbientales"> Estudios Ambientales </SelectItem>
                      <SelectItem value="DesarrolloSostenible"> Desarrollo Sostenible </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormDescription
                  >Selecciona el area al que tu proyecto se acerca más.</FormDescription
                >
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="referencias">
              <FormItem>
                <FormLabel>Referencias</FormLabel>
                <FormControl>
                  <div class="flex gap-2">
                    <Input type="text" v-bind="componentField" v-model="referenceInformation" />
                    <Button
                      type="button"
                      @click="addReference()"
                      class="bg-blue-500 hover:bg-blue-400"
                    >
                      Añadir
                    </Button>
                  </div>
                </FormControl>
                <FormDescription>Escribe aquí las referencias.</FormDescription>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>

          <div class="flex flex-col w-full">
            <FormField v-slot="{ componentField }" name="autor">
              <FormItem>
                <FormLabel>Autor</FormLabel>
                <FormControl>
                  <Input type="text" v-bind="componentField" />
                </FormControl>
                <FormDescription>Escribe aquí el autor.</FormDescription>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="fechaPublicacion">
              <FormItem>
                <FormLabel>Fecha de Publicación</FormLabel>
                <FormControl>
                  <Input type="date" v-bind="componentField" />
                </FormControl>
                <FormDescription>Escribe aquí la fecha de publicación.</FormDescription>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="rolParticipacion">
              <FormItem>
                <FormLabel>Rol de Participación</FormLabel>
                <Select v-bind="componentField">
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione su rol correspondiente" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Autor"> Autor </SelectItem>
                      <SelectItem value="CoAutor"> Co-Autor </SelectItem>
                      <SelectItem value="Ayudante"> Ayudante </SelectItem>
                      <SelectItem value="Encargado"> Encargado </SelectItem>
                      <SelectItem value="Supervisor"> Supervisor </SelectItem>
                      <SelectItem value="Editor"> Editor </SelectItem>
                      <SelectItem value="Revisor"> Revisor </SelectItem>
                      <SelectItem value="Colaborador"> Colaborador </SelectItem>
                      <SelectItem value="Asesor"> Asesor </SelectItem>
                      <SelectItem value="InvestigadorPrincipal">
                        Investigador Principal
                      </SelectItem>
                      <SelectItem value="Coordinador"> Coordinador </SelectItem>
                      <SelectItem value="Director"> Director </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormDescription>Escribe aquí el rol de participación.</FormDescription>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="participantes">
              <FormItem>
                <FormLabel>Participantes</FormLabel>
                <FormControl>
                  <div class="flex gap-2">
                    <Input type="text" v-bind="componentField" v-model="participantInformation" />
                    <Button
                      type="button"
                      @click="addParticipant()"
                      class="bg-blue-500 hover:bg-blue-400"
                    >
                      Añadir
                    </Button>
                  </div>
                </FormControl>
                <FormDescription>Escribe aquí los participantes.</FormDescription>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>
        </div>
        <div class="flex justify-between gap-10">
          <div class="mt-4 w-full h-32 overflow-auto border p-4 rounded-md">
            <p>Referencias:</p>
            <ul>
              <li
                class="flex items-center border p-4 rounded-md mt-2"
                v-for="reference in referencesList"
                :key="reference"
              >
                <div class="flex gap-4 items-center">
                  <DotFilledIcon />{{ reference }}
                  <Button
                    type="button"
                    class="p-0 px-2 bg-white shadow-none hover:bg-gray-200 text-gray-400 h-5"
                    @click="removeItem(referencesList, reference)"
                  >
                    X
                  </Button>
                </div>
              </li>
            </ul>
          </div>
          <div class="mt-4 w-full h-32 overflow-auto border p-4 rounded-md">
            <p>Participantes:</p>
            <ul>
              <li
                class="flex items-center border p-4 rounded-md mt-2"
                v-for="participant in participantList"
                :key="participant"
              >
                <div class="flex gap-4 items-center">
                  <DotFilledIcon />{{ participant }}
                  <Button
                    type="button"
                    class="p-0 px-2 bg-white shadow-none hover:bg-gray-200 text-gray-400 h-5"
                    @click="removeItem(participantList, participant)"
                  >
                    X
                  </Button>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="flex justify-end pt-4">
          <AlertDialog>
            <AlertDialogTrigger> <Button type="button">Confirmar</Button></AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  ¿Estás completamente seguro de que quieres editar este elemento?
                  <p class="text-sm font-normal">
                    Esta acción puede afectar los datos existentes. Revisa la información
                    cuidadosamente antes de confirmar los cambios.
                  </p>
                </AlertDialogTitle>
                <AlertDialogDescription class="h-60 overflow-auto">
                  <div class="p-1 flex flex-col gap-2">
                    <p>
                      <span class="capitalize text-gray-600 font-semibold">Título</span>:
                      {{ form.values.titulo }}
                    </p>
                    <p>
                      <span class="capitalize text-gray-600 font-semibold">Estado</span>:
                      {{ form.values.estado }}
                    </p>
                    <p>
                      <span class="capitalize text-gray-600 font-semibold"
                        >Área de especialidad</span
                      >: {{ form.values.area }}
                    </p>
                    <p>
                      <span class="capitalize text-gray-600 font-semibold">Referencias</span>:
                      {{ referencesList }}
                    </p>
                    <p>
                      <span class="capitalize text-gray-600 font-semibold">Autor</span>:
                      {{ form.values.autor }}
                    </p>
                    <p>
                      <span class="capitalize text-gray-600 font-semibold"
                        >Fecha de Publicación</span
                      >: {{ form.values.fechaPublicacion }}
                    </p>
                    <p>
                      <span class="capitalize text-gray-600 font-semibold"
                        >Rol de Participación</span
                      >: {{ form.values.rolParticipacion }}
                    </p>
                    <p>
                      <span class="capitalize text-gray-600 font-semibold">Participantes</span>:
                      {{ participantList }}
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

const formSchema = toTypedSchema(
  z.object({
    titulo: z
      .string({ message: 'El titulo es necesario para poder crear una nueva publicación' })
      .min(2, { message: 'El título debe tener al menos 2 caracteres' })
      .max(100, { message: 'El título no debe exceder los 100 caracteres' }),
    estado: z
      .string({ message: 'El estado es necesario para poder crear una nueva publicación' })
      .min(2, { message: 'El estado debe tener al menos 2 caracteres' })
      .max(50, { message: 'El estado no debe exceder los 50 caracteres' }),
    area: z
      .string({ message: 'El area es necesaria para poder crear una nueva publicación' })
      .min(2, { message: 'El área debe tener al menos 2 caracteres' })
      .max(50, { message: 'El área no debe exceder los 50 caracteres' }),
    fechaPublicacion: z
      .string({ message: 'La fecha es necesaria para poder crear una nueva publicación' })
      .min(10, { message: 'Fecha de publicación inválida' })
      .max(10, { message: 'Fecha de publicación inválida' }),
    autor: z
      .string({ message: 'El autor es necesario para poder crear una nueva publicación' })
      .min(2, { message: 'El nombre del autor debe tener al menos 2 caracteres' })
      .max(100, { message: 'El nombre del autor no debe exceder los 100 caracteres' }),
    /* referencias: z
      .array(
        z
          .string({ message: 'El autor es necesario para poder crear una nueva publicación' })
          .min(2, { message: 'Cada referencia debe tener al menos 2 caracteres' })
      )
      .nullable()
      .or(z.array(z.string()).length(0)), */
    rolParticipacion: z
      .string({ message: 'El rol es necesario para poder crear una nueva publicación' })
      .min(2, { message: 'El rol de participación debe tener al menos 2 caracteres' })
      .max(50, { message: 'El rol de participación no debe exceder los 50 caracteres' })
    /* participantes: z
      .string({
        message: 'Los participantes son necesarios para poder crear una nueva publicación'
      })
      .min(2, { message: 'Cada participante debe tener al menos 2 caracteres' }) */
  })
)

const participantList = ref([])
const referencesList = ref([])
const participantInformation = ref('')
const referenceInformation = ref('')
const router = useRouter()

const form = useForm({
  validationSchema: formSchema
})

form.setValues({
  titulo: 'Example Title',
  estado: 'Revision',
  autor: 'Jose Miguel Cervantes',
  area: 'Fisica',
  rolParticipacion: 'Autor',
  fechaPublicacion: '2024-12-12'
})

participantList.value.push('Victor')
participantList.value.push('Hiram')
participantList.value.push('Kenneth')
participantList.value.push('Mayer')

referencesList.value.push('https://es.wikipedia.org/wiki/Amor')
referencesList.value.push('https://es.wikipedia.org/wiki/Programaci%C3%B3n')
referencesList.value.push('https://es.wikipedia.org/wiki/Paja')
referencesList.value.push('https://es.wikipedia.org/wiki/Tesis')

const onSubmit = form.handleSubmit((values) => {
  values.referencesList = referencesList.value
  values.participantList = participantList.value
  console.log('Form submitted!', values)
  toast.success('Su registro ha sido editado con éxito')
  router.push(`/publicaciones`)
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
  router.push(`/publicaciones`)
}
const removeItem = (list, value) => {
  const index = list.indexOf(value)
  if (index !== -1) {
    list.splice(index, 1)
  }
}
</script>
