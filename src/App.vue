<script setup>
import { onBeforeMount, ref } from 'vue'
import { EVERNODE_HOST } from './constants';
import { formatTimestamp, getHashPrefix } from './helpers'
import AppHeader from './components/AppHeader.vue'
import LedgerInfoModal from './components/LedgerInfoModal.vue'

const connectionStatus = ref('disconnected')
const ledgers = ref([])
const carousel = ref(null)
const modal = ref(null)

onBeforeMount(() => {
  ;[
    'https://cdn.jsdelivr.net/npm/hotpocket-js-client@0.5.5/browser.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/libsodium-wrappers/0.5.4/sodium.min.js'
  ].forEach((src) => {
    const script = document.createElement('script')
    script.src = src
    document.head.appendChild(script)
  })
  window.onload = () => {
    establishHotPocketConnection()
  }
})

const establishHotPocketConnection = async () => {
  const userKeyPair = await window.HotPocket.generateKeys()
  window.hpc = await window.HotPocket.createClient([`wss://${EVERNODE_HOST}`], userKeyPair)
  if (!(await window.hpc.connect())) {
    console.log('Connection failed.')
    connectionStatus.value = 'error'
    return
  }
  connectionStatus.value = 'connected'
  console.log('HotPocket Connected.')
  await window.hpc.subscribe(window.HotPocket.notificationChannels.ledgerEvent)
  window.hpc.on(window.HotPocket.events.ledgerEvent, (result) => {
    if (result.event === 'ledger_created') {
      addLedger(result.ledger)
    }
  })
  window.hpc.on(window.HotPocket.events.disconnect, () => {
    connectionStatus.value = 'disconnected'
    console.log('Disconnected')
  })
}

const getLedger = async (seqNo) => {
  const ledgerBySeqNo = await window.hpc.getLedgerBySeqNo(seqNo)
  modal.value.showModal(ledgerBySeqNo)
}

const ledgerSearchLookup = ($event) => {
  const seqNo = $event.target.value
  $event.target.value = ''
  getLedger(+seqNo)
}

const addLedger = (ledger) => {
  if (ledgers.value.length >= 25) {
    ledgers.value.splice(25)
  }
  ledgers.value.unshift(ledger)
  scrollCarousel()
}

const scrollCarousel = () => {
  carousel.value.scrollLeft = 0
}
</script>

<template>
  <AppHeader :connection-status="connectionStatus" />
  <main>
    <input
      class="ledger-search"
      @keyup.enter="ledgerSearchLookup"
      placeholder="Search ledger seqNo..."
    />
    <div id="carousel" ref="carousel">
      <div
        class="ledger"
        v-for="(ledger, index) in ledgers"
        :key="index"
        ref="ledgerRefs"
        @click="getLedger(ledger.seqNo)"
      >
        <div class="ledger-inner-container">
          <div class="ledger-seqNo">{{ ledger.seqNo }}</div>
          <div class="ledger-timestamp">{{ formatTimestamp(ledger.timestamp) }}</div>
        </div>
        <div class="ledger-inner-container-footer">
          <div class="ledger-hash">{{ getHashPrefix(ledger.hash).toUpperCase() }}</div>
          <div class="ledger-verified-checkmark">✔</div>
        </div>
      </div>
    </div>
  </main>
  <LedgerInfoModal ref="modal" />
</template>
