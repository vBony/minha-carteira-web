<template>
    <div class="container-fluid h-100 d-flex align-items-center justify-content-center app" style="background-color:#F0F4FF" id="app">
        <div class="login-box card p-3">
            <div class="row">
                <div class="d-flex direction-row align-center mb-4">
                    <div class="fs-4 bg-success text-white px-4 rounded-pill"> <i class="fas fa-money-bill-wave-alt text-white"></i> minha carteira</div>
                </div>
            </div>

            <div class="row mb-3">
                <h3>Login</h3>
            </div>
            <form class="needs-validation" id="form-login" novalidate @submit.prevent="sendData()">
                <div class="row g-2">
                    <div class="form-floating mb-3 col-lg-12">
                        <input type="email" v-bind:class="{'is-invalid': errors.usu_email}" v-model="Usuario.usu_email" class="form-control" id="email" name="usu_email" placeholder="E-mail" required>
                        <label for="floatingInput">E-mail</label>
                        <div class="invalid-feedback text-danger" id="msg_usu_email">{{errors.usu_email}}</div>
                    </div>
                </div>

                <div class="row g-2">
                    <div class="form-floating mb-2 col-lg-12">
                        <input type="password" v-bind:class="{'is-invalid': errors.usu_senha}" v-model="Usuario.usu_senha" class="form-control" id="senha" name="usu_senha" placeholder="Senha" required>
                        <label for="floatingInput">Senha</label>
                        <div class="invalid-feedback text-danger" id="msg_usu_senha">{{errors.usu_senha}}</div>
                    </div>
                </div>

                <div class="row g-2 mt-2">
                    <input type="submit" class="btn btn-success btn-lg text-white" value="Entrar">
                </div>

                <div class="row g-2 mt-4">
                    <div class="col-6">
                        <a href="" class="text-success">Não possuo uma conta</a>
                    </div>

                    <div class="col-6 text-end">
                        <a href="" class="text-success ">Esqueci minha senha</a>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<style src="@/assets/css/login.css" scoped>
</style>

<!-- Importação do model -->
<script lang="ts">
  import Login from "@/models/Login"
  export default Login
</script>