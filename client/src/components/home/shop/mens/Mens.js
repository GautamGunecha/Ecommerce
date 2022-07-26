import React, { useEffect, useState } from 'react'
import "./Mens.css"
import axios from 'axios'
import { url } from '../../../../redux/utils/url'
import { Link } from 'react-router-dom'

const Mens = ({ title }) =>
{
    const [data, setData] = useState([])
    const fetchData = async () =>
    {
        await axios.get(`${url}/products?category=mens`)
            .then(res => setData(res.data))
            .catch(err => setData([]))
    }

    useEffect(() =>
    {
        fetchData()
    }, [])
    return (
        <div className='mensSection'>
            <p>{title}</p>
            <section className='mens-category'>
                {data.map(item => (
                    <Link key={item._id} to={`/product/page/${item._id}`}>
                        <img className='mens-img' src={item.img} alt={item.title} />
                    </Link>
                ))}
            </section>
        </div>
    )
}

export default Mens