<script setup>
import { ref } from 'vue';
import { EVERNODE_HOST } from '../constants';

defineProps({
  connectionStatus: {
    type: String,
    required: false,
    default: 'disconnected'
  }
})

const evernodeHost = ref(EVERNODE_HOST);
</script>

<template>
  <div class="app-header">
    <div class="connection-status-indicator">
      <div :class="`${connectionStatus}-status`"></div>
      <span class="host-address">Evernode host</span>: {{ evernodeHost }}
    </div>
    <header>
      <img
        width="180"
        src="https://dashboard.evernode.org/static/media/logo-white.89a777b952c50714e2f6.png"
      />
      <span>dApp Ledger Explorer</span>
    </header>
  </div>
</template>
