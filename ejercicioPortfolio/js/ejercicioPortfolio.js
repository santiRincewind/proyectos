
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
          //  alert("2");
            //por defecto pintamos la lista de fotos de la primera categoria
            pintarListaFotos(listaPhotos, 3,1);
        
        }
    }
    //funcion para pintar el menu
    //por defecto pintamos 5 categorias de las 100
    function pintarMenu(pLista, categorias=5){
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
           // document.getElementById('vertical-menu').innerHTML +='<li class="linkmenu" data-categoria="'+listaIDTemporal[i]+'"><a onclick="cargarFotosCategoria(this, '+listaIDTemporal[i]+');" data-categoria="'+listaIDTemporal[i]+'">'+nombreAlbum+'</a></li>';
            document.getElementById('vertical-menu').innerHTML +='<li class="linkmenu" data-categoria="'+listaIDTemporal[i]+'"><a data-categoria="'+listaIDTemporal[i]+'">'+nombreAlbum+'</a></li>';
        }
        var elements=document.getElementsByClassName('linkmenu');
        //ahora asociamos la funcion cargar categoria al evento de click 
        for(i=0;i<elements.length;i++){
             elements[i].addEventListener('click', cargarFotosCategoriaJquery);
        }
        
    }

    //ahora pintamos las fotos
    //por defecto pintamos las de la primara categoria
    var ruta="";
    function pintarListaFotos(pLista, pNumeroPhotos =1, categoria){
        //alert(categoria);
        document.getElementById('contenedor').innerHTML = "";
        document.getElementById('categoria').innerHTML = "";
      //  alert("entro pintar lista fotos");
        var albumID="";
        strHTML="";
        document.getElementById('categoria').innerHTML="<section><p><h2> CATEGORIA: "+categoria+"</h2></p><br></section>";
        for(var i=0; i<pLista.length; i++)
        {
                albumID=pLista[i]['albumId'];
                if(albumID==categoria){
                  //  console.log(albumID);
                    var ruta=pLista[i]['url'];
                  //  console.log(ruta);	
                  //  document.getElementById('contenedor').innerHTML += ' <div class="thumb overlay" onclick=mostrarFoto("'+ruta+'"); id="'+pLista[i]['id']+'" data-ruta="'+pLista[i]['url']+'"><img data-toggle="magnify" src="'+pLista[i]['thumbnailUrl']+'"><div class="velo2 overlay"><p class="titulofoto1 more">'+pLista[i]['title']+'</p></div></div>'; 	
                   strHTML += ' <div class="thumb"  id="'+pLista[i]['id']+'" data-ruta="'+pLista[i]['url']+'"><img data-toggle="magnify" src="'+pLista[i]['thumbnailUrl']+'"><div class="velo2 overlay"><p class="titulofoto1 more">'+pLista[i]['title']+'</p></div></div>'; 	
                }
        }
        document.getElementById('contenedor').innerHTML=strHTML;
        var elements=document.getElementsByClassName('thumb');
        //ahora asociamos la funcion cargar categoria al evento de click 
        for(i=0;i<elements.length;i++){
             elements[i].addEventListener('click', cargarMostrarFotoJquery);
        }
    
    }
    
    function cargarFotosCategoriaJquery(Event){
        var cat=$(this).attr('data-categoria');
        var elements=document.getElementsByClassName('linkmenu');
        //ahora asociamos la funcion cargar categoria al evento de click 
        for(i=0;i<elements.length;i++){
             elements[i].style.color="black";
             elements[i].style.backgroundColor="lightblue";
        }
       
        $(this).css('color','red');
        
        pintarListaFotos(listaPhotos, 200, cat);       
    } 
    function cargarMostrarFotoJquery(Event){
        var ruta=$(this).attr('data-ruta');
        //alert("ruta"+ruta);
        mostrarFoto(ruta);  
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
        caja.innerHTML='<object type="text/html" data-toggle="magnify"  data="'+ruta+'.html"></object><div id="cerrar">X</div>'
        var cerrar=document.getElementById('cerrar');
        cerrar.addEventListener('click', cerrarCaja);
    }
 
    //crearLightBox();
    function cerrarCaja(){
        document.body.removeChild(velo);
    }


  
    


