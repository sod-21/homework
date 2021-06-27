import moment from "moment";

const calculatePoints = (price) => {
    if (price >= 50 && price < 100) {
        return price - 50;
    } else if (price > 100) {
        return ( 2 * (price - 100) + 50);
    }

    return 0;
}

/**
    
    transaction id
    transaction customer id    
    transaction price
    transaction reword points
    transaction date

*/


const createDummyTransaction = (id, createdAt) => {
    const customer_id = Math.round(Math.random() * 1000) % 10;
    const price = Math.floor(Math.random() * 1000) + 100;
    const point = calculatePoints(price);

    return {
        id,
        customer_id,
        price,
        point,
        createdAt: createdAt
    }
}

const createDumyList = () => {
    let dt = moment();
    let before3month = moment().subtract(2, 'months');
    
    let days = Math.abs(Math.floor(moment.duration( before3month.diff(dt)).asDays()));
    
    let transactions = [];
    for (var i = 0; i < days; i++ ) {
        transactions.push(createDummyTransaction(
            i,
            before3month.add(1, 'd').format("MM/DD/YYYY")
        ));
    }
    
    return transactions;
}

const initialState = createDumyList();

export default function transactions( state = initialState, action) {    

    return state;
}