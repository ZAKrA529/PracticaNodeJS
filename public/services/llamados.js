async function getUsers() {
    try {
        const response = await fetch('http://localhost:3000/products', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });


        if (!response.ok) {
            throw new Error('Error fetching users');
        }


        const users = await response.json();
        return users;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
}


export { getUsers };


//////////LLAMADO POST//////////


async function postUsers(id, producto, marca, price, stock) {
    try {


        const productData = {
            id,
            producto,
            marca,
            price,
            stock
        };






        const response = await fetch("http://localhost:3000/products", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productData)
        });




        return await response.json();




    } catch (error) {
        console.error('Error posting user:', error);
        throw error;
    }
}


export { postUsers }


//////////////LLAMADO UPDATE/////////////




async function updateUsers(products, inStock, expira, id) {
    try {


        const productData = {
            products,
            inStock,
            expira,
            id


        };










        const response = await fetch("http://localhost:3000/products/" + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productData)
        });




        return await response.json();
    } catch (error) {
        console.error('Error update user:', error);
        throw error;
    }
}


export { updateUsers }






//////////////LLAMADO DELETE/////////////




async function deleteUser(id) {
    try {
        const response = await fetch(`http://localhost:3000/products/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });


        if (!response.ok) {
            throw new Error(`Error deleting user with id ${id}`);
        }


        return { message: `User with id ${id} deleted successfully` };
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
}


export { deleteUser };
