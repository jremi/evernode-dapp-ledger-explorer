<script setup>
import { ref } from 'vue';

const ledger = ref({});
const dialog = ref(null);

const showModal = (ledgerBySeqNo) => {
  ledger.value = ledgerBySeqNo;
  dialog.value.showModal();
}

const closeModal = () => {
  ledger.value = {};
  dialog.value.close();
}

defineExpose({ showModal });
</script>

<template>
  <dialog ref="dialog">
    <pre>{{ ledger }}</pre>
    <div class="dialog-footer">
      <button @click="closeModal">OK</button>
    </div>
  </dialog>
</template>
