import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { url } from '../../../../../redux/utils/url'

const Sunglass = ({ title, target }) =>
{
    const [data, setData] = useState([])
    const fetchData = async () =>
    {
        await axios.get(`${url}/products?category=mens-glass`)
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
                    <Link target={target} key={item._id} to={`/product/page/${item._id}`}>
                        <img className='mens-img' src={item.img} alt={item.title} />
                    </Link>
                ))}
            </section>
        </div>
    )
}

export default Sunglass