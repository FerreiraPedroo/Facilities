export class API {
	storage = "local";

	static listaRequisicoes(){
		try {
			const requisicoes = JSON.parse(localstorage.get("requisicoes"));
			console.log(requisicoes);
			
		} catch(e) {
			return [];
		}		
		
	}	





}