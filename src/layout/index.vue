<template>
  <div
    v-if="searchActivated"
    class="absolute w-full h-screen z-30 opacity-100 flex justify-center items-center"
  >
    <div
      class="bg-black absolute w-full h-screen opacity-50 overscroll-none"
      @click="handleSearchInput"
    ></div>
    <div class="w-1/3 h-1/3 z-50 flex rounded-sm">
      <Command class="w-full">
        <CommandInput placeholder="Type a command or search..." />
        <CommandList @click="handleSearchInput">
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem value="calendar"> Calendar </CommandItem>
            <CommandItem value="search-emoji"> Search Emoji </CommandItem>
            <CommandItem value="calculator"> Calculator </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem value="profile"> Profile </CommandItem>
            <CommandItem value="billing"> Billing </CommandItem>
            <CommandItem value="settings"> Settings </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  </div>
  <div class="sticky top-0 bg-background/90 backdrop-blur-lg border-b border-border">
    <div class="max-w-6xl mx-auto py-3">
      <div class="flex items-center justify-between">
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
                    <div
                      class="flex h-full w-full select-none flex-col px-4 border-r border-muted-foreground/20 space-y-3"
                    >
                      <h2 class="text-lg font-medium">Producción</h2>
                      <p class="text-xs text-muted-foreground leading-4">
                        Esta sección está destinada a todo lo relacionado con la producción
                        académica y profesional del docente.
                      </p>
                    </div>
                  </li>
                  <div class="flex flex-col items-start justify-center">
                    <RouterLink
                      to="/publicaciones"
                      title="Boton para el index Publicaciones"
                      :class="navigationMenuTriggerStyle()"
                    >
                      <NavigationMenuLink>Publicaciones</NavigationMenuLink>
                    </RouterLink>
                    <RouterLink
                      to="/libros"
                      title="Boton para el index Libros"
                      :class="navigationMenuTriggerStyle()"
                    >
                      <NavigationMenuLink>Libros</NavigationMenuLink>
                    </RouterLink>
                    <RouterLink
                      to="/cursos"
                      title="Boton para el index Cursos"
                      :class="navigationMenuTriggerStyle()"
                    >
                      <NavigationMenuLink>Cursos</NavigationMenuLink>
                    </RouterLink>
                    <RouterLink
                      to="/capacitaciones"
                      title="Boton para el index Capacitaciones"
                      :class="navigationMenuTriggerStyle()"
                    >
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
                  class="grid gap-3 p-6 md:w-[500px] lg:w-[500px] md:grid-cols-[minmax(0,.75fr)_minmax(0,1fr)] lg:grid-cols-[minmax(0,.75fr)_minmax(0,1fr)]"
                >
                  <li class="row-span-4">
                    <div
                      class="flex h-full w-full select-none flex-col px-4 border-r border-muted-foreground/20 space-y-3"
                    >
                      <div class="text-xl font-medium">Proyectos</div>
                      <p class="text-xs text-muted-foreground leading-4">
                        Sección destinada a la gestión y seguimiento de los proyectos en los que el
                        docente haya participado.
                      </p>
                    </div>
                  </li>
                  <div class="flex flex-col items-start justify-center">
                    <RouterLink
                      to="/proyectos"
                      title="Boton para el index Lista de Proyectos"
                      :class="navigationMenuTriggerStyle()"
                    >
                      <NavigationMenuLink>Lista de Proyectos</NavigationMenuLink>
                    </RouterLink>
                    <RouterLink
                      to="/proyectos/registrar"
                      title="Boton para el index Registrar proyecto"
                      :class="navigationMenuTriggerStyle()"
                    >
                      <NavigationMenuLink>Registrar un Proyecto</NavigationMenuLink>
                    </RouterLink>
                  </div>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <RouterLink to="/reportes" title="Boton para el index Capacitaciones">
                <NavigationMenuLink :class="navigationMenuTriggerStyle()">
                  <p class="font-semibold">Reportes</p>
                </NavigationMenuLink>
              </RouterLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div class="flex gap-4 justify-center items-center">
          <div>
            <Button
              variant="outline"
              class="transition-all duration-200 h-8 w-44 flex justify-start items-center select-none focus-visible:ring-transparent font-normal"
              @click="handleSearchInput"
            >
              Buscar...
            </Button>
            <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
              <Search class="size-6 text-muted-foreground" />
            </span>
          </div>
          <div>
            <DropdownMenu class="border-0">
              <DropdownMenuTrigger as-child>
                <Button variant="primary">
                  <Icon
                    icon="radix-icons:moon"
                    class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
                  />
                  <Icon
                    icon="radix-icons:sun"
                    class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
                  />
                  <span class="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem @click="mode = 'light'"> Light </DropdownMenuItem>
                <DropdownMenuItem @click="mode = 'dark'"> Dark </DropdownMenuItem>
                <DropdownMenuItem @click="mode = 'auto'"> System </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger class="w-8 h-8 rounded-full">
              <img src="https://avatar.iran.liara.run/public/35" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <!-- <DropdownMenuItem>Mi perfil</DropdownMenuItem> -->
              <DropdownMenuSeparator />
              <DropdownMenuItem @click="logout">Cerrar Sesión</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
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
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut
} from '@/components/ui/command'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Icon } from '@iconify/vue'
import { useColorMode } from '@vueuse/core'
import { useRouter } from 'vue-router'
import axios from '@/lib/axios'
import { toast } from 'vue-sonner'
import { ref, watch } from 'vue'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()

const router = useRouter()
const mode = useColorMode()
const searchActivated = ref(false)
const logout = async () => {
  try {
    await axios.post('/logout')
    appStore.clearUser()
    toast.success('Ha cerrado sesión')
    router.push(`/login`)
  } catch (error) {
    console.error(error)
  }
}
function handleSearchInput() {
  searchActivated.value = !searchActivated.value
}

watch(searchActivated, () => {
  if (searchActivated.value == true) {
    document.body.style.overflow = 'hidden'
    console.log('hidden')
  } else {
    console.log('visible')
    document.body.style.overflow = 'visible'
  }
})
</script>
