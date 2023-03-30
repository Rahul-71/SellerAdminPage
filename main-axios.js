// Define server ID
const serverId = '52e2f2c24312453b953b77f8e8e49e6a';

// Create an Axios instance with a base URL for CRUD operations
const axiosInstance = axios.create({
    baseURL: `https://crudcrud.com/api/${serverId}/products`
});

// Get DOM elements for product lists
let electricList = document.getElementById('electronicList');
let gymList = document.getElementById('gymList');
let beautyList = document.getElementById('beautyList');
let foodList = document.getElementById('foodList');

// Get DOM element for product list body
const prodListBody = document.getElementById('productListBody');
prodListBody.addEventListener('click', deleteProduct);

// Fetch all products when the page loads
document.addEventListener("DOMContentLoaded", () => { getAllProducts(); });

// Define an asynchronous function to get all products
async function getAllProducts() {
    try {
        // Send a GET request using the Axios instance
        const getResponse = await axiosInstance.get();
        console.log("get response");
        console.log(getResponse);
        // Display the list of products
        displayList(getResponse);
    } catch (err) {
        // Log any errors that occur
        console.error("error while getting all products");
        console.error(err);
    }
}

// Define an asynchronous function to save a product
async function saveProduct(prodData) {
    try {
        // Send a POST request using the Axios instance with the product data
        const postResponse = await axiosInstance.post('', prodData);
        console.log("product saved");
        console.log(postResponse);
        // Display the list of products
        displayList(postResponse);
    } catch (err) {
        // Log any errors that occur
        console.error("error while saving product");
        console.error(err);
    }
}

// Define an asynchronous function to delete a product
async function deleteProduct(event) {
    // Check if the event target has the class 'delProd'
    if (event.target.classList.contains('delProd')) {
        // Get the product row and ID
        const prodRow = event.target.parentNode.parentNode;
        const prodId = prodRow.getAttribute('id');
        // Remove the product row from the UI
        prodRow.remove();
        try {
            // Send a DELETE request using the Axios instance with the product ID
            await axiosInstance.delete(`/${prodId}`);
            console.log(`Succefully deleted the product with id ${prodId}`);
        } catch (err) {
            // Log any errors that occur
            console.error("error while deleting the product");
            console.error(err);
        }
    }
}


function displayList(response) {
    // Response status will be 200 for successful GET requests
    // Check if the response status is 200 (successful) and the response data is not empty
    if (response.status === 200 && response.data.length > 0) {
        // Get the array of products from the response data
        const prodArr = response.data;
        // Iterate over each product in the array
        prodArr.forEach(product => {
            // Create a new table row element and set its ID to the product's ID
            let newRow = document.createElement('tr');
            newRow.setAttribute('id', product._id);

            // Create table data elements for the product name, amount, and category
            let name = document.createElement('td');
            name.textContent = product.name;
            let amount = document.createElement('td');
            amount.textContent = '₹' + product.amount;
            let catg = document.createElement('td');
            catg.textContent = product.catg;

            // Create a table cell element for a delete button and add the button to it
            let del = document.createElement('td');
            let delBtn = document.createElement('button');
            delBtn.classList = 'btn btn-sm btn-danger delProd';
            delBtn.textContent = 'Delete';
            del.appendChild(delBtn);

            // Add the name, amount, category, and delete button cells to the new row element
            newRow.appendChild(name);
            newRow.appendChild(amount);
            newRow.appendChild(catg);
            newRow.appendChild(del);

            // Add the new row element to the appropriate category list element based on the product's category
            if (product.catg == 'electronic')
                electricList.appendChild(newRow)
            else if (product.catg == 'food')
                foodList.appendChild(newRow)
            else if (product.catg == 'skin care')
                beautyList.appendChild(newRow)
            else if (product.catg == 'gym')
                gymList.appendChild(newRow)
        });
    }
    // Response status will be 201 for successful POST requests
    else if (response.status === 201) {
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

        // Append the table data elements to the new row
        newRow.appendChild(name);
        newRow.appendChild(amount);
        newRow.appendChild(catg);
        newRow.appendChild(del);

        // Append the new row to the appropriate list based on the product category
        if (product.catg.toLowerCase() === 'electronic')
            electricList.appendChild(newRow)
        else if (product.catg.toLowerCase() === 'food')
            foodList.appendChild(newRow)
        else if (product.catg.toLowerCase() === 'skin care')
            beautyList.appendChild(newRow)
        else if (product.catg.toLowerCase() === 'gym')
            gymList.appendChild(newRow)
    }
}

// Define a function to save a product
function saveProd(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get the values of the amount, name, and category fields
    const amount = document.getElementById('amount').value;
    const name = document.getElementById('name').value;
    const catg = document.getElementById('category').value;

    // Check if all fields have values
    if (amount.length > 0 && name.length > 0 && catg.length > 0) {
        // Create an object with the product data
        const prodData = {
            amount, name, catg
        }
        // Resetting the form
        document.getElementById('prodForm').reset();
        // Save the product data
        saveProduct(prodData);
    } else {
        // Alert the user to fill all fields
        alert('Please fill all the fields');
    }
}