<script setup lang="ts">
const toast = useToast()
const appConfig = useAppConfig()
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'
const isTermsModalOpen = ref(false)
const btnLoading = ref(false)
const btnDisabled = ref(false)

const schema = object({
  name: string().required('Udfyld venligst dette felt'),
  email: string().email('Skriv venligst en gyldig e-mail').required('Udfyld venligst dette felt'),
  phone: string(),
  subject: string().required('Udfyld venligst dette felt'),
  message: string().required('Udfyld venligst dette felt'),
  consent: string().required('Påkrævet').test('is-true', "Påkrævet", (value) => value != 'false' ),
  turnstileToken: string().required('Bekræft venligst at du ikke er en robot'),
})

type Schema = InferType<typeof schema>

const state = reactive({
  name: undefined,
  email: undefined,
  phone: undefined,
  subject: undefined,
  message: undefined,
  consent: undefined,
  turnstileToken: undefined,
})

async function onSubmit (event: FormSubmitEvent<Schema>) {
  btnLoading.value = true
  const formData = event.data
  try { 
    const data = await $fetch('/api/contactFormSubmit', {
      method: 'POST',
      body: { name: formData.name, email: formData.email, phone: formData.phone, subject: formData.subject, message: formData.message, turnstileToken: formData.turnstileToken }
    })
    
    if (data.success == true) {
      toast.add({ title: 'Success!', description: 'Din besked er sendt afsted!', color: 'green', icon: 'i-tabler-mail', timeout: 10000 })
    } else {
      console.log(data)
      toast.add({ title: 'Kunne ikke verificere', description: 'Vi kunne ikke verificere at du ikke er en robot. Prøv igen eller meld fejlen til VinumWeb.', color: 'red', icon: 'i-tabler-alert-triangle', timeout: 10000 })
    }

  } catch(error) {
    console.log(error)
    toast.add({ title: 'Der skete en fejl!', description: 'Fejlen er logget i konsollen. Prøv igen eller meld fejlen til VinumWeb.', color: 'red', icon: 'i-tabler-alert-triangle', timeout: 10000 })
  }
  btnLoading.value = false
  btnDisabled.value = true
}
</script>

<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit" novalidate >
    <UFormGroup label="Fulde navn" name="name" required>
      <UInput v-model="state.name" />
    </UFormGroup>

    <div class="grid md:grid-cols-2 gap-4">
      <UFormGroup label="E-mail" name="email" required>
        <UInput v-model="state.email" type="email" />
      </UFormGroup>
      <UFormGroup label="Telefon nr." name="phone" hint="Valgfrit">
        <UInput v-model="state.phone" type="tel" />
      </UFormGroup>
    </div>

    <UFormGroup label="Emne" name="subject" required>
      <UInput v-model="state.subject" />
    </UFormGroup>

    <UFormGroup label="Besked" name="message" required>
      <UTextarea v-model="state.message" />
    </UFormGroup>

    <UFormGroup name="consent" required >
      <UCheckbox v-model="state.consent"><template #label>Jeg har læst og accepterer {{ appConfig.title}}'s <NuxtLink @click="isTermsModalOpen = true" class="cursor-pointer text-sky-500">privatlivspolitik</NuxtLink></template></UCheckbox>
    </UFormGroup>

    <UFormGroup name="turnstileToken">
      <NuxtTurnstile v-model="state.turnstileToken" />
    </UFormGroup>

    <UButton type="submit" icon="i-tabler-send" :loading="btnLoading" :disabled="btnDisabled">
      Send
    </UButton>
  </UForm>

  <UModal v-model="isTermsModalOpen">
    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              Privatlivspolitik
            </h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isTermsModalOpen = false" />
          </div>
        </template>

        <p class="italic">Sidst opdateret: 14-05-2024</p><br>

        <p class="font-bold">1. Introduktion</p>
        <p>Denne privatlivspolitik forklarer, hvordan {{ appConfig.title }} ("vi", "os", "vores") indsamler, bruger og beskytter dine personoplysninger, når du bruger vores kontakformular.</p><br>

        <p class="font-bold">2. Hvilke oplysninger indsamler vi?</p>
        <p>Når du udfylder vores kontakformular, indsamler vi følgende oplysninger:</p>

        <li>Fulde navn</li>
        <li>Emailadresse</li>
        <li>Emne</li>
        <li>Besked</li><br>

        <p class="font-bold">3. Formål med databehandling</p>
        <p>Vi bruger de indsamlede oplysninger til følgende formål:</p>

        <p>At besvare dine forespørgsler og give den ønskede service.</p>
        <p>At kommunikere med dig om dit spørgsmål eller din besked.</p><br>

        <p class="font-bold">4. Behandling af oplysninger</p>
        <p>De oplysninger, du indtaster i vores kontakformular, sendes direkte som en simpel e-mail til ejeren af hjemmesiden. Oplysningerne gemmes ikke i nogen database eller på nogen anden måde.</p><br>

        <p class="font-bold">5. Samtykke</p>
        <p>Ved at indsende vores kontakformular giver du samtykke til, at vi må behandle dine personoplysninger i overensstemmelse med denne privatlivspolitik.</p><br>

        <p class="font-bold">6. Datasikkerhed</p>
        <p>Selvom vi ikke gemmer dine oplysninger, sørger vi for, at e-mails med dine oplysninger sendes på en sikker måde.</p><br>

        <p class="font-bold">7. Dine rettigheder</p>
        <p>I henhold til GDPR har du følgende rettigheder:</p>

        <li>Retten til at få adgang til dine personoplysninger</li>
        <li>Retten til at få rettet urigtige personoplysninger</li>
        <li>Retten til at få slettet dine personoplysninger ("retten til at blive glemt")</li>
        <li>Retten til at begrænse behandlingen af dine personoplysninger</li>
        <li>Retten til dataportabilitet</li>
        <li>Retten til at gøre indsigelse mod behandlingen af dine personoplysninger</li>
        <li>For at udøve dine rettigheder, bedes du kontakte VinumWeb på kontakt@vinumweb.com.</li><br>

        <p class="font-bold">8. Kontaktoplysninger</p>
        <p>Hvis du har spørgsmål eller bekymringer vedrørende denne privatlivspolitik eller vores databehandling, kan du kontakte VinumWeb på:</p>

        <p>Email: kontakt@vinumweb.com</p>
        <p>Telefon: +45 42 34 26 40</p>
        <p>Adresse: Plantagevej 6A, 6270 Tønder</p><br>

        <p class="font-bold">9. Ændringer til denne privatlivspolitik</p>
        <p>Vi forbeholder os ret til at opdatere denne privatlivspolitik fra tid til anden. Eventuelle ændringer vil blive offentliggjort på denne side med en opdateret dato.</p>
        
      </UCard>
    </UModal>
</template>

