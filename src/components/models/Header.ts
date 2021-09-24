import { Options, Vue } from 'vue-class-component';

@Options({
    props: {
        username: String
    }
})

export default class HelloWorld extends Vue {
    username!: string
}