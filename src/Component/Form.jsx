import axios from "axios";

const Form = () => {
    const handleForm = async (e) =>{
        e.preventDefault();
        const form = e.target;
        const todo = form.todo.value;
        const newToDo = {todo};

        try {
            const res = await axios.post('http://localhost:3000/todos', newToDo,{
                headers: {
                    "Content-Type" : "application/json"
                }
            })
            console.log(res.data)
            form.reset();
        } catch (error) {
            console.log(error.message)
        }
    }
    return (
        <div className='w-full h-screen bg-no-repeat bg-center bg-cover'>
            <div className='container mx-auto p-6'>
                <div>
                    <form onSubmit={handleForm} className='flex w-2/4 mx-auto gap-2'>
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
                <div className='bg-[#E7F7FD] p-8 rounded-lg max-w-7xl my-8 mx-auto'>
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
                    </div>
                    {/* To - do list end */}
                    {/* To - do footer start */}
                    <div className='flex justify-between items-center p-4 sticky bottom-0 left-0 w-full font-semibold text-black'>
                        <div className='text-teal-900'>Count = 10</div>
                        <div className='text-sm'>
                            <span className='uppercase m-1 cursor-pointer'>All</span>
                            <span className='uppercase m-1 cursor-pointer'>Complete</span>
                            <span className='uppercase m-1 cursor-pointer'> Incomplete</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Form;