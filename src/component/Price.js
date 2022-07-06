import React, { useEffect, useState } from 'react';
import Typewriter from "typewriter-effect";

function Price() {

    const InitState = () => {
        const val = "Select Date"
        return val
    }

    let text;
    var p

    const [items, setItem] = useState([])
    const [val, setValue] = useState(InitState)
    const [loaded, isLoaded] = useState(0)

    useEffect( () => {
        fetch("https://indianspices-api.herokuapp.com/cardamom/archieve")
        .then(response => response.json())
        .then((data) => {
                isLoaded(1)
                setItem(data)
            }
        )
    }, [])

    function Seletion(){
        return(
            <select id="date" onChange={(e) =>{
                const selected_sl = e.target.value
                setValue(String(selected_sl))
                }
                }>
                <option key="00" value="getDate">Choose Date</option>
                {items.map(item =>{
                    return (<option key={item.sl} value={item.sl}>{item.date}</option>)
                })}
            </select>
        )
    }

    function Details(){
            if(val !== "getDate"){
            items.map((item) => {

                function Det(){
                let dat = String(item.sl)

                if(dat === val){
                    text = <table>
                        <tbody>
                            <tr>
                                <td className='rig'>Date:</td>
                                <td>{item.date}</td>
                            </tr>
                            <tr>
                                <td className='rig'>Auctioneer: </td>
                                <td>{item.Auctioneer}</td>
                            </tr>
                            <tr>
                                <td className='rig'>Lots: </td>
                                <td>{item.Lots}</td>
                            </tr>
                            <tr>
                                <td className='rig'>Total Arrivals: </td>
                                <td>{item.Total_Arrived}</td>
                            </tr>
                            <tr>
                                <td className='rig'>Totaly Quantity Sold: </td>
                                <td>{item.Qty_Sold}</td>
                            </tr>
                            <tr>
                                <td className='rig'>Maximum Price: </td>
                                <td>{item.MaxPrice}</td>
                            </tr>
                            <tr>
                                <td className='rig'>Average Price: </td>
                                <td>{item.Avg_Price}</td>
                            </tr>
                        </tbody>
                    </table>

                }
                return text
            }
            p = Det()
            return null
            })
        }}

        Details()
        var x = Seletion()

        if(!loaded){
            return(
                <div className='main'>
                    <div className='load'>
                        <Typewriter 
                            options={{
                                strings: "Loading......",
                                autoStart: true,
                                loop: true

                            }}
                        />
                    </div>
                </div>
            )
        }
        else{
            return (
            <div className="main">
                <div className="selection">
                    {x}
                </div>
                <div className="details">
                    {p}
                </div>
            </div>
            )
        }
}

export default Price