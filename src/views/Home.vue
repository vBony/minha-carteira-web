<template>
<Header :username="user.usu_nome" />
<div class="container-fluid py-3">
    <div class="row">
        <div class="col-lg-3 col-md-6 col-sm-12 mb-md-3 mb-sm-3 mb-3">
            <div class="card border border-primary">
                <div class="card-body">
                    <h5 class="card-title">Saldo Atual</h5>
                    <h6 class="card-subtitle mb-2">R$ 1.625,00</h6>
                </div>
            </div>
        </div>

        <div class="col-lg-3 col-md-6 col-sm-12 mb-md-3 mb-sm-3 mb-3">
            <div class="card border border-success">
                <div class="card-body">
                    <h5 class="card-title">Receitas</h5>
                    <h6 class="card-subtitle mb-2">R$ {{resumo.receitas}}</h6>
                </div>
            </div>
        </div>

        <div class="col-lg-3 col-md-6 col-sm-12 mb-sm-3 mb-3">
            <div class="card border border-danger">
                <div class="card-body">
                    <h5 class="card-title">Despesas</h5>
                    <h6 class="card-subtitle mb-2">R$ {{resumo.despesas}}</h6>
                </div>
            </div>
        </div>

        <div class="col-lg-3 col-md-6 col-sm-12 mb-sm-3 mb-3">
            <div class="card border border-info">
                <div class="card-body">
                    <h5 class="card-title">Balanço mensal</h5>
                    <h6 class="card-subtitle mb-2">R$ {{resumo.saldo_mensal}}</h6>
                </div>
            </div>
        </div>
    </div>

    <div class="row container-md m-auto p-0">
        <div class="card">
            <div class="row d-flex justify-content-center flex-row my-3">
                <div data-mesano="<?= $ant_mesano ?>" id="antMes" class="col-lg-1 col-md-1 col-sm-1 col-1 d-flex align-items-center justify-content-end selectMesAno" style="cursor:pointer"><i class="fas fa-chevron-left"></i></div>
                <div class="col-lg-3 col-md-6 col-sm-6 col-6">
                    <input type="text" class="form-control text-center" id="datePicker" placeholder="mês/ano" v-model="mesanos.mes_ano">
                </div>
                <div data-mesano="<?= $prox_mesano ?>" id="proxMes" class="col-lg-1 col-md-1 col-sm-1 col-1 d-flex align-items-center selectMesano" style="cursor:pointer"><i class="fas fa-chevron-right"></i></div>
            </div>

            <div class="row my-3">
                <div class="col-6">
                    <h4>Transações</h4>
                </div>
                <div class="col-6 d-flex justify-content-end">
                    <div class="dropdown">
                        <button class="btn btn-primary dropdown-toggle text-white" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="fas fa-plus text-white"></i> Novo
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
                            <li><button class="dropdown-item" id="btn-modal-transacao" @click="editarTransacao(2, false)" data-bs-toggle="modal" data-bs-target="#modalTransacao" type="button">Receita <i class="fas fa-arrow-up text-success"></i></button></li>
                            <li><button class="dropdown-item" type="button" @click="editarTransacao(1, false)" data-bs-toggle="modal" data-bs-target="#modalTransacao">Despesa <i class="fas fa-arrow-down text-danger"></i></button></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div id="table-dad" @scroll="scrollHandleTransacoes($event)">
                <table class="table" id="table-list">
                    <thead id="theadTransacoes" class="bg-white">
                        <tr id="trTransacoes">
                            <th scope="col">Situação</th>
                            <th scope="col">Data</th>
                            <th scope="col">Descricao</th>
                            <th scope="col">Categoria</th>
                            <th scope="col">Valor</th>
                            <th scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody id="transacoes-area">
                        <tr v-for="(transacao, index) in transacoes" :key="index">
                            <th>
                                <div v-if=" transacao.tra_situacao == '1' " title="Efetuada"><i class="fas fa-check-circle text-success"></i></div>
                                <div v-if=" transacao.tra_situacao == '0' " title="Pendente"><i class="fas fa-exclamation-circle text-danger"></i></div>
                            </th>
                            <td>{{transacao.tra_data}}</td>
                            <td>{{transacao.tra_descricao}}</td>
                            <td>{{transacao.cat_descricao}}</td>
                            <td v-bind:class="{'text-danger': transacao.tra_tipo == 1, 'text-success': transacao.tra_tipo == 2}">R$ {{transacao.tra_valor}}</td>
                            <td>
                                <div class="d-flex flex-row">
                                    <div class="me-2" v-if="transacao.tra_situacao == '0' "><i class="fas fa-check-circle text-secondary fcc"></i></div>
                                    <div class="me-2"><i class="fas fa-pencil-alt text-secondary fpa"></i></div>
                                    <div class="me-2"><i class="fas fa-trash-alt text-secondary fta"></i></div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="modalTransacao" tabindex="-1" aria-labelledby="modalTransacaoLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 v-if="tipoModalTransacao == 1" class="modal-title text-danger" id="modalTransacaoLabel">Nova Despesa</h5>
                <h5 v-if="tipoModalTransacao == 2" class="modal-title text-success" id="modalTransacaoLabel">Nova receita</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="btn-close-transacao-modal"></button>
            </div>
            <div class="modal-body">
                <div class="row ">
                    <form id="form-transacao">
                        <div class="input-group lg-12">
                            <span class="input-group-text" id="basic-addon1">R$</span>
                            <input name="tra_valor" v-bind:class="{'is-invalid': transacao_error.tra_valor}" @change.self="clearErrors($event); setValor()" type="text" class="form-control money-input" placeholder="Valor" id="valor_transacao" aria-label="Valor" aria-describedby="basic-addon1">
                            <div class="invalid-feedback text-danger" id="msg_tra_valor">{{transacao_error.tra_valor}}</div>
                        </div>
            
                        <div class="col-12 mt-3">
                            <div class="form-check">
                                <label class="form-check-label" for="gridCheck">
                                    <input class="form-check-input" v-model="transacao.tra_situacao" type="checkbox" id="gridCheck" name="tra_situacao">
                                    {{tipoModalTransacao == 1 ? 'Já foi paga' : 'Já recebi'}}
                                </label>
                            </div>
                        </div>
            
                        <div class="mt-3">
                            <label for="descricao" class="form-label">Descrição</label>
                            <input name="tra_descricao" v-bind:class="{'is-invalid': transacao_error.tra_descricao}" v-model="transacao.tra_descricao" @change.self="clearErrors($event)" type="text" class="form-control" id="descricao">
                            <div class="invalid-feedback text-danger" id="msg_tra_descricao">{{transacao_error.tra_descricao}}</div>
                        </div>
            
                        <div class="mt-3">
                            <label for="data_recebimento" class="form-label">Data de recebimento</label>
                            <input name="tra_data" v-bind:class="{'is-invalid': transacao_error.tra_data}" v-model="transacao.tra_data" @change.self="clearErrors($event)" type="date" class="form-control" id="data_recebimento">
                            <div class="invalid-feedback text-danger" id="msg_tra_data"></div>
                        </div>
            
                        <div class="mb-3 lg-12 mt-3">
                            <label for="tags" class="form-label">Categoria</label>
                            <select name="tra_categoria" class="form-select" id="tags" v-bind:class="{'is-invalid': transacao_error.tra_categoria}" v-model="transacao.tra_categoria" @change.self="clearErrors($event)">
                                <option value="new">Criar nova categoria</option>
                                <option v-for="(categoria, index) in categorias" :key="index" :value="categoria.cat_id">{{categoria.cat_descricao}}</option>
                            </select>
                            <div class="invalid-feedback text-danger" id="msg_tra_categoria">{{transacao_error.tra_categoria}}</div>
                        </div>

                        <input type="hidden" name="tra_tipo" value="2">
                    </form>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary text-white" data-bs-dismiss="modal">Fechar</button>
                <button v-if="loadingModalTransacao == false" type="button" v-bind:class="{ 'btn-danger': tipoModalTransacao == 1, 'btn-success': tipoModalTransacao == 2 }" class="btn text-white" id="salvar-transacao" @click="salvarTransacao()">Salvar</button>

                <button v-if="loadingModalTransacao == true" class="btn" v-bind:class="{ 'btn-danger': tipoModalTransacao == 1, 'btn-success': tipoModalTransacao == 2 }" type="button" disabled>
                    <span class="spinner-border spinner-border-sm text-white" role="status" aria-hidden="true"></span>
                    <span class="ms-2 text-white">Aguarde...</span>
                </button>
            </div>
        </div>
    </div>
</div>

<div class="loading w-100 h-100" v-if="loading == true">
    <div class="spinner-border fs-6 text-white" style="width: 5rem; height: 5rem;" role="status">
        <span class="sr-only">Loading...</span>
    </div>
</div>

<div v-bind:class="[toast.bg_color, toast.show]" class="toast fade align-items-center position-fixed top-0 end-0 p-2 mt-3 me-3" id="toast" style="z-index: 1061" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="d-flex">
        <div v-bind:class="toast.font_color" class="toast-body fs-6">
            {{toast.msg}}
        </div>
        <i v-bind:class="[toast.icon, toast.font_color]" class="fas me-2 m-auto fs-6"></i>
    </div>
</div>

</template>

<style src="@/assets/css/home.css" scoped>
</style>


<!-- Importação do model -->
<script lang="ts">
  import Home from "@/models/Home"
  export default Home
</script>