<template>
  <div class="px-10 py-0 border-b-2 border-slate-200 border-solid w-full flex items-center justify-between px-24">
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <RouterLink to="/index" title="Boton para el index Capacitaciones">
              <NavigationMenuLink :class="navigationMenuTriggerStyle()">
                <p class="font-semibold">SIGIPROF</p>
              </NavigationMenuLink>
            </RouterLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Producción</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul
              class="grid gap-3 p-6 md:w-[500px] lg:w-[500px] md:grid-cols-[minmax(0,.75fr)_minmax(0,1fr)] lg:grid-cols-[minmax(0,.75fr)_minmax(0,1fr)]"
            >
              <li class="row-span-4">
                <p
                  class="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-2 no-underline outline-none focus:shadow-md border-r-2 border-solid border-gray-200
                  "
                >
                  <img src="@/assets/uabcs-logo.png" class="w-32" />
                  <div class="mb-2 mt-4 text-xl font-medium">Producción</div>
                  <p class="text-sm leading-tight text-muted-foreground">
                    Esta sección está destinada a todo lo relacionado con la producción académica y profesional del docente.
                  </p>
                </p>
              </li>
              <div class="flex flex-col items-start justify-center">
                <RouterLink to="/publicaciones" title="Boton para el index Publicaciones" :class="navigationMenuTriggerStyle()">
                  <NavigationMenuLink>Publicaciones</NavigationMenuLink>
                </RouterLink>
                <RouterLink to="/libros" title="Boton para el index Libros" :class="navigationMenuTriggerStyle()">
                  <NavigationMenuLink>Libros</NavigationMenuLink>
                </RouterLink>
                <RouterLink to="/cursos" title="Boton para el index Cursos" :class="navigationMenuTriggerStyle()">
                  <NavigationMenuLink>Cursos</NavigationMenuLink>
                </RouterLink>
                <RouterLink to="/capacitaciones" title="Boton para el index Capacitaciones" :class="navigationMenuTriggerStyle()">
                  <NavigationMenuLink>Capacitaciones</NavigationMenuLink>
                </RouterLink>
              </div>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Proyectos</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul
              class="grid gap-3 p-6 md:w-[500px] lg:w-[500px] md:grid-cols-[minmax(0,.75fr)_minmax(0,1fr)]  lg:grid-cols-[minmax(0,.75fr)_minmax(0,1fr)]"
            >
              <li class="row-span-4">
                <p
                  class="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-2 no-underline outline-none focus:shadow-md border-r-2 border-solid border-gray-200"
                >
                  <img src="@/assets/proyectos-icono.png" class="w-32" />
                  <div class="mb-2 mt-4 text-lg font-medium">Proyectos</div>
                  <p class="text-sm leading-tight text-muted-foreground">
                    Sección destinada a la gestión y seguimiento de los proyectos en los que el docente haya participado.
                  </p>
                </p>
              </li>
              <div class="flex flex-col items-start justify-center">
                <RouterLink to="/proyectos" title="Boton para el index Lista de Proyectos" :class="navigationMenuTriggerStyle()">
                  <NavigationMenuLink>Lista de Proyectos</NavigationMenuLink>
                </RouterLink>
                <RouterLink to="/proyectos/registrar" title="Boton para el index Registrar proyecto" :class="navigationMenuTriggerStyle()">
                  <NavigationMenuLink>Registrar un Proyecto</NavigationMenuLink>
                </RouterLink>
              </div>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="/docs" :class="navigationMenuTriggerStyle()">
            Documentation
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
    <DropdownMenu>
      <DropdownMenuTrigger class="w-8 h-8 rounded-full bg-gray-400"></DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Mi perfil</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <!-- <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem> -->
        <DropdownMenuItem @click="logout">Cerrar Sesión</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
  <router-view />
</template>

<script setup lang="ts">
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useRouter } from 'vue-router'
import axios from '@/lib/axios'
import { toast } from 'vue-sonner'

const router = useRouter()
const logout = async () =>{
  try{
    const res = await axios.post('/logout')

    toast.success('Ha cerrado sesión')
    localStorage.removeItem('user')
    router.push(`/login`)
  }catch(error){
    console.error(error)
  }
}
</script>
