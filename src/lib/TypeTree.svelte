<script lang="ts">
  import { getContext } from 'svelte'
  import * as d3 from 'd3'
  const { data, width, height } = getContext('LayerCake')
  import labeler from '$lib/labeler'

  $: w = $width - 100
  $: h = $height - 100

  function update(data, width, height) {
    const nodes = d3.hierarchy(data)
    const layout = d3.tree().size([width, height])
    layout(nodes)
    return nodes
  }

  $: root = update($data, h, w)
  $: console.log(root.descendants())
  $: _labels = labeler()
    .label(
      root.descendants().map((d) => {
        const x = d.x
        const y = d.y
        return {
          name: d.data.name,
          x,
          y,
          org_x: x,
          org_y: y,
          width: 100.0,
          height: 100.0,
        }
      }),
    )
    .anchor(
      root.descendants().map((d) => {
        return {
          x: d.x,
          y: d.y,
          r: 0,
        }
      }),
    )
    .width($width)
    .height($height)
    .start(1500)

  function get_labels(d, w, h) {
    return _labels.label()
  }

  $: labels = get_labels(root.descendants(), w, h)
  $: console.log(labels)

  const tooltip = d3
    .select('#tooltip')
    .style('opacity', 0)
    .attr('class', 'tooltip')
    .style('background-color', 'white')
    .style('border', 'solid')
    .style('border-width', '2px')
    .style('border-radius', '5px')
    .style('padding', '5px')

  const diagonal = d3
    .linkHorizontal()
    .source((d) => [d.source.y, d.source.x])
    .target((d) => [d.target.y, d.target.x])

  function circleMouseMove(node) {
    console.log(node)
  }
</script>

<g class="links">
  {#each root.links() as d}
    <path d={diagonal(d)} fill="none" stroke="black" stroke-opacity="0.25" />
  {/each}
</g>
<g class="nodes">
  {#each root.descendants() as node}
    <circle
      class="node"
      cx={node.y}
      cy={node.x}
      r="7.5"
      fill={node.children ? 'lightpink' : 'blue'}
      on:mouseover={function () {
        tooltip.style('opacity', 1)
        d3.select(this).attr('r', 10)
      }}
      on:mouseout={function () {
        tooltip.style('opacity', 0)
        d3.select(this).attr('r', 7.5)
      }}
      on:focus={() => {}}
      on:blur={() => {}}
      on:click={() => console.log(node)}
    />
  {/each}
</g>
<g class="labels">
  {#each root.descendants() as node}
    <text
      class="label"
      dy=".35em"
      dx={node.data.children ? '-.75em' : '.75em'}
      transform="translate({node.y}, {node.x})"
      style="text-anchor: {node.data.children ? 'end' : 'start'}"
    >
      {node.data.name}
    </text>
  {/each}
</g>
