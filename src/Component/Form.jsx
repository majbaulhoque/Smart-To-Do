import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Form = () => {
    const [todos, setTodos] = useState([])
    const handleForm = async (e) => {
        e.preventDefault();
        const form = e.target;
        const todo = form.todo.value.trim();

        if (!todo) {
            toast.error("Please enter a valid todo!");
            return;
        }

        try {
            const res = await axios.post('http://localhost:5000/todos', { todo });

            if (res.data.insertedId) {
                toast.success("Todo added successfully!");
                form.reset();
            }
        } catch (error) {
            toast.error("Failed to add Todo!", error);
        }
    };

    const getTodos = async () => {
        try {
            const res = await axios.get('http://localhost:5000/todos')
            setTodos(res.data)
        } catch (error) {
            toast.error(error)
        }
    }

    useEffect(() => {
        getTodos()
    }, [])

    return (
        <div className='w-full h-screen bg-no-repeat bg-center bg-cover'>
            <div className='container mx-auto p-6'>
                <form onSubmit={handleForm} className='flex w-2/4 mx-auto gap-2'>
                    <input
                        type="text"
                        name='todo'
                        className='w-4/5 p-2 rounded-lg bg-zinc-100 outline-3 outline-offset-2 focus:outline-teal-400 caret-teal-400'
                        placeholder="Enter your todo..."
                    />
                    <button
                        type='submit'
                        className='bg-teal-500 rounded-lg capitalize cursor-pointer text-white active:scale-95 md:w-1/5 font-semibold'
                    >
                        Add Todo
                    </button>
                </form>

                {/* To Do List Start */}
                <div className='bg-[#E7F7FD] p-8 rounded-lg max-w-7xl my-8 mx-auto'>
                    <h2 className='text-center text-2xl capitalize'>To-Do List</h2>
                    <div className='h-[350px] overflow-auto'>
                        {
                            todos?.map((eachTodo, idx) => {
                                const { _id, todo } = eachTodo || {};
                                return (
                                    <div key={_id} className='shadow p-4 m-2 flex gap-3 cursor-pointer hover:shadow-xl relative group/item'>
                                        <input type="checkbox" className='w-4 h-4 accent-teal-500 rounded-lg cursor-pointer mt-1' />
                                        <div className='px-4'>{idx + 1} <span className="ml-10">Todo</span></div>
                                        <div className='px-4 mx-4'>{todo}</div>
                                        <div className='flex gap-7 absolute right-10 invisible group-hover/item:visible'>
                                            <i className='fa-solid fa-trash'></i>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>

                    {/* To - do footer */}
                    <div className='flex justify-between items-center p-4 sticky bottom-0 left-0 w-full font-semibold text-black'>
                        <div className='text-teal-900'>Count {todos.length}</div>
                        <div className='text-sm'>
                            <span className='uppercase m-1 cursor-pointer'>All</span>
                            <span className='uppercase m-1 cursor-pointer'>Complete</span>
                            <span className='uppercase m-1 cursor-pointer'>Incomplete</span>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Form;
