import {gql} from '@apollo/client'

//category
const CATEGORY = gql`
    query{
        categories{
            id
            name
        }
    }
`
///restaurant
const RESTAURANT = gql`
    query filterRes($catID:ID!){
        filterRes(catID:$catID){
            id
            name
            catID
        }
    }
`
/////branch
const BRANCHES = gql`
    query filtBranches($resID:ID!){
        filtBranches(resID: $resID){
                id
                name
                resID
            }
        }
`
const FOODS = gql`
    query filterFood($branchID:ID!){
        filterFood(branchID: $branchID){
            id
            name
            price
            branchID
        }
    }
`

const ORDERS = gql`
    mutation newOrder($userName: String! $location: String! $phone: Int! $foodName: String! $price: Int! $count: Int!){
        newOrder(userName: $userName, location: $location, phone: $phone,
        foodName: $foodName, price: $price, count: $count){
            userName
            location
            phone
            foodName
            price
            count
        }
    }
`
    
    export{
        CATEGORY,
        RESTAURANT,
        BRANCHES,
        FOODS,
        ORDERS
    }
    