import './App.css';
import React, { Component } from 'react';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/Header';
import Listado from './Components/Listado';
import Productos from './Components/Productos';

class App extends Component {
  constructor() {
    super();
    this.state = {
      carrito:[],
      total:0,
      productosLista:[
        {codigo:1,descripcion:"Huawei Matebook D 15", precio:15899, url:'https://m.media-amazon.com/images/I/61zKGsIdoPL._AC_SY355_.jpg'},
        {codigo:2,descripcion:"Samsung Galaxy S10", precio:13999, url:'https://cdn-files.kimovil.com/phone_front/0002/92/thumb_191056_phone_front_big.jpeg'},
        {codigo:3,descripcion:"Samsung Galaxy A01", precio:1850, url:'https://http2.mlstatic.com/D_NQ_NP_926246-MLA44282592285_122020-O.jpg'},
        {codigo:4,descripcion:"Xiaomi Redmi Note 9s", precio:5949, url:'https://m.media-amazon.com/images/I/61ShPQu-u0L._AC_SX522_.jpg'},
        {codigo:5,descripcion:"Mochila Xiaomi", precio:699, url:'https://m.media-amazon.com/images/I/51wu2dpWapL._AC_SX569_.jpg'},
        {codigo:6,descripcion:"Teclado Primus Gaming Ballista", precio:1999, url:'https://www.primusgaming.com/media/PKS-301_620.jpg'},
      ],
    };
  }
   
  agregar=(producto)=>{
      let productoagregado= this.state.carrito.find(e=>e.codigo===producto.codigo);
      let lista2= this.state.carrito;
      let tiempo;
      if(productoagregado!==undefined){
        
        tiempo={
          cantidad:productoagregado.cantidad+1,
          codigo:producto.codigo,
          descripcion:producto.descripcion,
          precio:producto.precio
        }
        
        lista2= this.state.carrito.filter(e=>e.codigo!==producto.codigo)
        console.log(lista2)
      }
      else{
        tiempo={
          cantidad:1,
          codigo:producto.codigo,
          descripcion:producto.descripcion,
          precio:producto.precio
        }
      }
     
      this.setState({
        carrito:[...lista2,tiempo],
        total:this.state.total+producto.precio
      })
   
      Swal.fire({
        title: 'Producto agregado con exito',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
      
  }
  eliminar=(a,eli)=>{    
    let tem;
      if(a.cantidad===1){
        tem = this.state.carrito.filter((a,x)=>x!==eli)
      }
      else{
        const tiempo={
          cantidad:a.cantidad-1,
          codigo:a.codigo,
          descripcion:a.descripcion,
          precio:a.precio
        }
        tem = this.state.carrito.filter((a,x)=>x!==eli)
        tem=[...tem,tiempo]
      }
     this.setState({
      carrito:tem,
      total:this.state.total-a.precio
    })

    Swal.fire({
      title: 'Producto eliminado',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    })
    
  } 

  render() {
    var arreglo= this.state.carrito.sort((b,c) => b.codigo-c.codigo);
    return (
      <div className="App">
        <Header/>
        <div className="contenedor">
          
          <Productos
            ProductosLista={this.state.productosLista}
            agregar={this.agregar}

          />
          <Listado
            lista={arreglo}
            total={this.state.total}
            eliminar={this.eliminar}
            eliminarcarrito={this.eliminarcarrito}
          />
        </div>
      </div>
    )
  }
}
export default App;
