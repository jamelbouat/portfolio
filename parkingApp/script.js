$(document).ready(function(){

    // Récupération des checkbox
    var checkBox = $(".custom-control-input");
    var checkLabel = $(".custom-control-label");
    // Récupération des 2 tables( dans fenêtres modal )
    let table1=$("#table1")[0];
    let table2=$("#table2")[0];

    document.querySelector("body").onload=function(){
        // Affichage de la map avec une localisation paris centre
        let map= new Microsoft.Maps.Map(document.getElementById("map"), {
            credentials:"JhLvSD14sTs5l337PAFZ~xLSIMWIqX-YCKRw12mds0A~AvmSLfvphfEsVUCnKKg1lzmBDbBnkPT1MGaLmVFPFZ3wwmcTfWeQKnAZ-hRZT8vj",
            center: new Microsoft.Maps.Location(48.857, 2.35080),
            zoom: 12,
            mapTypeId: Microsoft.Maps.MapTypeId.road
        });

        // Récupération du fichier JSON des parkings de Paris/ success: appel fonction putMarkers()
        $.get({
            url: "https://opendata.paris.fr/api/records/1.0/search/?dataset=parcs-de-stationnement-concedes-de-la-ville-de-paris&rows=300&facet=acces_vl&facet=arrdt&facet=deleg&facet=h_parc_cm&facet=type_parc&facet=horaire_na&facet=asc_surf&facet=acces_moto&facet=acces_velo&facet=v_elec_ch&facet=autopart&facet=tarif_pr&facet=tarif_res&facet=tf_pr_moto&facet=tf_res_mo&facet=parc_amod&facet=parc_relai",
            cache:false,
            dataType: "json",
            success: function(data) {
                putMarkers(data);
                console.log(data);
            },
            error: function(){
                alert("fichier non trouvé");
            }
        });

        // putMarkers: ajout de tous les pushpins parkings Paris
        let markers=[];
        let object;

        function putMarkers(data) {

            object=data.records;
            for (let i=0; i<data.records.length; i++){
                // add pushpins to the map with an icon image
                let markerLocation=object[i].geometry.coordinates;
                let position = new Microsoft.Maps.Location(markerLocation[1], markerLocation[0]);
                marker = new Microsoft.Maps.Pushpin(position, {
                    icon:'images/placeholder.png',
                    anchor: new Microsoft.Maps.Point(0,0),
                });
                map.entities.push(marker);

                //create an array of the pusphins / à la suite pour comparer le posistion du pushpin: récupérer son index
                markers.push(marker);

                // Retrieve from the json file name, address,.... of a pushping
                let parkingName=object[i].fields.nom_parc;
                let parkingAddress=object[i].fields.adress_ssc;
                let parkingPhone=object[i].fields.tel;
                let parkingHoraires=object[i].fields.horaire_na;
                var parkingAccess_Moto=object[i].fields.acces_moto;
                var parkingAccess_Velo=object[i].fields.acces_velo;
                var parkingAbonnementUnite=object[i].fields.type_parc;

                // metadata of a pushping
                marker.metadata = {
                    title:"Parking : "+parkingName,
                    description: "<span class='infotext'>Adresse : </span>"+parkingAddress+
                    "<br><span class='infotext'>Téléphone : </span>"+parkingPhone+
                    "<br><span  class='infotext'>Horaires : </span>"+parkingHoraires+
                    "<br><span  class='infotext'>"+accesMotoVelo()+"</span><br>"+
                    ParkingAbonnementOuUnitaire(),
                };

                Microsoft.Maps.Events.addHandler(marker, 'click', markerClicked);
            }

            // Test parking abonnement ou tarif à l'unité/ add the 2 buttons/ show modals onclick
            function ParkingAbonnementOuUnitaire () {
                if (parkingAbonnementUnite==="VISITEURS ET ABONNES") {
                    parkingAbonnementUnite="<button class='button' onclick=\"$('#abonneModal').modal()\">Abonnement</button>" +
                        "<br><button class='button' onclick=\"$('#uniteModal').modal()\">Réservation à l'unité</button>";
                    return parkingAbonnementUnite;
                }
                else {
                    parkingAbonnementUnite="<button class='button' onclick=\"$('#abonneModal').modal()\">Abonnement</button>";
                    return parkingAbonnementUnite;
                }
            }

            // test si parking vélo et moto sont accéssibles
            function accesMotoVelo() {
                if ((parkingAccess_Moto==="OUI")&&(parkingAccess_Velo==="OUI")){
                    return "Accéssibilité Moto<br>Accéssibilité Vélo";
                }
                else if ((parkingAccess_Moto==="NON")&&(parkingAccess_Velo==="OUI")){
                    return "Accéssibilité Vélo";
                }
                else if ((parkingAccess_Moto==="OUI")&&(parkingAccess_Velo==="NON")){
                    return "Accéssibilité Moto";
                }
                else {
                    return "";
                }
            }
        }

        // Création d'une fenêtre infobox
        infobox = new Microsoft.Maps.Infobox(map.getCenter(), {
            visible: false,
        });
        infobox.setMap(map);

        // au clic sur un pushpin
        function markerClicked(info) {
            if (info.target.metadata) {
                infobox.setOptions({
                    location: info.location,
                    title: info.target.metadata.title,
                    description: info.target.metadata.description,
                    visible: true,
                    maxHeight: 1000,
                    maxWidth: 800,
                });

                // parking positions (index) when a pushpin is clicked
                for (let position in markers) {
                    if (markers[position] === info.target) {
                        var index = position;
                    }
                }

                //////////////// DECLARATION VARIABLES /////////////////////////

                // Récupération des cases prix total abonné et à l'unité
                let cell_totalPriceAbonne = $("#totalPriceAbonne");
                let cell_totalPriceUnite = $("#totalPriceUnite");

                // A la ouverture du modal=>Prix total initialisé, Checkbox sont décochés, checkbox visibles
                $(".modal").on("hidden.bs.modal", function () {
                    cell_totalPriceAbonne.html("");
                    cell_totalPriceUnite.html("");
                    checkBox.prop("checked", false);
                    checkBox.css("display", "");
                    checkLabel.css("display", "");
                    // cases de la colonne tarif initialisées
                    $('#cell_Voiture_Abonne').html("");
                    $('#cell_Moto_Abonne').html("");
                    $('#cell_Velo_Abonne').html("");
                    $('#cell_Voiture_Unite').html("");
                    $('#cell_Moto_Unite').html("");
                    $("#select1").val("00");
                    $("#select2").val("00");
                    $("#select3").val("00");
                    $("#select4").val("00");
                    $("#select5").val("00");
                });

                // Remplacement des virgules par des points, pour le calcul
                function replaceCommaWithDot(price) {
                    return price.replace(",", ".");
                }

                function check_Price_ND_Or_Empty(){
                    for (let i=0;i<3;i++){
                        // Faire disparaitre les checkbox si option(select) a la valeur "ND"
                        if (table1.rows[i+1].cells[2].innerHTML==="ND"){
                            $(checkBox[i]).css("display", "none");
                            $(checkLabel[i]).css("display", "none");
                        }
                        else if (table2.rows[i+1].cells[2].innerHTML==="ND"){
                            $(checkBox[i+3]).css("display", "none");
                            $(checkLabel[i+3]).css("display", "none");
                        }
                        // Réaffichage des checkbox si option(select) n'a pas la valeur "ND"
                        else {
                            $(checkBox[i]).css("display", "");
                            $(checkLabel[i]).css("display", "");
                            $(checkBox[i+3]).css("display", "");
                            $(checkLabel[i+3]).css("display", "");
                        }
                    }
                }

                function checkBox_Clicked(i,n,table,cell_totalPrice){
                    checkBox[i].onclick= function() {
                        if (checkBox[i].checked){
                            // Checkbox coché : ajout du prix au Prix Total
                            let price=table.rows[n+1].cells[2].innerHTML;
                            let printedPrice=Number(cell_totalPrice.text());
                            let total=printedPrice+Number(replaceCommaWithDot(price));
                            cell_totalPrice.html(total.toFixed(2));
                        }
                        else {
                            // Checkbox décoché : soustraction du prix du Prix Total
                            let price=table.rows[n+1].cells[2].innerHTML;
                            let printedPrice=Number(cell_totalPrice.text());
                            let total=printedPrice-Number(replaceCommaWithDot(price));
                            cell_totalPrice.html(total.toFixed(2));
                        }
                    }
                }

                // Au clic du select, la checkbox est décoché,
                // et le prix correspondant est retiré du cell_totalPrice
                function checkBoxChecked_clickSelectEvent(i,n,table,cell_totalPrice) {
                    if (checkBox[i].checked){
                        let price=table.rows[n+1].cells[2].innerHTML;
                        let printedPrice=Number(cell_totalPrice.text());
                        let total=printedPrice-Number(replaceCommaWithDot(price));
                        cell_totalPrice.html(total.toFixed(2));
                        $(checkBox[i]).prop("checked", false);
                    }
                }

                //////////// Select 1 /////////
                let clickSelect1=$("#select1");
                clickSelect1.click(function () {
                    let i=0;
                    let n=0;
                    let table=table1;
                    let cell_totalPrice=cell_totalPriceAbonne;

                    checkBoxChecked_clickSelectEvent(i,n,table,cell_totalPrice);

                    clickSelect1.change(function () {
                        switch (this.value) {
                            case "00":
                                $('#cell_Voiture_Abonne').html("");
                                break;
                            case "01":
                                $('#cell_Voiture_Abonne').html(object[index].fields.ab_1m_e);
                                break;
                            case "02":
                                $('#cell_Voiture_Abonne').html(object[index].fields.ab_1a_e);
                                break;
                        }

                        // Vérification après le déclenchement d'un événement
                        $(".modal").mousemove(function(){
                            check_Price_ND_Or_Empty();
                        });

                        checkBox_Clicked(i,n,table,cell_totalPrice);
                    })
                });

                //////////// Select 2 /////////
                let clickSelect2=$("#select2");
                clickSelect2.click(function () {
                    let i=1;
                    let n=1;
                    let table=table1;
                    let cell_totalPrice=cell_totalPriceAbonne;

                    checkBoxChecked_clickSelectEvent(i,n,table,cell_totalPrice);

                    clickSelect2.change(function () {
                        switch (this.value) {
                            case "00":
                                $('#cell_Moto_Abonne').html("");
                                break;
                            case "01":
                                $('#cell_Moto_Abonne').html(object[index].fields.abmoto_1me);
                                break;
                            case "02":
                                $('#cell_Moto_Abonne').html(object[index].fields.abmoto_1te)
                                break;
                            case "03":
                                $('#cell_Moto_Abonne').html(object[index].fields.abmoto_1ae)
                                break;
                        }

                        $(".modal").mousemove(function(){
                            check_Price_ND_Or_Empty();
                        });

                        checkBox_Clicked(i,n,table,cell_totalPrice);
                    })
                });

                //////////// Select 3 /////////
                let clickSelect3=$("#select3");
                clickSelect3.click(function () {
                    let i=2;
                    let n=2;
                    let table=table1;
                    let cell_totalPrice=cell_totalPriceAbonne;

                    checkBoxChecked_clickSelectEvent(i,n,table,cell_totalPrice);

                    clickSelect3.change(function () {
                        switch (this.value) {
                            case "00":
                                $('#cell_Velo_Abonne').html("");
                                break;
                            case "01":
                                $('#cell_Velo_Abonne').html(object[index].fields.tvelo_1m_e);
                                break;
                        }

                        $(".modal").mousemove(function(){
                            check_Price_ND_Or_Empty();
                        });

                        checkBox_Clicked(i,n,table,cell_totalPrice);
                    })

                });

                //////////// Select 4 /////////
                let clickSelect4=$("#select4");
                clickSelect4.click(function () {
                    let i=3;
                    let n=0;
                    let table=table2;
                    let cell_totalPrice=cell_totalPriceUnite;

                    checkBoxChecked_clickSelectEvent(i,n,table,cell_totalPrice);

                    clickSelect4.change(function () {
                        switch (this.value) {
                            case "00":
                                $('#cell_Voiture_Unite').html("");
                                break;
                            case "01":
                                $('#cell_Voiture_Unite').html(object[index].fields.tf_15mn_e);
                                break;
                            case "02":
                                $('#cell_Voiture_Unite').html(object[index].fields.tf_30mn_e);
                                break;
                            case "03":
                                $('#cell_Voiture_Unite').html(object[index].fields.tf_1h_e);
                                break;
                            case "04":
                                $('#cell_Voiture_Unite').html(object[index].fields.tf_1h30_e);
                                break;
                            case "05":
                                $('#cell_Voiture_Unite').html(object[index].fields.tf_4h_e);
                                break;
                            case "06":
                                $('#cell_Voiture_Unite').html(object[index].fields.tf_8h_e);
                                break;
                            case "07":
                                $('#cell_Voiture_Unite').html(object[index].fields.tf_12h_e);
                                break;
                        }

                        $(".modal").mousemove(function(){
                            check_Price_ND_Or_Empty();
                        });

                        checkBox_Clicked(i,n,table,cell_totalPrice);
                    })
                });

                //////////// Select 5 /////////
                let clickSelect5=$("#select5");
                clickSelect5.click(function () {
                    let i=4;
                    let n=1;
                    let table=$("#table2")[0];
                    let cell_totalPrice=cell_totalPriceUnite;

                    checkBoxChecked_clickSelectEvent(i,n,table,cell_totalPrice);

                    clickSelect5.change(function () {
                        switch (this.value) {
                            case "00":
                                $('#cell_Moto_Unite').html("");
                                break;
                            case "01":
                                $('#cell_Moto_Unite').html(object[index].fields.tf_15mn_mo);
                                break;
                            case "02":
                                $('#cell_Moto_Unite').html(object[index].fields.tf_30mn_mo);
                                break;
                            case "03":
                                $('#cell_Moto_Unite').html(object[index].fields.tf_24h_mot);
                                break;
                        }

                        $(".modal").mousemove(function(){
                            check_Price_ND_Or_Empty();
                        });

                        checkBox_Clicked(i,n,table,cell_totalPrice);
                    })
                })
            }
        }
    };

    //////////////// Modal payement ///////////////////////
    // Récupération et affichage de la date du jour par défaut
    let dateToday = new Date().toISOString().substr(0, 10);
    $('input[type="date"]').val(dateToday);

    // Accéder à la fenêtre payement pour abonné
    $("#payementAbonne").hover(function () {
        let payement1=$("#totalPriceAbonne").text();
        let date=$("#dateInput1").val().split("-");
        let  day = date[2]; let month = date[1]; let year = date[0];
        date=day+"/"+month+"/"+year;
        let time=$("#timeInput1").val();

        $("#payementAbonne").click(function () {
            $("#payementModal").modal();
            $("#abonneModal").modal("hide");
            $("#totalPayement").html(payement1);
            $("#date").html(date);
            $("#time").html(time);
        });
    });

    // Accéder à la fenêtre payement pour tarif unitaire
    $("#payementUnite").hover(function () {
        let payement2=$("#totalPriceUnite").text();
        let date=$("#dateInput2").val().split("-");
        let  day = date[2]; let month = date[1]; let year = date[0];
        date=day+"/"+month+"/"+year;
        let time=$("#timeInput2").val();

        $("#payementUnite").click(function () {
            $("#payementModal").modal();
            $("#uniteModal").modal("hide");
            $("#totalPayement").html(payement2);
            $("#date").html(date);
            $("#time").html(time);
        })
    })
});