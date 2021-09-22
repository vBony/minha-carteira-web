import { Options, Vue } from 'vue-class-component';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import DocumentMixin from '@/mixins/DocumentMixin'
import Header from '@/components/Header.vue';
import $ from 'jquery'
import 'jquery-mask-plugin'
import Transacoes from '@/entities/Transacoes';

// Importando componentes
@Options({
  components: {
    HelloWorld,
    Header
  },
})

class Home extends Vue {
	public dm = new DocumentMixin()
    public loading = false

    public access_token = this.dm.getAccessToken() != null ? this.dm.getAccessToken() : null
    public user = {}
    public mesanos = {
        mes_ano: null,
        prox_mesano: null,
        ant_mesano: null
    }

    public transacao_receita = new Transacoes()
    public transacao_receita_error = new Transacoes()
    
    public transacao_despesa = new Transacoes()
    public transacao_despesa_error = new Transacoes()

    public categorias = {}
    public transacoes = {}


    created(){
        window.document.title = '📊 Dashboard - Minha carteira'
        this.fetchInitialData()
    }

    mounted(){
        this.initSystem()
    }

	public errors = {}

    fetchInitialData(){
        $.ajax({
            type: "POST",
            url: this.dm.urlServer()+"dashboard",
            data: {access_token: this.access_token},
            beforeSend: () => {
                this.loading = true
            },
            complete: () => {
                this.loading = false
            },
            success: (json) => {
				if(json.data != undefined){
                    this.access_token = json.data.access_token
                    this.mesanos = json.data.mesanos
                    this.user = json.data.user
                }
            },
            error: () => {
                this.$router.push('/login')
            },
            dataType: 'json'
        });
    }

    editarReceita(alterando){
        if(!alterando){
            this.transacao_receita = new Transacoes()
            this.transacao_receita.tra_data = this.dataAtual();
        }

        this.transacao_receita.tra_tipo = 2
        this.transacao_receita_error = new Transacoes()

        // buscando categorias
        $.ajax({
            type: "POST",
            url: this.dm.urlServer()+"dashboard/categorias",
            data: {tipo: 2},
            success: (json) => {
                if(json.categorias != undefined){
                    this.categorias = json.categorias
                }
            },
            dataType: 'json'
        });
    }

    salvarReceita(){
        $.ajax({
            type: "POST",
            url: this.dm.urlServer()+"dashboard/inserir-receita",
            data: {
                data: this.transacao_receita,
                access_token: this.access_token,
                mesano: this.mesanos.mes_ano
            },
            success: (json) => {
                if(json.errors != undefined){
                    this.transacao_receita_error = json.errors
                }else{
                    if(json.access_token != undefined){
                        this.dm.setAccessToken(json.access_token)
                        this.access_token = this.dm.getAccessToken()
                    }

                    this.transacoes = json.transacoes
                }
            },
            dataType: 'json'
        });
    }

    initSystem(){
        $('#datePicker').mask('00-0000')
        $('#valor_receita').mask('#.##0,00', {reverse: true});
    }

    clearErrors(event){
        $(event.target).removeClass('is-invalid')
    }

    dataAtual(){
        const data = new Date()

        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = data.getFullYear();

        return `${ano}-${mes}-${dia}`
    }
}

export default Home