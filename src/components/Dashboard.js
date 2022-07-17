import { useState } from "react";
import CreateChartModal from "./CreateChartModal";
import VisualGraph from "./VisualGraph";

export default function Dashboard(){
    const [showModal, setShowModal] = useState(false);
    const [chartData, setChartData] = useState([
        {temperature: 25, time: 5},
        {temperature: 28, time: 8},
        {temperature: 33, time: 11}
    ]);
    const [currentSelection, setCurrentSelection] = useState(undefined);

    return(
        <>
            <div className="flex justify-center w-full h-screen bg-light-200">
                <div className="w-full max-w-[1920px] pt-28 flex flex-col space-y-20 self-start justify-end px-16">
                    <button onClick={()=>setShowModal(true)} className="self-end px-8 py-2 font-medium text-white bg-blue-500 rounded-3xl">Create View</button>
                    {
                        currentSelection && 
                        <div className="self-center w-3/5">
                            <VisualGraph {...{chartData, currentSelection}}/>
                        </div>
                    }
                </div>
            </div>
            {showModal && <CreateChartModal {...{showModal, setShowModal, setChartData, setCurrentSelection}}/>}
        </>
    );
}