import Papa from 'papaparse';

// ... dentro do seu componente ou script
const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    Papa.parse(file, {
        header: true, // Converte a primeira linha em chaves para os objetos JSON
        skipEmptyLines: true, // Ignora linhas vazias
        dynamicTyping: true, // Tenta converter automaticamente tipos (números, booleanos)
        complete: function(results) {
            console.log("Dados convertidos para JSON:", results.data);
            // results.data é um array de objetos JSON
        }
    });
};

export function Converter({setData}){
    

}