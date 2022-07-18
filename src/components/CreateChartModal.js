import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import ChartOption from './ChartOption';

export default function CreateChartModal({showModal, setShowModal, setChartData, setCurrentSelection}) {
    const cancelButtonRef = useRef(null)
    const [currentStep, setCurrentStep] = useState(1);
    const [inputFieldData, setInputFieldData] = useState([{temperature: undefined, time: undefined}]);
    const [selectedChart, setSelectedChart] = useState(undefined);
    
    //Function to handle the temperature input changes
    const handleTemperatureChange = (e,index) => {
        setInputFieldData((prevState)=>{
            //Fetch the prevState values
            const newState = [...prevState];
            //Update the prevState with the newly entered temperature value
            //if undefined then replace with -32
            newState[index].temperature = e.target.value? Number(e.target.value):-32;
            return newState;
        });
    }

    //Function to handle the time input changes
    const handleTimeChange = (e,index) => {
        setInputFieldData((prevState)=>{
            const newState = [...prevState];
            //Update the prevState with the newly entered time value
            //if undefined then replace with 0
            newState[index].time = e.target.value? Number(e.target.value):0;
            return newState;
        });
    }
    //Function to handle the additon of data
    //Currently constrained to add 8 input fields only
    const handleAdditionOfData = () => {
        //Check if already reached the limit of input fields
        if(inputFieldData.length === 8){
            alert("Reached the max limit of 8 data fields");
            return;
        }  
        //Else add the new input field into the state
        setInputFieldData((prevState)=>{
            return [...prevState, {temperature: undefined, time: undefined}];
        })
    }
    //Function to handle the submmission of form
    const handleFormSubmission = (e) => {
        e.preventDefault();
        /* Pass the user data values up to dashboard states */
        setChartData(inputFieldData);
        setCurrentSelection(selectedChart);
        /* Flush the data values locally */
        setShowModal(false);
        setInputFieldData([{temperature: undefined, time: undefined}]);
    }

    //Map out all the data input fields on the screen
    const inputFields = inputFieldData.map((item, index)=>{
        return(
            <div key={index} className='flex w-full mt-3 space-x-5'>
                <input required onChange={(e)=> handleTemperatureChange(e,index)} type={"number"} className="w-full px-4 py-2 rounded-lg outline-none text-light-200 bg-dark-100 font-secondary" placeholder="Enter temp. (e.g. 28)" min={-32} max={54} step={0.1}/>
                <input required onChange={(e)=> handleTimeChange(e,index)} type={"number"} className="w-full px-4 py-2 rounded-lg outline-none text-light-200 bg-dark-100 font-secondary" placeholder="Enter time (e.g. 1500)" min={0} max={2400} step={1}/>
            </div>
        );
    });

    return (
        <Transition.Root show={showModal} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setShowModal}>
                {/* BG overlay */}
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-full p-4 text-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:max-w-lg sm:w-full">
                                <form onSubmit={handleFormSubmission} className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
                                    {/* Modal body */}
                                    <div className="sm:flex sm:items-start">
                                        <div className="w-full mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            {/* Modal heading */}
                                            <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                                {
                                                    currentStep === 1 ? 'Select the type of graph':'Enter the Data Values'
                                                }
                                            </Dialog.Title>
                                            {/* Modal content */}
                                            <div className="w-full mt-5">
                                                {
                                                    currentStep === 1?
                                                    // If current step is 1, then provide options to select graph
                                                    <div className='flex-col w-full space-y-5'>
                                                        <ChartOption {...{chartName: 'Bar Chart', optionIdx: 1,setSelectedChart, setCurrentStep}} />
                                                        <ChartOption {...{chartName: 'Line Chart', optionIdx: 2,setSelectedChart, setCurrentStep}} />
                                                        <ChartOption {...{chartName: 'Scatter Chart', optionIdx: 3,setSelectedChart, setCurrentStep}} />
                                                    </div>
                                                    :
                                                    // Else serve data fields
                                                    <div className='flex-col w-full'>
                                                        <div className='flex justify-between w-full'>
                                                            <span>Enter Temperature(°C)</span>
                                                            <span>Enter Time(in Hours Format)</span>
                                                        </div>
                                                        {inputFields}
                                                        <button 
                                                            onClick={()=> handleAdditionOfData()} 
                                                            className='flex items-center self-end p-4 outline-none w-fit text-dark-200'
                                                        >
                                                            <span className="p-1 mr-3 font-medium rounded-full bg-primary-200 hover:bg-primary-300 text-light-200 material-symbols-outlined">
                                                                add
                                                            </span>
                                                            Add More Data
                                                        </button>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    {/* CTA group */}
                                    <div className="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                            onClick={() => {setShowModal(false); setCurrentStep(1);}}
                                        >
                                            Cancel
                                        </button>
                                        { 
                                            currentStep === 1?
                                                null
                                                :
                                                <button
                                                    type="submit"
                                                    className="inline-flex justify-center w-full px-4 py-2 text-base font-medium border border-transparent rounded-md shadow-sm text-light-200 bg-primary-200 hover:bg-primary-300 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                                                >
                                                    Submit
                                                </button>
                                        }
                                    </div>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}