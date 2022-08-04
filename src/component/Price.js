import axios from 'axios';
import React, { useEffect, useState } from 'react';
// import Typewriter from "typewriter-effect";
import { FaAngleLeft } from "react-icons/fa";

function Price() {


    let text;
    var p;


    const [items, setItem] = useState([])
    const [getsl, setSl] = useState()
    const [val, setValue] = useState("Select Date")
    const [loaded, isLoaded] = useState(0)
    const [show, setShow] = useState(true)

    // const url = "https://indianspices-api.herokuapp.com/cardamom/archieve/all"
    const url = "https://indianspices-api.herokuapp.com/cardamom/archieve"
    

    useEffect(() => {
        axios.get(url)
            .then(res => {
                isLoaded(1)
                setItem(res.data)
            })
    }, [])

    const handleChange = e => {
        setValue(String(e.target.value))
    }

    const handleClick = e =>{
        setSl(e.target.value)
        setShow(false)
    }
    const toggleValue = e =>{
        var teg = e.target.value
        setShow(!teg)
    }
    
    function Seletion() {
        var tefd;
        return (
            <select id="date" onChange={handleChange}>
                <option key="none" value="getDate">Choose Date</option>
                {items.map(item => {
                    if(item.date === tefd){
                        return (<option key={item.sl} value={item.date}>{item.date}</option>)
                    }
                    else{
                        tefd = item.date
                    }
                    return null
                })}
            </select>
        )
    }

    function SetSL(){
        var tepf;
        var credf = [];
        var cref;
        if(val !== "getDate"){
            items.map(item =>{
                if(val === item.date){
                    tepf = item.sl
                    credf.push(tepf)   
                }
                return null
            })
    }
    credf.map(() => {
           cref = 
           <div className='btn'>
            <button className='li-btn' value={credf[0]} onClick={handleClick}>Auction 1</button><br /><br />
            <button className='li-btn' value={credf[1]} onClick={handleClick}>Auction 2</button>     
           </div>
           return null
        })
        return cref
    }

    function Details() {
        if (getsl !== "getDate") {
            items.map((item) => {

                function Det() {
                    let dat = String(item.sl)

                    if (dat === getsl) {
                        text =
                            <table>
                                <tbody>
                                    <tr>
                                        <td className='lef'>Date:</td>
                                        <td>{item.date}</td>
                                    </tr>
                                    <tr>
                                        <td className='lef'>Auctioneer: </td>
                                        <td>{item.Auctioneer}</td>
                                    </tr>
                                    <tr>
                                        <td className='lef'>Lots: </td>
                                        <td>{item.Lots}</td>
                                    </tr>
                                    <tr>
                                        <td className='lef'>Total Arrivals: </td>
                                        <td>{item.Total_Arrived}</td>
                                    </tr>
                                    <tr>
                                        <td className='lef'>Totaly Quantity Sold: </td>
                                        <td>{item.Qty_Sold}</td>
                                    </tr>
                                    <tr>
                                        <td className='lef'>Maximum Price: </td>
                                        <td>{item.MaxPrice}</td>
                                    </tr>
                                    <tr>
                                        <td className='lef'>Average Price: </td>
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
        }
    }

    Details()
    const x = Seletion()



    if (!loaded) {
        return (
            <div className='main'>
                <div className='rect'>
                    <div className='load'>
                    <div class="lds-facebook"><div></div><div></div><div></div></div>
                        {/* <Typewriter
                            options={{
                                strings: "Loading......",
                                autoStart: true,
                                loop: true
                            }}
                        /> */}
                    </div>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className="main">
                <div className='rect'>
                    {show?
                    <div id='selection'>
                        {x}
                        {SetSL()}
                    </div>
                    :null}
                    {!show?
                    <>
                        <button className='back-btn' value={show} onClick={toggleValue}><FaAngleLeft /></button>
                        <div className='details'>
                            {p}
                    </div>
                    </>
                    :null}
                </div>
            </div>
        )
    }
}

export default Price