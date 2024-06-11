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
          <BreadcrumbPage>Crear</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
    <div class="py-4 flex flex-col gap-4">
      <form @submit="onSubmit">
        <div class="flex justify-between">
          <p class="text-3xl font-semibold">Crear una publicación</p>
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
                  <AlertDialogTitle
                    >¿Estas completamente seguro de que quieres añadir este nuevo elemento?
                    <p class="text-sm font-normal">
                      Esta acción no puede deshacerse, y una vez agregado el registro no podrá ser
                      alterado a menos que se modifique especificamente, revisa la información 2
                      veces antes de confirmar el registro.
                    </p>
                  </AlertDialogTitle>
                  <AlertDialogDescription class="h-60 overflow-auto">
                    <div class="flex flex-col gap-2">
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
        <div class="border p-4 mt-4 rounded-md">
          <p class="text-2xl font-bold pb-4">Autores</p>
          <FormField v-slot="{ componentField }" name="participantes">
            <FormItem>
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
          <div class="mt-4 w-full h-32 overflow-auto border p-4 rounded-md">
            <p>Participantes:</p>
            <ul>
              <li
                class="flex items-center"
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
                <AlertDialogTitle
                  >¿Estas completamente seguro de que quieres añadir este nuevo elemento?
                  <p class="text-sm font-normal">
                    Esta acción no puede deshacerse, y una vez agregado el registro no podrá ser
                    alterado a menos que se modifique especificamente, revisa la información 2 veces
                    antes de confirmar el registro.
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
                      {{ form.values.status }}
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

const formSchema = toTypedSchema(
  z.object({
    titulo: z.string().min(2).max(100),
    status: z.string().min(2).max(50),
    area: z.string().min(2).max(50),
    rolParticipacion: z.string().min(2).max(50),
    tiene_issn: z.string(),
    issn_impreso: z.number(),
    issn_electronico: z.number(),
    doi: z.string(),
    nombre_revista: z.string(),
    anio_publicacion: z.string(),
    programa_conahcyt: z.string(),
    objetivo: z.string(),
    url_cita: z.string(),
    cita_a: z.number(),
    cita_b: z.number(),
    total_citas: z.number()
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
  'Fondo institucional',
  'Fondo mixto',
  'Fondo Mixto Aguascalientes',
  'Fondo Mixto Baja California',
  'Fondo Mixto Baja California Sur',
  'Fondo Mixto Campeche',
  'Fondo Mixto Chiapas',
  'Fondo Mixto Chihuahua',
  'Fondo Mixto Ciudad de México',
  'Fondo Mixto Ciudad Juárez',
  'Fondo Mixto Coahuila',
  'Fondo Mixto Colima',
  'Fondo Mixto Durango',
  'Fondo Mixto Estado de México',
  'Fondo Mixto Guanajuato',
  'Fondo Mixto Guerrero',
  'Fondo Mixto Hidalgo',
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
  'Fondos y Apoyos Institucionales - Fondo de Cooperación Internacional en Ciencia y Tecnología del CONACYT (FONCICY',
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
  if (form.values.issn_electronico === 0) {
    values.issn_electronico = null
  }
  if (form.values.issn_impreso === 0) {
    values.issn_impreso = null
  }
  console.log('Form submitted!', values)
  toast.success('Su registro ha sido añadido con éxito')
  // router.push(`/publicaciones`);
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
  console.log(form.values.tiene_issn)
  console.log(form.values)
}

watch(issn_type, async () => {
  if (issn_type.value === 'impreso') {
    isIssnImpresoEnabled.value = false
    isIssnElectronicoEnabled.value = true
    form.setFieldValue('issn_electronico', 0, { shouldValidate: false })
    form.setFieldValue('issn_impreso', undefined, { shouldValidate: false })
  } else if (issn_type.value === 'electronico') {
    isIssnElectronicoEnabled.value = false
    isIssnImpresoEnabled.value = true
    form.setFieldValue('issn_impreso', 0, { shouldValidate: false })
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
