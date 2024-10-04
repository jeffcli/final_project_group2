import  { useState } from 'react';

export default function NotebookPage() {
    const [entry, setEntry] = useState<string>('');
    const [entries, setEntries] = useState<string[]>([]);

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEntry(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (entry.trim()) {
            setEntries([...entries, entry]);
            setEntry('');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Thoughts of the day</h1>
            <form onSubmit={handleSubmit}>
                <textarea
                    className="w-full h-32 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={entry}
                    onChange={handleInputChange}
                    placeholder="Write your journal entry..."
                />
                <button
                    type="submit"
                    className="mt-2 px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                >
                    Add Entry
                </button>
            </form>
            <h2 className="mt-6 text-xl font-semibold">Entries</h2>
            <ul className="mt-2 space-y-2">
                {entries.map((entry, index) => (
                    <li key={index} className="p-4 bg-gray-100 rounded-md">
                        {entry}
                    </li>
                ))}
            </ul>
        </div>
    );
}