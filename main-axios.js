const serverId = '365bdeab2afa4032a5d4a0efa5912718';
const axiosInstance = axios.create({
    baseURL: `https://crudcrud.com/api/${serverId}/products`
});

let electricList = document.getElementById('electronicList');
let gymList = document.getElementById('gymList');
let beautyList = document.getElementById('beautyList');
let foodList = document.getElementById('foodList');

const prodListBody = document.getElementById('productListBody');
prodListBody.addEventListener('click', deleteProduct);


getAllProducts();

function getAllProducts() {
    axiosInstance.get()
        .then(response => {
            console.log(response);
            displayList(response);
        })
        .catch(err => console.error(err))
}


function saveProduct(prodData) {
    axiosInstance.post('', prodData)
        .then(response => {
            console.log('save product api response');
            console.log(response);
            displayList(response);
        })
}

function deleteProduct(event) {
    if (Array.from(event.target.classList).includes('delProd')) {
        const prodRow = event.target.parentNode.parentNode;
        const prodId = prodRow.getAttribute('id');
        prodRow.remove();   // delete row from UI
        axiosInstance.delete(`/${prodId}`)
            .then(
                console.log('successfully deleted the prod')
            )
            .catch(err => console.error(err))
    }
}


function displayList(response) {
    // GET api response
    if (response.status === 200 && response.data.length > 0) {
        const prodArr = response.data;
        prodArr.forEach(product => {
            let newRow = document.createElement('tr');
            newRow.setAttribute('id', product._id);

            let name = document.createElement('td');
            name.textContent = product.name;
            let amount = document.createElement('td');
            amount.textContent = '₹' + product.amount;
            let catg = document.createElement('td');
            catg.textContent = product.catg;

            let del = document.createElement('td');
            let delBtn = document.createElement('button');
            delBtn.classList = 'btn btn-sm btn-danger delProd';
            delBtn.textContent = 'Delete';
            del.appendChild(delBtn);

            newRow.appendChild(name);
            newRow.appendChild(amount);
            newRow.appendChild(catg);
            newRow.appendChild(del);

            if (product.catg == 'electronic')
                electricList.appendChild(newRow)
            else if (product.catg == 'food')
                foodList.appendChild(newRow)
            else if (product.catg == 'beauty')
                beautyList.appendChild(newRow)
            else if (product.catg == 'gym')
                gymList.appendChild(newRow)

        });
    } else if (response.status === 201) {
        const product = response.data;
        let newRow = document.createElement('tr');
        newRow.setAttribute('id', product._id);

        let name = document.createElement('td');
        name.textContent = product.name;
        let amount = document.createElement('td');
        amount.textContent = '₹' + product.amount;
        let catg = document.createElement('td');
        catg.textContent = product.catg;

        let del = document.createElement('td');
        let delBtn = document.createElement('btn');
        delBtn.classList = 'btn btn-sm btn-danger delProd';
        delBtn.textContent = 'Delete';
        del.appendChild(delBtn);

        newRow.appendChild(name);
        newRow.appendChild(amount);
        newRow.appendChild(catg);
        newRow.appendChild(del);

        if (product.catg.toLowerCase() === 'electronic')
            electricList.appendChild(newRow)
        else if (product.catg.toLowerCase() === 'food')
            foodList.appendChild(newRow)
        else if (product.catg.toLowerCase() === 'beauty')
            beautyList.appendChild(newRow)
        else if (product.catg.toLowerCase() === 'gym')
            gymList.appendChild(newRow)
    }
}

function saveProd(event) {
    event.preventDefault();

    const amount = document.getElementById('amount').value;
    const name = document.getElementById('name').value;
    const catg = document.getElementById('category').value;

    const prodData = {
        amount, name, catg
    }
    // reset the form fields
    document.getElementById('prodForm').reset();

    saveProduct(prodData);
}






