import { useState } from "react";
import CreateChartModal from "./CreateChartModal";
import VisualGraph from "./VisualGraph";
import styles from "../styles/Dashboard.module.css";

export default function Dashboard(){
    const [showModal, setShowModal] = useState(false);
    const [chartData, setChartData] = useState([
        {temperature: undefined, time: undefined}
    ]);
    const [currentSelection, setCurrentSelection] = useState(undefined);

    return(
        <>
            <div className={styles['dashboard-wrapper']}>
                <div className={styles['dashboard-wrapper__dashboard']}>
                    <button onClick={()=>setShowModal(true)} className={styles['dashboard-wrapper__dashboard--create-view-btn']}>Create View</button>
                    {
                        currentSelection && 
                        <div className="self-center w-full lg:w-3/5">
                            <VisualGraph {...{chartData, currentSelection}}/>
                        </div>
                    }
                </div>
            </div>
            {/* Modal component */}
            {showModal && <CreateChartModal {...{showModal, setShowModal, setChartData, setCurrentSelection}}/>}
        </>
    );
}