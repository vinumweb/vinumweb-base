<script lang="ts" setup>
const appConfig = useAppConfig()
const copyrightModalOpen = ref(false)

const props = defineProps(['label'])
</script>
<template>
  <div>
    <div class="flex justify-center"><UButton color="gray" variant="ghost" icon="i-tabler-copyright" @click="copyrightModalOpen = true">{{ new Date().getFullYear() }} {{ props.label }}</UButton></div>
    <UModal v-model="copyrightModalOpen">
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              Ophavsret på {{ appConfig.title }}
            </h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="copyrightModalOpen = false" />
          </div>
        </template>

        <p>© {{ new Date().getFullYear() }} VinumWeb. Alle rettigheder forbeholdes.</p><br>
    
        <p>Hjemmesiden er udviklet af VinumWeb. Ophavsretten til tekst, billeder, grafik, lyd, animationer og andre materialer på denne hjemmeside ejes af VinumWeb eller er blevet brugt med tilladelse fra de respektive rettighedshavere.</p><br>
        
        <p>Enhver form for kopiering, reproduktion, distribution eller anden brug af indholdet på denne hjemmeside uden skriftlig tilladelse fra VinumWeb er strengt forbudt.</p><br>
        
        <p>For mere information, kontakt venligst:<br>
        VinumWeb<br>
        Plantagevej 6a, 6270 Tønder<br>
        kontakt@vinumweb.com<br>
        +45 42 34 26 40</p>

      </UCard>
  </UModal>
  </div>
</template>