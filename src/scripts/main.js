/* 
Code from Displaying Foods Exercise
*/

/*
let foodClass = ""
const createFoodComponent = (food) => {
    return `
        <div class = "foodItem">
            <h1>${food.id}</h1>
            <section>${food.name}</section>
            <section>${food.category}</section>
            <section>${food.ethnicity}</section>
        </div>
    `
}

const addFoodToDOM = (html) => {
    const foodContainer = document.querySelector(".foodList");
    foodContainer.innerHTML += html;
}


fetch("http://localhost:8088/food")
    .then(foods => foods.json())
    .then(parsedFoods => {
        parsedFoods.forEach(food => {
            const foodHTML = createFoodComponent(food)
            addFoodToDOM(foodHTML)
        })
    })

*/

/*
Your job is to query the Open Food Facts API for each of your products, and list the following additional information.

-Ingredients
-Country of origin
-Calories per serving
-Fat per serving
-Sugar per serving

Helpful hints: You will need to use the forEach array method to iterate your foods. Inside that forEach, you will need to perform another fetch to get the additional information. The barcode value must be interpolated inside the URL for the inner fetch.
*/
const createFoodComponent = (food) => {
    return `
        <div class = "foodItem">
            <h1>${food.name}</h1>
            <section>${food.category}</section>
            <section>${food.ethnicity}</section>
            <section>${food.ingredients}</section>
        </div>
    `
}

const addFoodToDom = (html) => {
    const foodContainer = document.querySelector(".foodList");
    foodContainer.innerHTML += html;
}

fetch("http://localhost:8088/food")
    .then(response => response.json())
    .then(myParsedFoods => {
        myParsedFoods.forEach(food => {
            console.log(food) // Should have a `barcode` property

            // Now fetch the food from the Food API
            fetch(`https://world.openfoodfacts.org/api/v0/product/${food.barcode}.json`)
                .then(response => response.json())
                .then(productInfo => {
                    if (productInfo.product.ingredients_text) {
                      food.ingredients = productInfo.product.ingredients_text
                    } else {
                      food.ingredients = "no ingredients listed"
                    }

                    // Produce HTML representation
                    const foodHTML = createFoodComponent(food)

                    // Add representaiton to DOM
                    addFoodToDom(foodHTML)
                    
                })
        })
    })
