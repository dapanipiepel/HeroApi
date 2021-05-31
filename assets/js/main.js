$(document).ready(function(){
    $("form").submit(function(event){
        event.preventDefault();
        let valueInput = $("#heroInput").val();
        if (valueInput > 731 ){
            alert("Actualmente, tenemos 731 SuperHéroes en la base de datos. Por favor ingrese un ID(numérico) entre 1 y 371.")
        }else if (Number.isNaN(+valueInput)){
            alert(`El texto ingresado ${valueInput} no es un número`)
            return false;
        }

        $.ajax({
            url:"https://www.superheroapi.com/api.php/10226058059819540/" + valueInput,
            success: function(data){
                console.log(data);
                //nombre, imagen, conexiones, ocupación, primera aparición, altura, peso, aliases
                let imagen = data.image.url;
                let nombre = data.name;
                let conexiones = data.connections["group-affiliation"];
                let ocupación = data.work.occupation;
                let firstapp = data.biography["first-appearance"];
                let altura = data.appearance.height;
                let peso = data.appearance.weight;
                let alias = data.biography.aliases;
                let stats = Object.entries(data.powerstats)
                let estadisticas = [ ]
                console.log(stats);
                $("#SHinfo").html(`
                    <div class="card">
                        <h5 class="card-header text-center">SuperHero encontrado!</h5>
                            <div class="row">
                                <div class="col-12 col-sm-12 col-md-12 col-12">
                                    <img id="heropic" src="${imagen}"/>
                                </div>
                                <div class="col-12 col-sm-12 col-md-12 col-12">
                                    <div class="card-body">
                                        <h6 class="card-title">Nombre: ${nombre}</h6>
                                        <p class="card-text">Conexiones: ${conexiones}</p>
                                        <div class="card-body">
                                            <p class="card-text">Ocupación: ${ocupación}</p>
                                            <p class="card-text">Primera aparición: ${firstapp}</p>
                                            <p class="card-text">Altura: ${altura}</p>
                                            <p class="card-text">Peso: ${peso} <br> </p>
                                            <p class="card-text">Aliases: ${alias}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                `);
                
                stats.forEach(function(poder){
                    estadisticas.push({
                        label:poder [0],
                        y: poder [1],
                    })
                })
                console.log(estadisticas);

                let config = {
                    animationEnabled : true,
                    title: {
                        text: `Estadísticas de poder para ${nombre}`
                    },
                    axisY: {
                        title: "Valor"
                    },
                    axisX: {
                        title: "Estadística"
                    },
                    data: [
                        {
                            type: "pie",
                            dataPoints: estadisticas,
                        },
                    ],
                };

                let chart = new CanvasJS.Chart("HeroStats", config);
                chart.render();
                
            },
            error: function(){
                alert("Error 404")
            }
        })
    });
});