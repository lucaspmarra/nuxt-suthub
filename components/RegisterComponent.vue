<script setup lang="ts">
import {useUserStore} from "~/stores/user-store.ts";
import {ref, computed, watch} from 'vue'
import {
  Listbox, ListboxButton, ListboxOptions, ListboxOption,
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'
import {ChevronUpDownIcon} from '@heroicons/vue/20/solid'


const userStore = useUserStore();
const form = ref<IUserRegister>({
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
const step = ref<number>(1);
const errors = ref({})
const petTypes = ['cão', 'gato']
const breeds = {
  'cão': ['Labrador', 'Pastor Alemão', 'Golden Retriever', 'Bulldog', 'Poodle', 'outro'],
  'gato': ['Siamês', 'Persa', 'Maine Coon', 'Angorá', 'British Shorthair', 'outro']
}
const availableBreeds = computed(() => {
  return form.value.petType ? breeds[form.value.petType] : []
})
const isOpen = ref(false)


const maskedCpf = ref<string>('')
const unmaskedCpf = ref<string>('')
const zipcodeFormatted = ref<string>('')
const zipcode = ref<string>('')

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

const formatCurrency = (value) => {
  const number = value.replace(/\D/g, '')
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(number / 100)
}

const searchCEP = async () => {
  console.log(zipcode.value)
  if (zipcode.value.length === 8) {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${zipcode.value}/json/`)
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
  form.value.monthlyIncome = parseFloat(form.value.monthlyIncome.replace('.', '').replace(',', '.'));

  console.log('✅ Form submitted: ', form.value);
  userStore.user = form.value;

  try {
    const response = await userStore.createUser();
    console.log('✅ User created successfully:', response);
  } catch (error) {
    console.log('⚠️ Error in form submission:', error);
  }
};

function closeModal() {
  isOpen.value = false
}

function openModal() {
  isOpen.value = true
}

watch(zipcode, (value) => {
  form.value.cep = value;
});

watch(unmaskedCpf, (value) => {
  form.value.cpf = value;
});

watch(() => form.value.petType, (value) => {
  form.value.petBreed = null;
});

defineExpose({zipcode, unmaskedCpf})

</script>

<template>
  <div class="relative w-full max-w-3xl bg-white p-8 rounded-lg shadow-md">
    <img src="~/assets/lemonadepixel_kidschores-82.png" alt="Icone 1"
         class="absolute top-[-20px] left-[-15px] w-12 h-10 -rotate-12"/>

    <img src="~/assets/lemonadepixel_kidschores-83.png" alt="Icone 2"
         class="absolute top-[-20px] right-[-15px] w-12 h-10 rotate-12"/>

    <img src="~/assets/lemonadepixel_kidschores-84.png" alt="Icone 3"
         class="absolute bottom-[-10px] right-[-25px] w-12 h-10 rotate-12"/>

    <img src="~/assets/lemonadepixel_kidschores-89.png" alt="Icone 4"
         class="absolute bottom-[-10px] left-[-25px] w-12 h-10 -rotate-12"/>

    <h2 class="text-2xl font-bold mb-8 text-gray-900">Cadastro de Pet</h2>

    <ol class="items-center w-full space-y-4 sm:flex sm:space-x-8 sm:space-y-0 rtl:space-x-reverse mb-6">
      <li :class="step === 1 ? 'text-blue-600 dark:text-blue-500': 'text-gray-500 dark:text-gray-400'"
          class="flex items-center space-x-2.5 rtl:space-x-reverse">
        <span
            :class="step === 1 ? 'border-blue-600 dark:border-blue-500': 'border-gray-500 dark:border-gray-400'"
            class="flex items-center justify-center w-8 h-8 border rounded-full shrink-0 ">
            1
        </span>
        <span>
            <h3 :class="step === 1 ? 'font-bold': 'font-medium'" class="leading-tight">Dados pessoais</h3>
            <p class="text-sm">Informações pessoais</p>
        </span>
      </li>
      <li :class="step === 2 ? 'text-blue-600 dark:text-blue-500': 'text-gray-500 dark:text-gray-400'"
          class="flex items-center space-x-2.5 rtl:space-x-reverse">
        <span
            :class="step === 2 ? 'border-blue-600 dark:border-blue-500': 'border-gray-500 dark:border-gray-400'"
            class="flex items-center justify-center w-8 h-8 border rounded-full shrink-0 ">
            2
        </span>
        <span>
            <h3 :class="step === 2 ? 'font-bold': 'font-medium'" class="leading-tight">Endereço</h3>
            <p class="text-sm">Informações de endereço</p>
        </span>
      </li>
      <li :class="step === 3 ? 'text-blue-600 dark:text-blue-500': 'text-gray-500 dark:text-gray-400'"
          class="flex items-center  space-x-2.5 rtl:space-x-reverse">
        <span
            :class="step === 3 ? 'border-blue-600 dark:border-blue-500': 'border-gray-500 dark:border-gray-400'"
            class="flex items-center justify-center w-8 h-8 border rounded-full shrink-0 ">
            3
        </span>
        <span>
            <h3 :class="step === 3 ? 'font-bold': 'font-medium'" class="leading-tight">Dados do pet</h3>
            <p class="text-sm">Dados do seu animalzinho</p>
        </span>
      </li>
    </ol>

    <form class="space-y-6">

      <div v-if="step === 1">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label for="fullName" class="block text-sm font-medium text-gray-700">Nome completo</label>
            <input
                type="text"
                id="fullName"
                v-model="form.fullName"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

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

          <div>
            <label for="cpf" class="block text-sm font-medium text-gray-700">CPF</label>
            <input
                type="text"
                id="cpf"
                v-maska:unmaskedCpf.unmasked="'###.###.###-##'"
                v-model="maskedCpf"
                @update:model-value="(value) => validateCPF(value)"
                maxlength="14"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"

            />

          </div>

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
        </div>
        <div class="flex justify-end mt-6">

          <button
              @click="step++"
              class="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Avançar
          </button>
        </div>
      </div>
      <div v-if="step === 2">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label for="cep" class="block text-sm font-medium text-gray-700">CEP</label>
            <input
                type="text"
                id="cep"
                @change="searchCEP"
                maxlength="9"
                v-maska:zipcode.unmasked="'#####-###'"
                v-model="zipcodeFormatted"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>


          <div>
            <label for="street" class="block text-sm font-medium text-gray-700">Rua</label>
            <input
                type="text"
                id="street"
                v-model="form.street"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"

            />

          </div>


          <div>
            <label for="neighborhood" class="block text-sm font-medium text-gray-700">Bairro</label>
            <input
                type="text"
                id="neighborhood"
                v-model="form.neighborhood"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"

            />

          </div>


          <div>
            <label for="city" class="block text-sm font-medium text-gray-700">Cidade</label>
            <input
                type="text"
                id="city"
                v-model="form.city"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"

            />

          </div>


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
        <div class="flex justify-between mt-6">
          <button
              @click="step--"
              class="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Voltar
          </button>
          <button
              @click="step++"
              class="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Avançar
          </button>
        </div>
      </div>
      <div v-if="step === 3">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
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


          <div v-if="form.petBreed === 'outro'">
            <label for="customBreed" class="block text-sm font-medium text-gray-700">Nome da raça</label>
            <input
                type="text"
                id="customBreed"
                v-model="form.customBreed"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"

            />

          </div>
        </div>
        <div class="flex justify-between mt-6">
          <button
              @click="step--"
              class="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Voltar
          </button>
          <button
              @click.prevent="openModal"
              class="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm
          font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500
          focus:ring-offset-2"
          >
            Cadastrar
          </button>
        </div>
      </div>

    </form>
    <TransitionRoot appear :show="isOpen" as="template">
      <Dialog as="div" @close="closeModal" class="relative z-10">
        <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black/25"/>
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div
              class="flex min-h-full items-center justify-center p-4 text-center"
          >
            <TransitionChild
                as="template"
                enter="duration-300 ease-out"
                enter-from="opacity-0 scale-95"
                enter-to="opacity-100 scale-100"
                leave="duration-200 ease-in"
                leave-from="opacity-100 scale-100"
                leave-to="opacity-0 scale-95"
            >
              <DialogPanel
                  class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
              >
                <DialogTitle
                    as="h3"
                    class="text-lg font-medium leading-6 text-gray-900"
                >
                  Confira os dados preenchidos:
                </DialogTitle>
                <div class="mt-2">
                  <div>
                    <p><strong>Nome Completo:</strong> {{ form.fullName }}</p>
                    <p><strong>CPF:</strong> {{ form.cpf }}</p>
                    <p><strong>Data de Nascimento:</strong> {{ form.birthDate }}</p>
                    <p><strong>CEP:</strong> {{ form.cep }}</p>
                    <p><strong>Cidade:</strong> {{ form.city }}</p>
                    <p><strong>Estado:</strong> {{ form.state }}</p>
                    <p><strong>Rua:</strong> {{ form.street }}</p>
                    <p><strong>Bairro:</strong> {{ form.neighborhood }}</p>
                    <p><strong>Renda Mensal:</strong> R$ {{ form.monthlyIncome }}</p>
                    <p><strong>Tipo de Pet:</strong> {{ form.petType }}</p>
                    <p><strong>Raça do Pet:</strong> {{ form.petBreed }}</p>
                    <p v-if="form.petBreed === 'outro'"><strong>Raça Personalizada:</strong> {{ form.customBreed }}</p>
                  </div>
                </div>

                <div class="mt-4">
                  <button
                      type="button"
                      class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      @click="handleSubmit"
                  >
                    Got it, thanks!
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>

</template>
<style lang="scss">
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>