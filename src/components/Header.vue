<template>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
        <router-link to="/" class="navbar-brand">
            <div class="fs-4 bg-success text-white px-2 py-1 rounded-circle"> <i class="fas fa-money-bill-wave-alt text-white"></i></div>
        </router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <router-link to="/" class="nav-link active" aria-current="page">Dashboard</router-link>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Sobre</a>
                </li>
            </ul>

            <ul class="navbar-nav">
                <li class="nav-item ml-auto">
                    <div class="dropdown">
                        <a class="dropdown-toggle nav-link" href="#" id="user_config" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {{username}}
                        </a>
                        <ul class="dropdown-menu dropdown-menu-lg-end" aria-labelledby="user_config">
                            <li><a class="dropdown-item" href="#">Configurações</a></li>
                            <li><a class="dropdown-item" href="#">Sair</a></li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</nav>
</template>

<!-- <style src="@/assets/css/login.css" scoped>
</style> -->

<!-- Importação do model -->
<script lang="ts">
  import Header from "@/components/models/Header"
  export default Header
</script>