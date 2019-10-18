/* 
Code from Displaying Foods Exercise
*/

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


