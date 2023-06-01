import React from 'react'
import moment from 'moment'
import clsx from 'classnames'
import announcement from "assets/images/publications/announcement.png"
import { Calendar } from 'components/inputs'


const FilterModal = ({visible,onClose}:{visible:boolean,onClose:()=>void}) => {
    const [calendarVisible, setCalendarVisible] = React.useState(false)
    const [date, setDate] = React.useState(new Date())
    if(!visible)return null
    return(
        <div>
            <Calendar visible={calendarVisible}
            onClose={()=>setCalendarVisible(false)}
            onChange={_date => setDate(_date)}
            maxDate={new Date()}
            value={date}
            />
        <div
        onClick={()=>onClose()}
        className='fixed top-0 z-[100] left-0 w-full h-screen bg-black/[.7] border-[0.5px] border-[#9B9B9B] flex items-center justify-center'>
            <div
            onClick={e => e.stopPropagation()}
            className='bg-white border-[0.5px] border-[#9B9B9B] rounded-6 px-[13px] py-[15px]'>
                <span className='text-black font-bold text-12'>Filter</span>
                <div className='pt-[9px] flex items-center space-x-[77px]'>
                    <div
                    onClick={()=>setCalendarVisible(true)}
                    className='bg-white border-[0.2px] px-[11px] border-[#9B9B9B] rounded-sm w-[136px] h-[35px]'>
                        <span className='font-medium text-10 text-575555'>
                            {moment(date)?.format("DD/MM/YYYY")}
                        </span>
                    </div>
                    <button
                    onClick={()=>onClose()}
                    type="button" className='bg-black h-[35px] rounded-3 w-[110px] text-white font-bold text-12'>Confirm</button>
                </div>
            </div>
        </div>
        </div>
    )
}

const CommissionsChart = () => {
    return(
        <div className='pb-[30px]'>
            <div className='flex space-x-[14px] items-center mb-[10px]'>
                <p className='font-inter text-575555 text-10'>Commissions <span className='font-semibold'>Earned</span></p>
                <div className='flex space-x-1 items-center'>
                    <div className='h-2 w-2 rounded-full bg-7108F6'/>
                    <span className='text-10 text-575555'>Month Earnings</span>
                </div>
                <div className='flex space-x-1 items-center'>
                    <div className='h-2 w-2 rounded-full bg-DFC7FF'/>
                    <span className='text-10 text-575555'>Ranking Publication</span>
                </div>
            </div>
            <div className='flex flex-col space-y-[5px]'>
                <div className='w-[177px] px-[23px] bg-white shadow-[0_0px_5px_0px_rgba(0,0,0,0.25)] rounded-3 py-[14px] flex flex-col space-y-[13px]'>
                <div className='flex space-x-[10px] items-center'>
                    <div className='h-2 w-2 rounded-full bg-7108F6'/>
                    <span className='text-10 text-575555'>12,000</span>
                </div>
                <div className='flex space-x-[10px] items-center'>
                    <div className='h-2 w-2 rounded-full bg-DFC7FF'/>
                    <span className='text-10 text-575555'>Loss of document</span>
                </div>
                </div>
                <div className='h-[226px] bg-[red]'></div>
                <div className='mt-4 flex'>
                    <span className='ml-auto text-575555 text-10 font-inter'>Months</span>
                </div>
            </div>
            <div className='mt-[31px] p-4 shadow-[0_1px_1px_0_rgba(0,0,0,0.25)] flex space-x-[17px] rounded-3 bg-white'>
                <div className='flex flex-col space-y-[11px]'>
                    <span className='text-575555 text-10 font-inter'>Best Rated Month</span>
                    <span className='font-inter font-semibold text-12'>October</span>
                </div>
                <div className='flex flex-col space-y-[11px]'>
                    <span className='text-575555 text-10 font-inter'>Best Rated Publication</span>
                    <span className='font-inter font-semibold text-12'>Loss Of Document</span>
                </div>
                <div className='flex flex-col space-y-[11px]'>
                    <span className='text-575555 text-10 font-inter'>Gross Earnings</span>
                    <span className='font-inter font-semibold text-12'>30,000</span>
                </div>
            </div>
        </div>
    )
}

const CommissionsList = () => {
    const listed = [1,2,3,4,5,6]
    return(
        <div className='flex flex-col space-y-[10px]'>
            {listed.map((item,index) => (
                <div className='flex space-x-[11px] space-y-[5px]' key={index}>
                    <div className='w-[60px] h-[55px] rounded-6 relative overflow-hidden'>
                        <img src={announcement} className='h-full w-full absolute left-0 top-0' alt="announcement"/>
                    </div>
                    <div className='flex flex-col space-y-[17px]'>
                        <div className='flex space-x-[18px]'>
                            <span className='font-semibold text-10 text-black'>Change Of Name Affidavit</span>
                            <span className='font-inter text-10 text-black'>CON2345JHFHGHGH</span>
                            </div>
                            <div className='flex space-x-[18px]'>
                            <span className='text-10 text-575555'>01/02/03</span>
                            <span className='font-inter font-semibold text-10 text-black'>3000</span>
                            </div>
                        </div>
                </div>
            ))}
        </div>
    )
}

const CommissionsBreakdown = ({isList=true}:{isList?:boolean}) => {
    const [activeTab, setActiveTab] = React.useState<"self"|"agents">("self")
    const [showFilterModal, setShowFilterModal] = React.useState(false)
  return (
    <div>
        <FilterModal
        visible={showFilterModal}
        onClose={()=>setShowFilterModal(false)}
        />
        <div className='flex items-center justify-between'>
        <div className="flex items-center">
            <button className={clsx("text-575555 rounded-3 text-center text-10 leading-[16.74px] py-[6px] px-[18px]",{
                "!bg-[#EADAFF] !text-[#7600FF] font-bold":activeTab === "self"
            })}
            onClick={()=>setActiveTab("self")}
            >Earned By Self</button>
             <button className={clsx("text-575555 rounded-3 text-center text-10 leading-[16.74px] py-[6px] px-[18px]",{
                "!bg-[#EADAFF] !text-[#7600FF] font-bold":activeTab === "agents"
            })}
            onClick={()=>setActiveTab("agents")}
            >Earned Through Agents</button>
        </div>
            <button
             onClick={()=>setShowFilterModal(true)}
            className='bg-black h-[30px] text-[10px] font-semibold leading-[13px] text-center text-white rounded-[2px] px-[18px]'>Filter</button>
        </div>
        <div className='mt-[19px]'>
            {isList ? <CommissionsList/>:<CommissionsChart/>}
        </div>
    </div>
  )
}

export default CommissionsBreakdown