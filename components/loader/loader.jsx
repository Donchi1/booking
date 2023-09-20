import { Hypnosis } from "react-cssfx-loading";

function Loader() {
  return (
    <div className="flex
    justify-center
    items-center
    h-screen
    w-full
    bg-[rgb(253, 248, 248)]
    z-50
    absolute
    top-0
    right-0
    left-0">
        
        <div className="h-full">

        <Hypnosis className='loader' color="#ff6600" width="130px" height="130px" duration="3s" />
       
        </div>
    </div>
  )
}

export default Loader