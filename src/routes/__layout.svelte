<script lang="ts">
  import '../app.css'
  import Navbar from '$lib/Navbar.svelte'
  import { browser } from '$app/env'
  import { onMount } from 'svelte'

  onMount(async () => {
    if (browser) {
      await import('tw-elements')
    }
  })
</script>

<div class="h-screen w-screen grid">
  <Navbar />
  <main>
    <slot />
  </main>
</div>

<style>
  div {
    grid-template-rows: auto 1fr;
  }
</style>
