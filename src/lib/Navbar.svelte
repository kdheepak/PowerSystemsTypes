<script lang="ts">
  import Icon from 'svelte-awesome'
  import { faGithub } from '@fortawesome/free-brands-svg-icons'
  import { base } from '$app/paths'
</script>

<nav
  class="relative w-full flex flex-wrap items-center justify-between py-3 bg-gray-900 text-gray-200 shadow-lg navbar navbar-expand-lg navbar-light"
>
  <div class="container-fluid w-full flex flex-wrap items-center justify-between px-6">
    <div class="collapse navbar-collapse flex-grow items-center" id="navbarSupportedContent1">
      <a class="text-xl text-white pr-2 font-semibold" href="{base}/">PowerSystems.jl Types</a>
      <!-- Left links -->
      <ul class="navbar-nav flex flex-col pl-0 list-style-none mr-auto">
        <li class="nav-item p-2">
          <a class="nav-link text-white" href="{base}/">Dashboard</a>
        </li>
      </ul>
      <!-- Left links -->
    </div>
    <!-- Collapsible wrapper -->

    <!-- Right elements -->
    <div class="flex items-center relative">
      <a href="https://github.com/NREL-SIIP"><Icon data={faGithub} /></a>
    </div>
    <!-- Right elements -->
  </div>
</nav>
