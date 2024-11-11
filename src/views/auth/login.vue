<template>
  <div class="flex w-full">
    <div
      id="left-side"
      class="bg-muted/40 h-screen w-full flex flex-col items-center justify-center gap-3"
    >
      <p class="text-5xl font-semibold">SIGIPROF</p>
      <p class="text-md font-extralight">Sistema de Gestión de Información Profesional Docente</p>
    </div>
    <div id="right-side" class="h-sreen w-full flex justify-center items-center">
      <div class="w-72 flex flex-col gap-4">
        <div class="text-center space-y-2">
          <p class="font-semibold text-3xl">Inicia Sesión</p>
          <p class="text-sm text-center text-muted-foreground text-nowrap">
            Ingresa tus credenciales para entrar al sistema
          </p>
        </div>
        <form @submit="onSubmit" class="flex flex-col gap-2">
          <FormField v-slot="{ componentField }" name="email">
            <FormItem>
              <FormControl>
                <Input type="email" placeholder="Correo Electronico" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="password">
            <FormItem>
              <FormControl>
                <Input type="password" placeholder="Contraseña" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <Button type="submit"> Submit </Button>
        </form>
        <p class="text-xs text-center text-muted-foreground">
          Al iniciar sesión acepta todos los terminos y condiciones acerca del servicio y la
          privacidad del mismo.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toTypedSchema } from '@vee-validate/zod'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import * as z from 'zod'
import { useForm } from 'vee-validate'
import { useRouter } from 'vue-router'
import axios from '@/lib/axios'
import { toast } from 'vue-sonner'

/* Login Form Schema */
const formSchema = toTypedSchema(
  z.object({
    email: z
      .string({ message: 'Debe ingresar su correo para poder iniciar sesión' })
      .email({ message: 'Debe ingresar un correo válido' })
      .min(2, { message: 'El correo debe tener al menos 2 caracteres' })
      .max(50, { message: 'El correo no debe exceder los 50 caracteres' }),
    password: z
      .string({ message: 'Debe ingresar su contraseña para poder iniciar sesión' })
      .min(2, { message: 'La contraseña debe tener al menos 2 caracteres' })
      .max(50, { message: 'La contraseña no debe exceder los 50 caracteres' })
  })
)
const form = useForm({
  validationSchema: formSchema
})
const router = useRouter()
const onSubmit = form.handleSubmit(async (values) => {
  console.log('Form submitted!', values)
  try {
    await axios.get('/sanctum/csrf-cookie')

    const res = await axios.post('/login', values)

    toast.success('Ha iniciado sesión con éxito')
    localStorage.setItem('user', JSON.stringify(res))
    router.push(`/index`)
  } catch (error) {
    console.error(error)
  }
})
</script>

<style scope>
/* #left-side {
  background-image: url('@/assets/uabcs-modified.jpeg');
  background-position: center;
  background-size: cover;
} */
</style>
