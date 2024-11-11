<template>
  <div class="p-8 space-y-4 max-w-4xl mx-auto">
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <RouterLink to="/" title="Boton para el index Capacitaciones">
            <BreadcrumbLink>Inicio </BreadcrumbLink>
          </RouterLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <RouterLink to="/capacitaciones" title="Boton para el index Capacitaciones">
            <BreadcrumbLink>Capacitaciones </BreadcrumbLink>
          </RouterLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Agregar</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
    <div class="py-4 flex flex-col gap-4">
      <form @submit="onSubmit">
        <div class="flex justify-between">
          <p class="text-3xl font-semibold">Agregar una capacitación</p>
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
                  <AlertDialogTitle
                    >¿Estas completamente seguro de que quieres añadir esta nueva capacitación?
                    <p class="text-sm font-normal">
                      Esta acción no puede deshacerse, y una vez agregado el registro no podrá ser
                      alterado a menos que se modifique especificamente, revisa la información 2
                      veces antes de confirmar el registro.
                    </p>
                  </AlertDialogTitle>
                  <AlertDialogDescription class="h-60 overflow-auto">
                    <div class="flex flex-col gap-2">
                      <p>
                        <span class="capitalize text-gray-600 font-semibold"
                          >Tipo de formación:</span
                        >:
                        {{ form.values.tipo_formacion }}
                      </p>
                      <p>
                        <span class="capitalize text-gray-600 font-semibold"
                          >Nombre de la capacitación:</span
                        >:
                        {{ form.values.nombre }}
                      </p>
                      <p>
                        <span class="capitalize text-gray-600 font-semibold"
                          >Año de la capacitación</span
                        >:
                        {{ form.values.anio }}
                      </p>
                      <p>
                        <span class="capitalize text-gray-600 font-semibold">Horas totales</span>:
                        {{ form.values.horas_totales }}
                      </p>
                      <p>
                        <span class="capitalize text-gray-600 font-semibold">Institución</span>:
                        {{ form.values.institucion }}
                      </p>
                      <p>
                        <span class="capitalize text-gray-600 font-semibold"
                          >Tipo de institución</span
                        >: {{ form.values.tipo_institucion }}
                      </p>
                      <p>
                        <span class="capitalize text-gray-600 font-semibold"
                          >Modalidad de la institución</span
                        >: {{ form.values.modalidad_institucion }}
                      </p>
                      <p>
                        <span class="capitalize text-gray-600 font-semibold">Descripción</span>:
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
                <FormLabel>Tipo de formación *</FormLabel>
                <Select v-bind="componentField">
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione la formación correspondiente" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="ACREDITACION"> Acreditación </SelectItem>
                      <SelectItem value="CERTIFICACION"> Certificación </SelectItem>
                      <SelectItem value="COACHING"> Coaching </SelectItem>
                      <SelectItem value="CURSO"> Curso </SelectItem>
                      <SelectItem value="DIPLOMADO"> Diplomado </SelectItem>
                      <SelectItem value="SEMINARIO"> Seminario </SelectItem>
                      <SelectItem value="TALLER"> Taller </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormDescription
                  >Selecciona el tipo de formación de la capacitación.</FormDescription
                >
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="nombre">
              <FormItem>
                <FormLabel>Nombre de la capacitación *</FormLabel>
                <FormControl>
                  <Input type="text" v-bind="componentField" />
                </FormControl>
                <FormDescription>Ingresa el nombre de tu capacitación.</FormDescription>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="anio">
              <FormItem>
                <FormLabel>Año de la capacitación *</FormLabel>
                <Select v-bind="componentField">
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione el año" />
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
                  >Selecciona el año en que se realizó la capacitación.</FormDescription
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
                <FormDescription
                  >Ingresa el número total de horas de la capacitación.</FormDescription
                >
                <FormMessage />
              </FormItem>
            </FormField>
          </div>

          <div class="flex flex-col w-full">
            <FormField v-slot="{ componentField }" name="institucion">
              <FormItem>
                <FormLabel>Nombre de la institución *</FormLabel>
                <FormControl>
                  <Input type="text" v-bind="componentField" />
                </FormControl>
                <FormDescription
                  >Ingresa el nombre de la institución donde se realizó la
                  capacitación.</FormDescription
                >
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="tipo_institucion">
              <FormItem>
                <FormLabel>Tipo de institución *</FormLabel>
                <Select v-bind="componentField">
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione el tipo de institución" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="EXTRANJERA"> Extranjera </SelectItem>
                      <SelectItem value="NACIONAL"> Nacional </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormDescription
                  >Selecciona el tipo de institución donde se realizó la
                  capacitación.</FormDescription
                >
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="modalidad_institucion">
              <FormItem>
                <FormLabel>Modalidad de la institución *</FormLabel>
                <Select v-bind="componentField">
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione la modalidad correspondiente" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="PUBLICA_FEDERAL"> Pública - Federal </SelectItem>
                      <SelectItem value="PUBLICA_ESTATAL"> Pública - Estatal </SelectItem>
                      <SelectItem value="PUBLICA_MUNICIPAL"> Pública - Municipal </SelectItem>
                      <SelectItem value="PRIVADA"> Privada </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormDescription
                  >Selecciona la modalidad de la institución donde se realizó la
                  capacitación.</FormDescription
                >
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="descripcion">
              <FormItem>
                <FormLabel>Descripción *</FormLabel>
                <FormControl>
                  <Input type="text" v-bind="componentField" />
                </FormControl>
                <FormDescription>Ingresa una descripción de la capacitación.</FormDescription>
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
                <AlertDialogTitle
                  >¿Estás completamente seguro de que quieres añadir esta nueva capacitación?
                  <p class="text-sm font-normal">
                    Esta acción no puede deshacerse, y una vez agregado el registro no podrá ser
                    alterado a menos que se modifique especificamente, revisa la información 2 veces
                    antes de confirmar el registro.
                  </p>
                </AlertDialogTitle>
                <AlertDialogDescription class="h-60 overflow-auto">
                  <div class="flex flex-col gap-2">
                    <p>
                      <span class="capitalize text-gray-600 font-semibold">Tipo de formación:</span
                      >:
                      {{ form.values.tipo_formacion }}
                    </p>
                    <p>
                      <span class="capitalize text-gray-600 font-semibold"
                        >Nombre de la capacitación:</span
                      >:
                      {{ form.values.nombre }}
                    </p>
                    <p>
                      <span class="capitalize text-gray-600 font-semibold"
                        >Año de la capacitación</span
                      >:
                      {{ form.values.anio }}
                    </p>
                    <p>
                      <span class="capitalize text-gray-600 font-semibold">Horas totales</span>:
                      {{ form.values.horas_totales }}
                    </p>
                    <p>
                      <span class="capitalize text-gray-600 font-semibold">Institución</span>:
                      {{ form.values.institucion }}
                    </p>
                    <p>
                      <span class="capitalize text-gray-600 font-semibold">Tipo de institución</span
                      >: {{ form.values.tipo_institucion }}
                    </p>
                    <p>
                      <span class="capitalize text-gray-600 font-semibold"
                        >Modalidad de la institución</span
                      >: {{ form.values.modalidad_institucion }}
                    </p>
                    <p>
                      <span class="capitalize text-gray-600 font-semibold">Descripción</span>:
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
import { ref } from 'vue'
import { toast } from 'vue-sonner'
import { useRouter } from 'vue-router'
import axios from '@/lib/axios'

const formSchema = toTypedSchema(
  z.object({
    tipo_formacion: z
      .string({ message: 'El tipo de formación es necesario para crear una nueva capacitación' })
      .min(2, { message: 'El tipo de formación debe tener al menos 2 caracteres' })
      .max(50, { message: 'El tipo de formación no debe exceder los 50 caracteres' }),
    nombre: z
      .string({
        message: 'El nombre de la capacitación es necesario para crear una nueva capacitación'
      })
      .min(2, { message: 'El nombre de la capacitación debe tener al menos 2 caracteres' })
      .max(100, { message: 'El nombre de la capacitación no debe exceder los 100 caracteres' }),
    anio: z.string({
      message: 'El año de la capacitación es necesario para crear una nueva capacitación'
    }),
    horas_totales: z.number({
      message: 'El número total de horas es necesario para crear una nueva capacitación'
    }),
    institucion: z
      .string({
        message: 'El nombre de la institución es necesario para crear una nueva capacitación'
      })
      .min(2, { message: 'El nombre de la institución debe tener al menos 2 caracteres' })
      .max(150, { message: 'El nombre de la institución no debe exceder los 150 caracteres' }),
    tipo_institucion: z.string({
      message: 'El tipo de institución es necesario para crear una nueva capacitación'
    }),
    modalidad_institucion: z.string({
      message: 'La modalidad de la institución es necesaria para crear una nueva capacitación'
    }),
    descripcion: z
      .string({ message: 'La descripción es necesaria para crear una nueva capacitación' })
      .min(10, { message: 'La descripción debe tener al menos 10 caracteres' })
  })
)

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
  console.log(values)
  axios
    .post(`/api/v1/user/courses/`, values)
    .then((res) => {
      toast.success('La capacitación ha sido agregada con éxito')
      router.push(`/capacitaciones`)
    })
    .catch((error) => {
      toast.error('Ha ocurrido un error inesperado.')
      console.log(error)
    })
})
const turnBack = () => {
  router.push(`/capacitaciones`)
}
</script>
