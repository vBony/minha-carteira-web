import { Options, Vue } from 'vue-class-component';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import DocumentMixin from '@/mixins/DocumentMixin'
import Header from '@/components/Header.vue';
import $ from 'jquery'

// Importando componentes
@Options({
  components: {
    HelloWorld,
    Header
  },
})

class Home extends Vue {
	public document = new DocumentMixin()
	public Usuario = {
		usu_email: null,
		usu_senha: null
	}

	public errors = {}

    sendData(event){
		$.ajax({
            type: "POST",
            url: this.document.urlServer()+"api/login",
            data: this.Usuario,
            success: (json) => {
                if(json.errors != undefined){
                    this.errors = json.errors
                }

				if(json.messages != undefined){
                    if(json.messages == 'success'){
                        this.errors = {}
                    }
                }
            },
            dataType: 'json'
        });
    }
}

export default Home