import React from 'react'
import './Coursel.css'
import { FiTruck, FiClock } from 'react-icons/fi'
import { MdAttachMoney } from 'react-icons/md'
import { AiOutlineReload } from 'react-icons/ai'
import courselData from '../../data/Coursel.json'


const Coursel = () =>
{
    return (
        <React.Fragment>
            <div className='coursel'>
                <div className='courselIcon'>
                    <FiTruck />
                </div>
                <div className='courselDescription'>
                    <div className='courselDescriptionHeader'>
                        <p>{courselData.delivery.type}</p>
                    </div>
                    <p className='courselDescriptionText'>{courselData.delivery.terms}</p>
                </div>

                <div className='courselIcon'>
                    {/* <IoReload /> */}
                    <AiOutlineReload />
                </div>
                <div className='courselDescription'>
                    <div className='courselDescriptionHeader'>
                        <p>{courselData.return.type}</p>
                    </div>
                    <p className='courselDescriptionText'>{courselData.return.terms}</p>
                </div>

                <div className='courselIcon'>
                    <FiClock />
                </div>
                <div className='courselDescription'>
                    <div className='courselDescriptionHeader'>
                        <p>{courselData.support.type}</p>
                    </div>
                    <p className='courselDescriptionText'>{courselData.support.terms}</p>
                </div>

                <div className='courselIcon'>
                    <MdAttachMoney />
                </div>
                <div className='courselDescription'>
                    <div className='courselDescriptionHeader'>
                        <p>{courselData.pricing.type}</p>
                    </div>
                    <p className='courselDescriptionText'>{courselData.pricing.terms}</p>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Coursel