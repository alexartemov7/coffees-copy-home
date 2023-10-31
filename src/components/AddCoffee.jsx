import { useEffect } from 'react'
import './addCoffee.css'

export default function AddCoffee({ setCoffees }) { //creates and exports AddCoffee function receiving a single prop which is a state setting function setCoffees
    const getCoffees = () => { //creates a constant getCoffees and assigns it an arrow function which fetches the data from the API. Fetch is a modern way to make https request
        fetch('https://first-deployed-api-aa.web.app/coffees')//fetches data from the URL
            .then(res => res.json()) //code takes response and attempts to parse as json and returns it, if successful
            .then(data => setCoffees(data)) //with the data received, function invokes, which updates the state of coffees with fetched data
            .catch(alert) //or print alert in case of error
    }

    useEffect(() => { 
        getCoffees()
    }, []) //one time, after the component mounts, get the coffees
