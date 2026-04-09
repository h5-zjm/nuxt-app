const handleClick=(key:string,cb:()=>void):void => {
    const trigger=(e:KeyboardEvent)=>{
        if(e.key===key){
            cb()
        }
    }
    onMounted(()=>{
        document.addEventListener('keydown',trigger)
    })
    onUnmounted(()=>{
        document.removeEventListener('keydown',trigger)
    })
}
export default handleClick;
