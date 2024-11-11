<script setup lang="ts">
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from '@/lib/zod'

const formSchema = toTypedSchema(
    z.object({
        nombre: z.string(),
        primer_apellido: z.string(),
        segundo_apellido: z.string(),
        orc_id: z.string(),
        orden: z.number()
    })
)

const form = useForm({
    validationSchema: formSchema
})

const emit = defineEmits(['submit'])

const handleSubmit = form.handleSubmit((author, { resetForm }) => {
    emit('submit', author)
    resetForm()
})
</script>

<template>
    <form @submit="handleSubmit" class="space-y-4">
        <div class="grid gap-4 sm:grid-cols-3">
        <FormField v-slot="{ componentField }" name="nombre">
            <FormItem>
                <FormLabel>Nombre*</FormLabel>
                <FormControl>
                    <Input type="text" v-bind="componentField" />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>
            <FormField v-slot="{ componentField }" name="primer_apellido">
                <FormItem>
                    <FormLabel>Primer apellido*</FormLabel>
                    <FormControl>
                        <Input type="text" v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="segundo_apellido">
                <FormItem>
                    <FormLabel>Segundo apellido*</FormLabel>
                    <FormControl>
                        <Input type="text" v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>
        </div>
        <div class="grid gap-4 grid-cols-2">
                <FormField v-slot="{ componentField }" name="orc_id">
                    <FormItem>
                        <FormLabel>ORC ID*</FormLabel>
                        <FormControl>
                            <Input type="text" v-bind="componentField" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>
                <FormField class="flex-1" v-slot="{ componentField }" name="orden">
                    <FormItem>
                        <FormLabel>Orden*</FormLabel>
                        <FormControl>
                            <Input type="number" v-bind="componentField" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>
        </div>
        <div class="flex justify-end">
        <Button type="submit" class="w-28">Añadir</Button>
        </div>
    </form>
</template>
