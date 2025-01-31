
import './App.css'

function App() {
  

  return (
    <div className='w-full h-screen bg-no-repeat bg-center bg-cover'>
      <div className='container mx-auto p-6'>
        <div>
          <form className='flex w-2/4 mx-auto gap-2'>
            <input 
              type="text"
              name='todo'
              className='w-4/5 p-2 rounded-lg bg-zinc-100 outline-3 outline-offset-2 focus:outline-teal-400 caret-teal-400'
            />
            <button 
              type='submit'
              className='bg-teal-500 rounded-lg capitalize cursor-pointer text-white active:scale-95 md:w-1/5 font-semibold'
            >
              Add Todo
            </button>
          </form>
        </div>
        {/* To Do List Start */}
        <div className='bg-[rgba(224, 242, 254,0.70)] p-8 rounded-lg w-11/12 my-4'>
          <h2 className='text-center text-2xl capitalize'>To-Do List</h2>
          <div className='h-[350px] overflow-auto relative bg-scroll'>
            <div className='flex flex-col gap-1'>
              <div className='shadow p-4 m-2 flex gap-3 cursor-pointer hover:shadow-xl relative group/item'>
                <div>
                  <input type="checkbox"
                  defaultChecked="true"
                  className='w-4 h-4 accent-teal-500 rounded-lg cursor-pointer'
                  />
                </div>
                <div className='px-4'>01 - Todo</div>
                <div className='px-4 mx-4'>
                  text
                </div>
                <div className='flex gap-7 absolute right-10 invisible group-hover/item:visible'>
                  <i className='fa-solid fa-trash'></i>
                </div>
              </div>
            </div>
            {/* To - do list end */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
