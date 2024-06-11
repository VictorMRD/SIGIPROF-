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
          <BreadcrumbPage>Autores</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
    <div class="py-4 flex flex-col gap-4">
      <form @submit="onSubmit">
        <div class="flex justify-between">
          <p class="text-3xl font-semibold">Agregar autores</p>
          <div class="flex gap-2">
            <Button
              type="button"
              @click="turnBack"
              class="bg-white-500 text-black hover:bg-gray-200"
              >Regresar</Button
            >
          </div>
        </div>
        <div class="border p-4 mt-4 rounded-md">
          <p class="text-2xl font-bold pb-4">Autores</p>
          <div class="flex w-full gap-4 justify-between">
            <!-- <FormField v-slot="{ componentField }" name="nombre">
              <FormItem class="w-full">
                <FormLabel>Nombre del autor *</FormLabel>
                <FormControl>
                  <div class="flex gap-2">
                    <Input type="text" v-bind="componentField" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField> -->
            <FormField v-slot="{ componentField }" name="primer_apellido">
              <FormItem class="w-full">
                <FormLabel>Apellido del autor *</FormLabel>
                <FormControl>
                  <div class="flex gap-2">
                    <Input type="text" v-bind="componentField" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="segundo_apellido">
              <FormItem class="w-full">
                <FormLabel>Segundo apellido del autor *</FormLabel>
                <FormControl>
                  <div class="flex gap-2">
                    <Input type="text" v-bind="componentField" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>
          <div class="flex gap-4">
            <FormField v-slot="{ componentField }" name="orc_id">
              <FormItem>
                <FormLabel>ORC ID</FormLabel>
                <FormControl>
                  <div class="flex gap-2">
                    <Input type="number" v-bind="componentField" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>
          <Button type="submit" @click="onSubmit" class="bg-blue-500 hover:bg-blue-400 mt-4">
            Añadir
          </Button>
          <div class="mt-4 w-full h-32 overflow-auto border p-4 rounded-md">
            <p>Participantes:</p>
            <ul>
              <li
                class="flex items-center"
                v-for="participant in participantList"
                :key="participant"
              >
                <div class="flex gap-4 items-center"><DotFilledIcon />{{ participant }}</div>
              </li>
            </ul>
          </div>
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
    primer_apellido: z.string().min(2).max(50),
    segundo_apellido: z.string().min(2).max(50),
    orc_id: z.number()
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
  console.log('Form submitted!', values)
  toast.success('Su registro ha sido añadido con éxito')
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
</script>
