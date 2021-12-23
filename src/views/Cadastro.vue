<template>
<div class="container-fluid h-100 d-flex align-items-center justify-content-center" id="app" style="background-color:#F0F4FF">
    <div class="register-box card p-3">
        <div class="row">
            <div class="d-flex direction-row align-center mb-4">
                <div class="fs-4 bg-success text-white px-4 rounded-pill"> <i class="fas fa-money-bill-wave-alt text-white"></i> minha carteira</div>
            </div>
        </div>

        <div class="row mb-3">
            <h3>Cadastro</h3>
        </div>
        <form id="form-register" @submit.prevent="sendData()">
            <div class="row g-2">
                <div class="form-floating mb-2 col-lg-6 col-md-6">
                    <input type="text" class="form-control" v-bind:class="{'is-invalid': errors.name}" @change.self="clearErrors($event)" v-model="usuario.name" id="nome" name="name" placeholder="Nome" >
                    <label for="floatingInput">Nome</label>
                    <div class="invalid-feedback text-danger" id="msg_name">{{errors.name}}</div>
                </div>
                <div class="form-floating mb-3 col-lg-6 col-md-6">
                    <input type="text" class="form-control" v-bind:class="{'is-invalid': errors.lastName}" v-model="usuario.lastName" @change.self="clearErrors($event)" id="sobrenome" name="lastName" placeholder="Sobrenome">
                    <label for="floatingPassword">Sobrenome (opcional)</label>
                    <div class="invalid-feedback text-danger" id="msg_lastName">{{errors.lastName}}</div>
                </div>
            </div>

            <div class="row g-2">
                <div class="form-floating mb-3 col-lg-12">
                    <input type="email" class="form-control" v-bind:class="{'is-invalid': errors.email}" v-model="usuario.email" @change.self="clearErrors($event)" id="email" name="email" placeholder="E-mail" >
                    <label for="floatingInput">E-mail</label>
                    <div class="invalid-feedback text-danger" id="msg_email">{{errors.email}}</div>
                </div>
            </div>

            <div class="row g-2">
                <div class="form-floating mb-3 col-lg-12">
                    <input type="text" class="form-control" v-bind:class="{'is-invalid': errors.job}" v-model="usuario.job" @change.self="clearErrors($event)" name="job" id="profissão" placeholder="E-mail">
                    <label for="floatingInput">Profissão (opcional)</label>
                    <div class="invalid-feedback text-danger" id="msg_job">{{errors.job}}</div>
                </div>
            </div>

            <div class="row g-2">
                <div class="form-floating col-12">
                    <input type="password" class="form-control" v-bind:class="{'is-invalid': errors.password}" v-model="usuario.password" @change.self="clearErrors($event)" id="senha" name="password" placeholder="Senha" >
                    <label for="floatingInput">Senha</label>
                    <div class="invalid-feedback text-danger" id="msg_password">{{errors.password}}</div>
                </div>
            </div>

            <div class="row g-2 mt-2">
                <input type="submit" class="btn btn-success btn-lg text-white" value="Criar conta">
            </div>

            <div class="row g-2 mt-4">
                <div class="col-lg-6 col-md-6 col-sm-6">
                    <router-link to="/login" class="text-success">Já possuo uma conta</router-link>
                </div>
            </div>
        </form>
    </div>
</div>

<div class="loading w-100 h-100" v-if="loading == true">
    <div class="spinner-border fs-6 text-white" style="width: 5rem; height: 5rem;" role="status">
        <span class="sr-only">Loading...</span>
    </div>
</div>
</template>

<style src="@/assets/css/cadastro.css" scoped>
</style>

<!-- Importação do model -->
<script lang="ts">
    import Cadastro from "@/models/Cadastro"
    export default Cadastro
</script>