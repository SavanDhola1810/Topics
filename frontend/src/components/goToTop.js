


const GoToTop = (props) => {

    

   
  return (
    <div>
      
        <span className='p-4 rounded-full border-2 '  onClick={goToBtn} onScroll={handleScroll} style={{backgroundColor:"#4682A9",color:"#E9B384",borderColor:"#4682A9"}}>
            <FontAwesomeIcon icon={faArrowUp} size="2xl" bounce/>
        </span>
    </div>
  )
}

export default GoToTop
