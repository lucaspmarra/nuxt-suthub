<script setup>
import {useUserStore} from "~/stores/user-store.ts";

definePageMeta({
  layout: 'register'
})

import {ref, computed, watch} from 'vue'
import {Listbox, ListboxButton, ListboxOptions, ListboxOption} from '@headlessui/vue'
import {ChevronUpDownIcon} from '@heroicons/vue/20/solid'

const userStore = useUserStore();
const form = ref({
  birthDate: '',
  cep: '',
  city: '',
  cpf: '',
  customBreed: '',
  fullName: '',
  monthlyIncome: '',
  neighborhood: '',
  petBreed: '',
  petType: '',
  state: '',
  street: ''
})

const errors = ref({})

const petTypes = ['cão', 'gato']
const breeds = {
  'cão': ['Labrador', 'Pastor Alemão', 'Golden Retriever', 'Bulldog', 'Poodle', 'outro'],
  'gato': ['Siamês', 'Persa', 'Maine Coon', 'Angorá', 'British Shorthair', 'outro']
}

const availableBreeds = computed(() => {
  return form.value.petType ? breeds[form.value.petType] : []
})


const today = new Date()
const minDate = new Date(today.getFullYear() - 65, today.getMonth(), today.getDate()).toISOString().split('T')[0]
const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate()).toISOString().split('T')[0]


const validateCPF = (cpf) => {
  cpf = cpf.replace(/\D/g, '')

  if (cpf.length !== 11) return false

  let sum = 0
  let remainder

  if (cpf === '00000000000') return false

  for (let i = 1; i <= 9; i++) {
    sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i)
  }

  remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== parseInt(cpf.substring(9, 10))) return false

  sum = 0
  for (let i = 1; i <= 10; i++) {
    sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i)
  }

  remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  return remainder === parseInt(cpf.substring(10, 11));


}


const formatCPF = (value) => {
  const cpf = value.replace(/\D/g, '')
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4')
}

const formatCurrency = (value) => {
  const number = value.replace(/\D/g, '')
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(number / 100)
}


const searchCEP = async () => {
  if (form.value.cep.length === 8) {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${form.value.cep}/json/`)
      const data = await response.json()

      if (!data.error) {
        form.value.street = data.logradouro
        form.value.neighborhood = data.bairro
        form.value.city = data.localidade
        form.value.state = data.uf
      }
    } catch (error) {
      console.error('Error fetching CEP:', error)
    }
  }
}


const handleSubmit = async () => {
  console.log('✅ Form submitted: ', form.value);
  userStore.user = form.value;

  try {
    const response = await userStore.createUser();
    console.log('✅ User created successfully:', response);
  } catch (error) {
    console.log('⚠️ Error in form submission:', error);
  }
};


watch(() => form.value.cep, (newValue) => {
  if (newValue.length === 8) {
    searchCEP()
  }
})
</script>

<template>
  <main class="flex items-center justify-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="w-full max-w-3xl bg-white p-8 rounded-lg shadow-md">
      <h2 class="text-2xl font-bold mb-8 text-gray-900">Cadastro de Pet</h2>

      <form @submit.prevent.stop="handleSubmit" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Full Name -->
          <div>
            <label for="fullName" class="block text-sm font-medium text-gray-700">Nome completo</label>
            <input
                type="text"
                id="fullName"
                v-model="form.fullName"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <!-- Birth Date -->
          <div>
            <label for="birthDate" class="block text-sm font-medium text-gray-700">Data de nascimento</label>
            <input
                type="date"
                id="birthDate"
                v-model="form.birthDate"
                :min="minDate"
                :max="maxDate"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />

          </div>

          <!-- CPF -->
          <div>
            <label for="cpf" class="block text-sm font-medium text-gray-700">CPF</label>
            <input
                type="text"
                id="cpf"
                v-model="form.cpf"
                @input="form.cpf = formatCPF($event.target.value)"
                maxlength="14"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"

            />

          </div>

          <!-- Monthly Income -->
          <div>
            <label for="monthlyIncome" class="block text-sm font-medium text-gray-700">Renda mensal</label>
            <div class="mt-1 relative rounded-md shadow-sm">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span class="text-gray-500 sm:text-sm">R$</span>
              </div>
              <input
                  type="text"
                  id="monthlyIncome"
                  v-model="form.monthlyIncome"
                  @input="form.monthlyIncome = formatCurrency($event.target.value)"
                  class="block w-full pl-12 rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"

              />
            </div>

          </div>

          <!-- Pet Type -->
          <div>
            <label for="petType" class="block text-sm font-medium text-gray-700">Espécie do pet</label>
            <Listbox id="petType" v-model="form.petType">
              <div class="relative mt-1">
                <ListboxButton
                    class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
                >
                  <span class="block truncate">{{ form.petType || 'Selecione a espécie do pet' }}</span>
                  <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true"/>
                  </span>
                </ListboxButton>
                <ListboxOptions
                    class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  <ListboxOption
                      v-for="type in petTypes"
                      :key="type"
                      :value="type"
                      v-slot="{ active, selected }"
                  >
                    <div
                        :class="[active ? 'bg-blue-600 text-white' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-3 pr-9']">
                      <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">{{ type }}</span>
                    </div>
                  </ListboxOption>
                </ListboxOptions>
              </div>
            </Listbox>

          </div>

          <!-- Pet Breed -->
          <div>
            <label for="petType" class="block text-sm font-medium text-gray-700">Nome do pet</label>
            <Listbox v-model="form.petBreed" :disabled="!form.petType">
              <div class="relative mt-1">
                <ListboxButton
                    class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"

                >
                  <span class="block truncate">{{ form.petBreed || 'Selecione a raça do pet' }}</span>
                  <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true"/>
                  </span>
                </ListboxButton>
                <ListboxOptions
                    class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  <ListboxOption
                      v-for="breed in availableBreeds"
                      :key="breed"
                      :value="breed"
                      v-slot="{ active, selected }"
                  >
                    <div
                        :class="[active ? 'bg-blue-600 text-white' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-3 pr-9']">
                      <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">{{ breed }}</span>
                    </div>
                  </ListboxOption>
                </ListboxOptions>
              </div>
            </Listbox>

          </div>

          <!-- Custom Breed -->
          <div v-if="form.petBreed === 'outro'">
            <label for="customBreed" class="block text-sm font-medium text-gray-700">Nome da raça</label>
            <input
                type="text"
                id="customBreed"
                v-model="form.customBreed"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"

            />

          </div>

          <!-- CEP -->
          <div>
            <label for="cep" class="block text-sm font-medium text-gray-700">CEP</label>
            <input
                type="text"
                id="cep"
                v-model="form.cep"
                @input="$event.target.value = $event.target.value.replace(/\D/g, '').substring(0, 8)"
                maxlength="8"
                placeholder="00000000"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"

            />

          </div>

          <!-- Street -->
          <div>
            <label for="street" class="block text-sm font-medium text-gray-700">Rua</label>
            <input
                type="text"
                id="street"
                v-model="form.street"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"

            />

          </div>

          <!-- Neighborhood -->
          <div>
            <label for="neighborhood" class="block text-sm font-medium text-gray-700">Bairro</label>
            <input
                type="text"
                id="neighborhood"
                v-model="form.neighborhood"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"

            />

          </div>

          <!-- City -->
          <div>
            <label for="city" class="block text-sm font-medium text-gray-700">Cidade</label>
            <input
                type="text"
                id="city"
                v-model="form.city"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"

            />

          </div>

          <!-- State -->
          <div>
            <label for="state" class="block text-sm font-medium text-gray-700">Estado</label>
            <input
                type="text"
                id="state"
                v-model="form.state"
                @input="$event.target.value = $event.target.value.toUpperCase().substring(0, 2)"
                maxlength="2"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"

            />

          </div>
        </div>

        <!-- Submit Button -->
        <div class="flex justify-end mt-6">
          <button
              type="submit"
              class="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  </main>
</template>