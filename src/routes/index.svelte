<script lang="ts">
  import { LayerCake, Svg } from 'layercake'
  import TypeTree from '$lib/TypeTree.svelte'

  export let data
</script>

<div id="tooltip" class="grid mx-32 h-1/6 justify-start align-bottom">
  <!-- TODO -->
</div>

<div class="grid mx-32 h-5/6">
  <LayerCake {data}>
    <Svg>
      <TypeTree />
    </Svg>
  </LayerCake>
</div>
