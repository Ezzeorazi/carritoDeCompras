const buttons = document.querySelectorAll(".btn")
const template = document.getElementById("template")
const cart = document.getElementById("carrito")
const footer = document.getElementById("footer")
const templateFooter = document.getElementById("templateFooter")
const fragment = document.createDocumentFragment()

let cartArray = []



const showFooter = () => {
   const total = cartArray.reduce((acc, current) => {
    return acc + current.quantity * current.price
   }, 0)

   const clone = templateFooter.content.cloneNode(true)
   clone.querySelector('.lead span').textContent = total
   footer.textContent = ''
   footer.appendChild(clone)

}


const showCart = () => {

    cart.textContent = ''

    cartArray.forEach(item => {
        const clone = template.content.cloneNode(true)
        clone.querySelector(".list-group-item .lead").textContent = item.title
        clone.querySelector(".badge").textContent = item.quantity
        clone.querySelector(".lead span").textContent = item.price * item.quantity
        clone.querySelector(".btn-success").dataset.id = item.title
        clone.querySelector(".btn-danger").dataset.id = item.title
        fragment.appendChild(clone)
    })

     cart.appendChild(fragment)
     showFooter()
}

const addToCart = e => {
    const product = {
        title: e.target.dataset.fruta,
        id: Date.now(),
        quantity: 1,
        price: parseInt(e.target.dataset.precio)
    }
    const exists = cartArray.findIndex(item => {
         return item.title === product.title
    })

    if(exists < 0){
        cartArray.push(product)
    }else{
        cartArray[exists].quantity++
    }
    showCart()
}

document.addEventListener('click', e => {
    if(e.target.dataset.fruta === "Pera 🍐"){
        addToCart(e)
    }
    if(e.target.dataset.fruta === "Frutilla 🍓"){
        addToCart(e)
    }
    if(e.target.dataset.fruta === "Naranja 🍊"){
        addToCart(e)
    }

    if(e.target.matches('.list-group-item div .btn-success')){
        btnAdd(e)
    }

    if(e.target.matches('.list-group-item div .btn-danger')){
        btnRemove(e)
    }
    if(e.target.dataset.fruta === "Finalizar"){
        finalizarCompra(e)
    }
})


const finalizarCompra = () => {
   
    if (cartArray.length === 0) {
        alert("El carrito está vacío. Agregue productos antes de finalizar la compra.");
    } else {
        const total = cartArray.reduce((acc, current) => {
            return acc + current.quantity * current.price;
        }, 0);
        alert(`¡Gracias por su compra!\nTotal de la compra: $${total}`);
    }
}



const btnAdd = (e) => {
    cartArray = cartArray.map(item => {
        if(e.target.dataset.id === item.title){
            item.quantity++
        }
        return item
    })
    showCart()
}

const btnRemove = (e) => {
    cartArray = cartArray.filter(item => {
        if (e.target.dataset.id === item.title) {
            if (item.quantity > 0) {
                item.quantity--;
                if (item.quantity === 0) return false; 
                return true;
            }
        } else {
            return true;
        }
    });
    showCart();
}

    

