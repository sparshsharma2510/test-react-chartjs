export default function ChartOption({chartName, optionIdx, setSelectedChart, setCurrentStep}){
    let imageSrc = '/bar-chart.jpg';
    if(optionIdx === 2)
        imageSrc = '/line-chart.jpg';
    else if(optionIdx === 3)
        imageSrc = '/scatter-chart.jpg';

    return(
        <button onClick={()=>{setSelectedChart(optionIdx); setCurrentStep(2)}} className='flex items-center w-full p-4 border border-transparent rounded-lg outline-none bg-light-200 hover:border-primary-200'>
            <img className='mr-5 rounded-lg' src={imageSrc} alt='bar graph' width={60}></img>
            <p>{chartName}</p>
        </button>
    );
}