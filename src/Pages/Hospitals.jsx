import React, { useContext, useEffect, useState } from 'react'
import { HiOutlineArrowNarrowRight } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import HospitalContext from '../Context/Hospital/HospitalContext'

const Hospitals = () => {

	const hospitalcontext = useContext(HospitalContext)
	const { getHospital, getCities } = hospitalcontext

	const [Hospitals, setHospitals] = useState({})
	const [Cities, setCities] = useState([])

	const [disSel, setDisSel] = useState("")

	useEffect(() => {
		(
			async () => {
				const res = await getCities()
				setCities(res.Cities)
			}
		)()
	}, [])

	const handleChangeDis = (e) => setDisSel(e.target.value)

	const handleSubmit = async () => {
		const res = await getHospital(disSel)
		if (res.Success) {
			setHospitals(res.Hospital)
		}
	}


	return (
		<main className='w-full flex flex-col justify-center '>
			<h2 className='text-3xl text-center pb-8 font-bold'>Find Hospitals</h2>
			<div className='flex flex-col justify-center py-8  border-2 mx-6 rounded-md'>

				<div className='dropdowns flex flex-row lg:gap-24 justify-center items-center sm:flex-row sm:gap-10 md:flex-row md:gap-10'>
					<div class="relative inline-block text-center">
						<div class="sm:col-span-3">
							<div class="">
								<select id="ward" name="ward" autocomplete="ward" class="bg-white pl-4 block w-full rounded-md border py-2 px-4 text-gray-900 shadow-sm sm:max-w-xs sm:text-sm sm:leading-6 font-semibold">
									<option className='px-4 font-semibold'>--- Select State ---</option>
									<option className='px-4 font-semibold' selected>Karnataka</option>
								</select>
							</div>
						</div>
					</div>

					<div class="relative inline-block text-center">
						<div class="sm:col-span-3">
							<div class="">
								<select id="ward" name="ward" autocomplete="ward" class="bg-white pl-4 block w-full rounded-md border py-2 px-4 text-gray-900 shadow-sm sm:max-w-xs sm:text-sm sm:leading-6 font-semibold" onChange={handleChangeDis}>
									<option className='px-4 font-semibold' selected>--- Select District ---</option>
									{
										Cities.map((item) => {
											return (
												<option key={item} className='px-4 font-semibold' value={item} onClick={handleChangeDis}>{item}</option>
											)
										})
									}
								</select>
							</div>
						</div>
					</div>

				</div>
				<div className='relative inline-block text-center mt-4'>
					<button type='button' className="inline-flex text-white bg-blue-700 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded text-sm font-semibold" onClick={handleSubmit}>Submit</button>
				</div>
			</div>

			<div className='border-2 rounded-md mt-4 mx-6 py-6 pb-8 flex flex-col justify-center items-center'>
				<h2 className='text-xl pb-6 italic text-blue-500'>Results for your selection</h2>

				<div className='grid grid-cols-3 gap-x-8 gap-y-4 px-4'>

					{
						Object.entries(Hospitals).map((key, value) => {
							return (
								<div key={key} class="flex border-2 rounded-md py-4 px-6">
									<Link to={`/hospital/${Hospitals[value]._id}`}>
										<div className='flex-grow'>
											<h2 class="title-font font-medium text-lg text-gray-900">{Hospitals[value].name}</h2>
											<h3 class="text-gray-500 mb-3">{Hospitals[value].city}, {Hospitals[value].state}</h3>
											<div class="inline-flex gap-6 pt-2 ">
												<div class="text-gray-500 text-base">
													<p className='text-blue-500'>Total Bed</p>
													<span>20</span>
												</div>
												<div class="text-gray-400">
													<p className='text-green-500'>Bed Vacant</p>
													<span>Total</span>
												</div>
												<div class="text-gray-700">
													<p className='text-red-500'>Bed Occupied</p>
													<span>Total</span>
												</div>
											</div>
											<div className='px-2 pt-2'>
												<span className='flex justify-end'><HiOutlineArrowNarrowRight size={20} color={"blue"} className="hover:cursor-pointer" /></span>
											</div>
										</div>
									</Link>
								</div>
							)
						})
					}



				</div>

			</div>

		</main>
	)
}

export default Hospitals