import { Options, Vue } from 'vue-class-component';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import DocumentMixin from '@/mixins/DocumentMixin'
import $ from 'jquery'
import Usuarios from '@/entities/Usuario';
import axios from 'axios';

// Importando componentes
@Options({
  components: {
    HelloWorld,
  },
})

class Cadastro extends Vue {
	public document = new DocumentMixin()
	
    public usuario = new Usuarios()
    public errors = new Usuarios()

    public loading = false

    sendData(event): void{
		$.ajax({
            type: "POST",
            url: this.document.urlServer()+"/user/signup",
            data: this.usuario,
            beforeSend: () => {
                this.loading = true
            },
            complete: () => {
                this.loading = false
            },
            success: (json) => {
                if(json.errors != undefined){
                    this.errors = json.errors
                }else{
                    // if(json.access_token != undefined){
                        this.$router.replace('/login')
                    // }
                }
            },
            dataType: 'json'
        });

    }

    clearErrors(event){
        $(event.target).removeClass('is-invalid')
    }
}

export default Cadastro