import { useEffect } from 'react'
import './addCoffee.css'

export default function AddCoffee({ setCoffees }) { //creates and exports AddCoffee function receiving a single prop which is a state setting function setCoffees
    const getCoffees = () => { //creates a constant getCoffees and assigns it an arrow function which fetches the data from the API. Fetch is a modern way to make https request
        fetch('https://first-deployed-api-aa.web.app/coffees')//fetches data from the URL
            .then(res => res.json()) //code takes response and attempts to parse as json and returns it, if successful
            .then(data => setCoffees(data)) //with the data received, function invokes, which updates the state of coffees with fetched data
            .catch(alert) //or print alert in case of error
    }

useEffect(() => { //calls the React Hook useEffect which has Squid Game Syntax: () => {}, []
    getCoffees() //calls get coffees function and executes(no need for button)
}, [])  //one time, after the component mounts, get the coffees. [] - empty brackets mean the function will run only once until the component mounts. DO NOT FORGET TO PUT BRACKETS IN Syntax
const handleSubmit = (e) => { //creates an arrow function that handles the event. Letter e is the event.
    e.preventDefault() //prevents default behaviour of reloading the page and putting form data into URL section
    // gather form data
    // e.target is the form
    // e.target.name is the input "name"
    // e.target.name.value is the value of the input "name"
    const name = e.target.name.value //extracts value from the 'name' line in the form and assigning it into corresponding variable
    const recipe = e.target.recipe.value //extracts value from the 'recipe' line in the form and assigning it into corresponding variable
    const description = e.target.description.value //extracts value from the 'description' line in the form and assigning into corresponding variable
    //create a coffee object
    const newCoffee = { name, recipe, description } //creates new object named newCoffee which takes in the extracted values of name, recipe and description.
    console.log(newCoffee) //console logs the new object
    // POST the newCoffee object to the API
    fetch('https://first-deployed-api-aa.web.app/coffees', {//hitting the API with a post request with a new object restructured from the form data
        method: 'POST', //specifies that the request is POST request
        headers: {
            'Content-Type': 'application/json', //informing server that the body contains json datas
        },
        body: JSON.stringify(newCoffee), //converts newCoffeee object into json string and passes it as the body of the request
    })
        .then(res => res.json()) 
        .then(data => //checks if message is "Success!""
        {
            if (data.message === "Success!") {
                //our coffee was added successfully
                // let's clear the form
                e.target.name.value = ''
                e.target.recipe.value = ''
                e.target.description.value = ''
                // and the get an updated list of coffees...
                getCoffees()
            }
        })
        .catch(alert)
}
