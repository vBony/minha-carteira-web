class DocumentMixin {
	urlServer(){
		return process.env.VUE_APP_SERVER_URL
	}

	baseUrl(){
		return document.location.origin + '/'
	}

	getAccessToken(){
		return localStorage.getItem('access_token')
	}

	setAccessToken(token){
		localStorage.setItem('access_token', token)
	}

	formatarData(data){
		const dia = data.split('/')[0]
		const mes = data.split('/')[1]
		const ano = data.split('/')[2]

		return `${ano}-${mes}-${dia}`
	}
}

export default DocumentMixin
