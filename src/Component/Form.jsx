import axios from "axios";
import { useEffect, useState } from "react";
import { MdAdd, MdCheck, MdDelete, MdEdit } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Form = () => {
    const [todos, setTodos] = useState([]);
    const [editingTodo, setEditingTodo] = useState(null);
    const [editedText, setEditedText] = useState("");

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

    // Handle Todo Update
    const handleTodoUpdate = async () => {
        if (!editedText.trim()) {
            toast.error("Please enter a valid todo!");
            return;
        }

        try {
            const res = await axios.put(`http://localhost:5000/todosUpdate/${editingTodo._id}`, {
                todo: editedText
            });
            if (res.data.modifiedCount > 0) {
                toast.success("Todo updated successfully!");
                getTodos();
                setEditingTodo(null);
                setEditedText("");
            }
        } catch (error) {
            toast.error("Failed to update todo: " + error.message);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-400 via-blue-300 to-cyan-200">
            <div className="container mx-auto px-4 py-12">
                {/* Form Section */}
                <div className="max-w-2xl mx-auto mb-12">
                    <h1 className="text-4xl font-bold text-center text-white mb-8 drop-shadow-md">
                        ✨ Todo Master
                    </h1>
                    <form
                        onSubmit={handleForm}
                        className="flex gap-4 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-xl border border-white/20"
                    >
                        <input
                            type="text"
                            name="todo"
                            className="w-full px-6 py-4 text-lg rounded-xl border-2 border-teal-100 focus:outline-none focus:ring-4 focus:ring-teal-500/100 transition-all placeholder:text-black"
                            placeholder="📝 What's your next mission?"
                        />
                        <button
                            type="submit"
                            className="px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-semibold rounded-xl hover:from-teal-600 hover:to-cyan-700 transition-all transform hover:scale-105 active:scale-95 shadow-lg flex items-center gap-2"
                        >
                            <MdAdd className="w-5 h-5" /> Add
                        </button>
                    </form>
                </div>

                {/* Todo List Section */}
                <div className="max-w-3xl mx-auto">
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
                        <h2 className="text-2xl font-bold text-teal-800 mb-6 px-4">
                            🚀 Current Tasks ({todos.length})
                        </h2>

                        <div className="space-y-3">
                            {todos?.map((eachTodo, idx) => {
                                const { _id, todo } = eachTodo || {};
                                return (
                                    <div
                                        key={_id}
                                        className="group flex items-center justify-between px-6 py-4 bg-white hover:bg-teal-50 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md border-l-4 border-teal-200 hover:border-teal-400"
                                    >
                                        <div className="flex items-center gap-4 ">
                                            <input type="checkbox" className="w-4 h-4 accent-teal-500" />
                                            <span className="text-lg text-gray-800">{idx + 1}. {todo}</span>
                                        </div>
                                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                                            <button
                                                onClick={() => {
                                                    setEditingTodo(eachTodo)
                                                    setEditedText(todo)
                                                }}
                                                className="p-2.5 bg-teal-100 hover:bg-teal-200 text-teal-700 rounded-lg transition-colors transform hover:scale-110"
                                            >
                                                <MdEdit className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => handleTodoDelete(_id)}
                                                className="p-2.5 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-colors transform hover:scale-110"
                                            >
                                                <MdDelete className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Footer */}
                        <div className="mt-6 pt-4 border-t border-teal-100/50">
                            <div className="flex justify-between items-center px-4">
                                <span className="text-sm text-gray-500 font-medium">
                                    🎯 {todos.length} tasks remaining
                                </span>
                                <button className="text-sm bg-gradient-to-r from-red-400 to-pink-500 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity font-medium shadow-md">
                                    Clear Completed
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Modal */}
            {editingTodo && (
                <div className="fixed inset-0 bg-teal-900/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md border border-white/20 shadow-2xl">
                        <h2 className="text-2xl font-bold mb-4 text-teal-800">✏️ Edit Task</h2>
                        <input
                            type="text"
                            value={editedText}
                            onChange={(e) => setEditedText(e.target.value)}
                            className="w-full px-4 py-3 border-2 border-teal-100 rounded-xl mb-4 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-200 transition-all"
                            placeholder="Revise your task..."
                            autoFocus
                        />
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => {
                                    setEditingTodo(null);
                                    setEditedText("");
                                }}
                                className="px-4 py-2.5 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleTodoUpdate}
                                className="px-4 py-2.5 bg-gradient-to-r from-teal-400 to-cyan-500 text-white rounded-lg hover:opacity-90 transition-opacity font-medium shadow-md flex items-center gap-2"
                            >
                                <MdCheck className="w-5 h-5" />
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                toastClassName="!bg-teal-50 !text-teal-900 !rounded-xl !border !border-teal-100 !shadow-lg"
                bodyClassName="!font-medium"
                progressClassName="!bg-gradient-to-r from-teal-400 to-cyan-500"
            />
        </div>
    );
};

export default Form;
