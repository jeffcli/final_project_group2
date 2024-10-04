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
        const dateString = date.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
        if (title.trim() && text.trim()) {
            setEntries(prevEntries => {
                const newEntries = { ...prevEntries };
                if (!newEntries[dateString]) {
                    newEntries[dateString] = [];
                }
                newEntries[dateString].push({ title, text });
                return newEntries;
            });
            setTitle('');
            setText('');
            setIsTyping(false);
        }
    };

    const handleDateChange = (newDate: Date) => {
        setDate(newDate);
        setExpandedEntryIndex(null); // Reset expanded index when changing date
    };

    const handleDeleteEntry = (entryIndex: number) => {
        const dateString = date.toISOString().split('T')[0];
        setEntries(prevEntries => {
            const newEntries = { ...prevEntries };
            if (newEntries[dateString]) {
                newEntries[dateString] = newEntries[dateString].filter((_, index) => index !== entryIndex);
                if (newEntries[dateString].length === 0) {
                    delete newEntries[dateString]; // Remove date if no entries left
                }
            }
            return newEntries;
        });
    };

    const toggleEntry = (index: number) => {
        setExpandedEntryIndex(expandedEntryIndex === index ? null : index);
    };

    const dateString = date.toISOString().split('T')[0]; // Format current date

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Thoughts of the day</h1>

            <Calendar
                onChange={handleDateChange}
                value={date}
                className="mb-4"
            />

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
                    Add Entry
                </button>
            </form>
            <h2 className="mt-6 text-xl font-semibold">Entries</h2>
            <ul className="mt-2 space-y-2">
                {(entries[dateString] || []).map(({ title, text }, index) => (
                    <li key={index} className="p-4 bg-gray-100 rounded-md">
                        <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleEntry(index)}>
                            <strong>{title}</strong>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevent triggering toggle on button click
                                    handleDeleteEntry(index);
                                }}
                                className="ml-4 text-red-600 hover:text-red-800"
                            >
                                Delete
                            </button>
                        </div>
                        {expandedEntryIndex === index && (
                            <div className="mt-2 p-2 border rounded-md bg-white">
                                {text}
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}