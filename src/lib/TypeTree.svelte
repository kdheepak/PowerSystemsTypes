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

  const circleMouseOver = function () {
    d3.select(this).attr('r', 10)
  }
  const circleMouseOut = function () {
    d3.select(this).attr('r', 7.5)
  }
  const circleClick = function (d) {
    console.log(d.data.name)
  }
</script>

<g class="nodes">
  {#each root.descendants() as node}
    <circle
      class="node"
      transform="translate({node.y}, {node.x})"
      r="7.5"
      on:mouseover={circleMouseOver}
      on:mousemove={circleMouseOver}
      on:focus={() => {}}
      on:mouseout={circleMouseOut}
      on:blur={() => {}}
      on:click={() => circleClick(node)}
    />
  {/each}
</g>
<g class="links">
  {#each root.links() as link}
    <line
      x1={link.source.y}
      y1={link.source.x}
      x2={link.target.y}
      y2={link.target.x}
      stroke="black"
      stroke-opacity="0.25"
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
