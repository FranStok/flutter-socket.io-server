const Band = require("../models/band");

class Bands{
    constructor(){
        this.bands=[]
    }
    
    addBand(band=new Band(nombre)){
        this.bands.push(band);
    }
    getBands(){
        return this.bands;
    }
    deleteBand(id=""){
        //id.id es lo mismo que hacer id["id"] como hice en voteBand.
        this.bands=this.bands.filter(band=>band.id!=id.id);
        return this.bands;
    }
    voteBand(id=""){
        this.bands.map(band=>{
            //id["id"] porque en flutter en OnTap en HomePage, 
            //mando el payload en el emit como un mapa con el id, no como el id directamente.
            if(band.id==id["id"]){ 
                band.votes++;
            }
            return band;
        })
    }
}

module.exports=Bands;