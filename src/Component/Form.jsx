import axios from "axios";
import { useEffect, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Form = () => {
    const [todos, setTodos] = useState([]);

    // Handle form submission
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
                getTodos();  
            }
        } catch (error) {
            toast.error("Failed to add Todo!", error);
        }
    };

    // Fetch all todos 
    const getTodos = async () => {
        try {
            const res = await axios.get('http://localhost:5000/todos');
            setTodos(res.data);
        } catch (error) {
            toast.error(error);
        }
    };

    useEffect(() => {
        getTodos();
    }, []);

    // Handle todo deletion
    const handleTodoDelete = async (_id) => {
        console.log("Delete this todo", _id);
        try {
            const res = await axios.delete(`http://localhost:5000/todos/${_id}`);
            if (res.data.deletedCount > 0) {
                toast.success("Deleted successfully!");
                getTodos();  
            }
        } catch (error) {
            toast.error(error);
        }
    };

    return (
        <div className="w-full h-screen bg-gradient-to-r from-teal-300 to-teal-500">
            <div className="container mx-auto p-8">
                {/* Form for adding todos */}
                <form onSubmit={handleForm} className="flex w-full max-w-lg mx-auto gap-4 mb-8 bg-white p-6 rounded-lg shadow-lg">
                    <input
                        type="text"
                        name="todo"
                        className="w-full p-3 rounded-lg border-2 border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-400"
                        placeholder="Enter your todo..."
                    />
                    <button
                        type="submit"
                        className="bg-teal-500 text-white py-3 px-4 w-36 rounded-lg hover:bg-teal-600 transition-all duration-300"
                    >
                        Add Todo
                    </button>
                </form>

                {/* To Do List */}
                <div className="bg-white p-6 rounded-lg shadow-lg space-y-4">
                    <h2 className="text-2xl font-semibold text-center text-teal-600 mb-6">Your To-Do List</h2>
                    <div className="space-y-4">
                        {todos?.map((eachTodo, idx) => {
                            const { _id, todo } = eachTodo || {};
                            return (
                                <div key={_id} className="flex justify-between items-center p-4 border-b-2 border-gray-200 bg-[#E7F7FD] rounded-lg hover:bg-teal-100 transition-all duration-200 hover:border-teal-500 hover:shadow-xl">
                                    <div className="flex items-center gap-4">
                                        <input type="checkbox" className="w-4 h-4 accent-teal-500" />
                                        <span className="text-lg text-gray-800">{idx + 1}. {todo}</span>
                                    </div>
                                    <div className="flex gap-4">
                                        <button
                                            className="bg-teal-600 text-white p-2 rounded-full hover:bg-teal-700 transition-all duration-300"
                                        >
                                            <MdEdit className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => handleTodoDelete(_id)}
                                            className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-all duration-300"
                                        >
                                            <MdDelete className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-8 text-center text-lg font-semibold text-gray-700">
                    <div className="text-black font-semibold">Total Todos: {todos.length}</div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Form;
