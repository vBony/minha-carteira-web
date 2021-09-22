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
        <form class="needs-validation" id="form-register" novalidate @submit.prevent="sendData()">
            <div class="row g-2">
                <div class="form-floating mb-2 col-lg-6 col-md-6">
                    <input type="text" class="form-control" v-bind:class="{'is-invalid': usuario_error.usu_nome}" v-model="usuario.usu_nome" @change.self="clearErrors($event)" id="nome" name="usu_nome" placeholder="Nome" required>
                    <label for="floatingInput">Nome</label>
                    <div class="invalid-feedback text-danger" id="msg_usu_nome">{{usuario_error.usu_nome}}</div>
                </div>
                <div class="form-floating mb-3 col-lg-6 col-md-6">
                    <input type="text" class="form-control" v-bind:class="{'is-invalid': usuario_error.usu_sobrenome}" v-model="usuario.usu_sobrenome" @change.self="clearErrors($event)" id="sobrenome" name="usu_sobrenome" placeholder="Sobrenome">
                    <label for="floatingPassword">Sobrenome (opcional)</label>
                    <div class="invalid-feedback text-danger" id="msg_usu_sobrenome">{{usuario_error.usu_sobrenome}}</div>
                </div>
            </div>

            <div class="row g-2">
                <div class="form-floating mb-3 col-lg-12">
                    <input type="email" class="form-control" v-bind:class="{'is-invalid': usuario_error.usu_email}" v-model="usuario.usu_email" @change.self="clearErrors($event)" id="email" name="usu_email" placeholder="E-mail" required>
                    <label for="floatingInput">E-mail</label>
                    <div class="invalid-feedback text-danger" id="msg_usu_email">{{usuario_error.usu_email}}</div>
                </div>
            </div>

            <div class="row g-2">
                <div class="form-floating mb-3 col-lg-12">
                    <input type="text" class="form-control" v-bind:class="{'is-invalid': usuario_error.usu_profissao}" v-model="usuario.usu_profissao" @change.self="clearErrors($event)" name="usu_profissao" id="profissão" placeholder="E-mail">
                    <label for="floatingInput">Profissão (opcional)</label>
                    <div class="invalid-feedback text-danger" id="msg_usu_profissao">{{usuario_error.usu_profissao}}</div>
                </div>
            </div>

            <div class="row g-2">
                <div class="form-floating col-12">
                    <input type="password" class="form-control" v-bind:class="{'is-invalid': usuario_error.usu_senha}" v-model="usuario.usu_senha" @change.self="clearErrors($event)" id="senha" name="usu_senha" placeholder="Senha" required>
                    <label for="floatingInput">Senha</label>
                    <div class="invalid-feedback text-danger" id="msg_usu_senha">{{usuario_error.usu_senha}}</div>
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