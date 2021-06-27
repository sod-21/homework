import moment from 'moment';
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { customers } from '../model';

const filtered = (transactions) => {
    let res = {};
    transactions.map((item) => {
        let key = moment(item.createdAt).month() + "-" + item.customer_id.toString();
        if (!res[key]) {
            res[key] = {
                customer_id: item.customer_id,
                point: item.point,
                price: item.price                
            }
        } else {
            res[key].point += item.point;
            res[key].price += item.price;
        }
    });

    return res;
}

const filteredList = (filterd) => {
    let i = 0;
    return Object.keys(filterd).map((ind) => {

        let keys = ind.split("-");
        let item = filterd[ind];
        return (
            <>
                <tr className="transaction-item" key={ind}>
                    <td>{parseInt(keys[0]) + 1}</td>
                    <td>{customers[keys[1]].first_name} {customers[keys[1]].last_name}</td>
                    <td>${item.price}</td>
                    <td>{item.point}</td>
                </tr>
            </>
        )
    });    
}

const  ShowTransaction = () => {
    const transactions = useSelector( (state) => state.transactions);
    let total = 0;
    const filterd = filtered(transactions);

    return (
        <>
        <h2>Transaction List</h2>
        <div className="transaction-wrapper">
            <table className="transaction">
                <thead>
                    <tr>
                        <th>
                            Id
                        </th>
                        <th>
                            Name
                        </th>
                        <th>
                            Order price
                        </th>
                        <th>
                            Reward point
                        </th>
                        <th>
                            Date
                        </th>
                    </tr>            
                </thead>
                <tbody>
                    {
                    
                    transactions.map((t, index) => {
                        total += t.point;
                        return (
                        <tr key={index}>
                            <td>
                            {t.id + 1}
                            </td>
                            <td>
                                {customers[t.customer_id].first_name} {customers[t.customer_id].last_name}
                           
                            </td>
                            <td>
                                ${t.price}
                            </td>
                            <td>
                                {t.point}
                            </td>
                            <td>
                                {t.createdAt}
                            </td>
                        </tr>                
                    ); })
                }
                </tbody>
            </table>
            
        </div>
      
        <div className="filtered-wrapper">
            <h4>
                Total: {total}
            </h4>
            <table  className="transaction">
                <thead>
                    <tr>
                        <th>
                            Month
                        </th>
                        <th>
                            Name
                        </th>
                        <th>
                            Order Price
                        </th>
                        <th>
                            Point
                        </th>
                    </tr>
                </thead>
                <tbody>
            {
                filteredList(filterd)
            }
            </tbody>
            </table>
        </div>
       </>
    )
}


export default ShowTransaction;