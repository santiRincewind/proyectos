//primero leemos el json	
	//jsonplaceholder
    var url= "https://jsonplaceholder.typicode.com/photos";
    var json = new XMLHttpRequest();
    var listaPhotos = new Array();
    json.open("GET", url, true);
    json.send();
    json.addEventListener('readystatechange', leerJASON);
    //ahora tenemos que pintar el menu y las fotos
    // hay 100 categorias, así que solo pintamos 5
    listaPhotos =new Array();
    function leerJASON(){
    
        if (this.readyState==4 && this.status==200){
            listaPhotos = JSON.parse(this.responseText);
            pintarMenu(listaPhotos);
            //por defecto pintamos la lista de fotos de la primera categoria
            pintarListaFotos(listaPhotos, 2000,1);
            
        }
    }
    //funcion para pintar el menu
    //por defecto pintamos 5 categorias de las 100
    function pintarMenu(pLista, categorias=20){
        document.getElementById('vertical-menu').innerHTML = "";
        var albumID="";
        var listaIDTemporal = new Array();
        for(var i=0; i<pLista.length; i++)
        {
                albumID=pLista[i]['albumId'];
                //también se podría usar array.includes();
                if(listaIDTemporal.indexOf(albumID)==-1){
                    listaIDTemporal.push(albumID);
                }
                
        }
        for(i=0;i<categorias;i++){
            var nombreAlbum="categoria "+listaIDTemporal[i];
            document.getElementById('vertical-menu').innerHTML +='<li class="linkmenu"><a onclick="cargarFotosCategoria(this, '+listaIDTemporal[i]+');"data-categoria="'+listaIDTemporal[i]+'">'+nombreAlbum+'</a></li>';
        }
    }
    //ahora pintamos las fotos
    //por defecto pintamos las de la primara categoria
    var ruta="";
    function pintarListaFotos(pLista, pNumeroPhotos =1, categoria){
        //alert(categoria);
        document.getElementById('contenedor').innerHTML = "";
        //alert("entro");
        var albumID="";
        
        for(var i=0; i<pLista.length; i++)
        {
                albumID=pLista[i]['albumId'];
                if(albumID==categoria){
                    console.log(albumID);
                    var ruta=pLista[i]['url'];
                    console.log(ruta);
                    document.getElementById('contenedor').innerHTML += '<div class="thumb" onclick=mostrarFoto("'+ruta+'"); id="'+pLista[i]['id']+'" data-ruta="'+pLista[i]['url']+'"><img src="'+pLista[i]['thumbnailUrl']+'"></div>'; 	
                }
        }
    }
     //ahora al hacer click sobre un elemento del menu
    //pintamos las fotos de esa categoria
    
    function cargarFotosCategoria(pObject,cat){
        //document.getElementById('vertical-menu').style.backgroundColor = '#eee';
        //pObject.style.backgroundColor = "blue";
        pintarListaFotos(listaPhotos, 200, cat);
        
    } 

    function getObject(idFoto){
        var listaTemporal = new Array();
        listaTemporal.push(listaPhotos[idFoto]);
        pintarObjeto(listaTemporal)
    }
    function filtrarPhoto(event){
        var photo = document.getElementById('valor').value;
        getObject(photo);
    }

    
    function mostrarFoto(ruta){
        velo=document.createElement('div');
        velo.setAttribute('class', 'lightbox');
        caja=document.createElement('div');
        caja.setAttribute('class', 'caja');
        velo.appendChild(caja);
        document.body.appendChild(velo);
        //alert("llego2");
        caja.innerHTML='<object type="text/html" data="'+ruta+'.html"></object><div id="cerrar">X</div>'
        var cerrar=document.getElementById('cerrar');
        cerrar.addEventListener('click', cerrarCaja);
    }
    function crearCaja(pObjectBoton){
       // var tipo=pObjectBoton.dataset.tipo;
        var ruta=pObjectBoton.dataset.ruta;
        //alert("antes del if "+ruta);
        var boton=pObjectBoton.innerText;
        boton=boton.toLowerCase();
      
        boton=boton.replace(" ","");
        velo=document.createElement('div');
        velo.setAttribute('class', 'lightbox');
        caja=document.createElement('div');
        caja.setAttribute('class', 'caja');
        velo.appendChild(caja);
        document.body.appendChild(velo);
        caja.innerHTML='<object type="text/html" data="'+boton+'.html"></object><div id="cerrar">X</div>'
        var cerrar=document.getElementById('cerrar');
        cerrar.addEventListener('click', cerrarCaja);
      //  alert("antes del if "+tipo);
        if(tipo == "texto")
        {
            caja.innerHTML = '<object type="text/html" data="'+url+'.html" ></object><div id="cerrar">X</div>'
        }
        else if(tipo == "video"){
        //alert("santi"+pObjectBoton.dataset.imagen)
        //caja.innerHTML = '<img src="'+pObjectBoton.dataset.imagen+'"><div id="cerrar">X</div>'
        caja.innerHTML='<img id="imgengrande" src="'+ruta+'" frameborder="1" allowfullscreen="allowfullscreen"></img>'
        }
    }
    //crearLightBox();
    function cerrarCaja(){
        document.body.removeChild(velo);
    }