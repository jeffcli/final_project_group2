import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

interface Entry {
    title: string;
    text: string;
}

export default function NotebookPage() {
    const [title, setTitle] = useState<string>('');
    const [text, setText] = useState<string>('');
    const [entries, setEntries] = useState<{ [key: string]: Entry[] }>({});
    const [date, setDate] = useState<Date>(new Date());
    const [isTyping, setIsTyping] = useState<boolean>(false);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [expandedEntryIndex, setExpandedEntryIndex] = useState<number | null>(null);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
        setIsTyping(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const dateString = date.toISOString().split('T')[0];
        if (title.trim() && text.trim()) {
            setEntries(prevEntries => {
                const newEntries = { ...prevEntries };
                if (!newEntries[dateString]) {
                    newEntries[dateString] = [];
                }
                if (editingIndex !== null) {

                    newEntries[dateString][editingIndex] = { title, text };
                } else {

                    newEntries[dateString].push({ title, text });
                }
                return newEntries;
            });
            resetForm();
        }
    };

    const resetForm = () => {
        setTitle('');
        setText('');
        setIsTyping(false);
        setEditingIndex(null);
    };

    const handleDateChange = (newDate: Date) => {
        setDate(newDate);
        resetForm();
        setExpandedEntryIndex(null);
    };

    const handleDeleteEntry = (entryIndex: number) => {
        const dateString = date.toISOString().split('T')[0];
        setEntries(prevEntries => {
            const newEntries = { ...prevEntries };
            if (newEntries[dateString]) {
                newEntries[dateString] = newEntries[dateString].filter((_, index) => index !== entryIndex);
                if (newEntries[dateString].length === 0) {
                    delete newEntries[dateString];
                }
            }
            return newEntries;
        });
    };

    const toggleEntry = (index: number) => {
        setExpandedEntryIndex(expandedEntryIndex === index ? null : index);
    };

    const handleEditEntry = (index: number) => {
        const dateString = date.toISOString().split('T')[0];
        const entryToEdit = entries[dateString][index];
        if (entryToEdit) {
            setTitle(entryToEdit.title);
            setText(entryToEdit.text);
            setEditingIndex(index);
        }
    };

    const dateString = date.toISOString().split('T')[0];

    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md font-sans">
            <h1 className="text-center text-2xl font-bold mb-4">Thoughts of the day</h1>

            <div className="flex justify-center mb-4">
                <Calendar
                    onChange={handleDateChange}
                    value={date}
                    className="w-full max-w-xs"
                />
            </div>

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <input
                        type="text"
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={title}
                        onChange={handleTitleChange}
                        placeholder="Entry Title"
                    />
                </div>
                <div className="relative">
                    <textarea
                        className="w-full h-32 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={text}
                        onChange={handleTextChange}
                        placeholder={!isTyping ? "Write your journal entry..." : ""}
                    />
                </div>
                <button
                    type="submit"
                    className="mt-2 px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                >
                    {'Add Entry'}
                </button>
            </form>
            <h2 className="mt-6 text-xl font-semibold">Entries for {date.toLocaleDateString()}:</h2>
            <ul className="mt-2 space-y-2">
                {(entries[dateString] || []).map((entry, index) => (
                    <li key={index} className="p-4 bg-gray-100 rounded-md">
                        {editingIndex === index ? (
                            <div className="flex flex-col">
                                <input
                                    type="text"
                                    value={entry.title}
                                    onChange={(e) => {
                                        const newTitle = e.target.value;
                                        setEntries(prevEntries => {
                                            const newEntries = {...prevEntries};
                                            if (!newEntries[dateString]) {
                                                newEntries[dateString] = [];
                                            }
                                            newEntries[dateString][index] = {
                                                ...newEntries[dateString][index],
                                                title: newTitle
                                            };
                                            return newEntries;
                                        });
                                    }}
                                    className="mb-2 p-1 border rounded-md"
                                    placeholder="Edit Title"
                                />
                                <textarea
                                    value={entry.text}
                                    onChange={(e) => {
                                        const newText = e.target.value;
                                        setEntries(prevEntries => {
                                            const newEntries = {...prevEntries};
                                            if (!newEntries[dateString]) {
                                                newEntries[dateString] = [];
                                            }
                                            newEntries[dateString][index] = {
                                                ...newEntries[dateString][index],
                                                text: newText
                                            };
                                            return newEntries;
                                        });
                                    }}
                                    className="h-24 p-1 border rounded-md"
                                    placeholder="Edit Text"
                                />
                                <div className="flex justify-end mt-2">
                                    <button
                                        onClick={() => {
                                            // Directly save the entry
                                            setEditingIndex(null);
                                        }}
                                        className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700 mr-2"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={() => setEditingIndex(null)}
                                        className="px-4 py-2 text-red-600 rounded hover:text-red-800"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex justify-between items-center">
                                <strong
                                    className="cursor-pointer"
                                    onClick={() => toggleEntry(index)}
                                >
                                    {entry.title}
                                </strong>
                                <div>
                                    <button
                                        onClick={() => handleEditEntry(index)}
                                        className="text-blue-600 hover:text-blue-800 mr-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteEntry(index)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        )}
                        {expandedEntryIndex === index && editingIndex !== index && (
                            <div className="mt-2 p-2 border rounded-md bg-white">
                                {entry.text}
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}