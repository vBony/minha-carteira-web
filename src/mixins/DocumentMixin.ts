class DocumentMixin {
	urlServer(){
		const url = window.location.hostname;
		if(url != 'localhost'){
			return 'https://minha-carteira-server.bony.xyz/'
		}else {
			return 'http://localhost/minha-carteira/'
		}
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
}

export default DocumentMixin
