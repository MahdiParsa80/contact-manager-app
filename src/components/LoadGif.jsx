import spinner from '../contact-manager-app/assets/tri-spinner.gif'

const LoadGif =()=>{
    return(
        <>
            <img src={spinner} alt="loading" className='d-block m-auto w-[200px]' style={{Width:"200px"}}/>
        </>
    )
}
export default LoadGif