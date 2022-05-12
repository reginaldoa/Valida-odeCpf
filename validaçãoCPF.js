function ValidaCPF(cpfenviado){
    Object.defineProperty(this,'cpflimpo',{
        get:function(){      
            return cpfenviado.replace(/\D+/g,'')
        }
    });

};

ValidaCPF.prototype.valida = function(){
    if(typeof this.cpflimpo === 'undefined') return false
    if(this.cpflimpo.length !== 11) return false
    if(this.isSequencia()) return false

    const cpfparcial = this.cpflimpo.slice(0, -2)
    const digito1 = this.criadigito(cpfparcial)
    const digito2 = this.criadigito(cpfparcial+ digito1)

    const novocpf = cpfparcial + digito1 + digito2;
    console.log(`Digito 1: ${digito1} Digito 2: ${digito2}`)
    return novocpf
  
   
}

ValidaCPF.prototype.criadigito = function(cpfparcial){
    const cpfarray = Array.from(cpfparcial)
    
    let regressivo =  cpfarray.length +1;
    let total = cpfarray.reduce((ac, vl)=>{
        ac += (regressivo* Number(vl))
        regressivo--
        return ac
    },0)

    const digito = 11 - (total%11);
    return digito > 9? 0 :String(digito);
    
    
}

ValidaCPF.prototype.isSequencia = function(){
    const sequencia = this.cpflimpo[0].repeat(this.cpflimpo.length);
    return (sequencia === this.cpflimpo)
}


const cpf = new ValidaCPF('705.484.450-52 ');

if(cpf.valida()){
    console.log('cpf válido')
}else{
    console.log('cpf invalido')
}


