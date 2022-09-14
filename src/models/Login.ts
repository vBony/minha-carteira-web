import { Options, Vue } from 'vue-class-component';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import DocumentMixin from '@/mixins/DocumentMixin'
import $ from 'jquery'
import Usuario from '@/entities/Usuario';
import axios from 'axios';

// Importando componentes
@Options({
  components: {
    HelloWorld,
  },
})

class Login extends Vue {
	public document = new DocumentMixin()
	public user = new Usuario()

    public base_url = process.env.VUE_APP_SERVER_URL

	public errors = {}

    public loading = false

    login(){
        axios.post(this.base_url+"login", this.user)
        .then(resp => {
            const response = resp.data

            if(response.errors != undefined){
                this.errors = response.errors
            }

            if(response.access_token != undefined){
                this.errors = {}
                this.document.setAccessToken(response.access_token)

                this.$router.push('/')
            }
        })

        // $.ajax({
        //     type: "POST",
        //     url: this.base_url+"login",
        //     data: {data: this.user},
        //     beforeSend: () => {
        //         this.loading = true
        //     },
        //     complete: () => {
        //         this.loading = false
        //     },
        //     success: (json) => {
        //         if(json.errors != undefined){
        //             this.errors = json.errors
        //         }

		// 		if(json.access_token != undefined){
        //             this.errors = {}
        //             this.document.setAccessToken(json.access_token)

        //             this.$router.push('/')
        //         }
        //     },
        //     dataType: 'json'
        // })
    }

    clearErrors(event){
        $(event.target).removeClass('is-invalid')
    }
}

export default Login