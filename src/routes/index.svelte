<script lang="ts">
  import { LayerCake, Svg } from 'layercake'
  import TypeTree from '$lib/TypeTree.svelte'

  export let data
</script>

<div class="grid mx-32 mt-32 h-5/6">
  <LayerCake {data}>
    <Svg>
      <TypeTree />
    </Svg>
  </LayerCake>
</div>
