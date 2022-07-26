import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { url } from '../../../../redux/utils/url'

const Womens = () =>
{
    const [data, setData] = useState([])
    const fetchData = async () =>
    {
        await axios.get(`${url}/products?category=womens`)
            .then(res => setData(res.data))
            .catch(err => setData([]))
    }

    useEffect(() =>
    {
        fetchData()
    }, [])
    return (
        <div className='mensSection'>
            <p>Womens</p>
            <section className='mens-category'>
                {data.map(item => (
                    <Link key={item._id} to={`/product/page/${item._id}`}>
                        <img className='womens-img' src={item.img} alt="" />
                    </Link>
                ))}
            </section>
        </div>
    )
}

export default Womens