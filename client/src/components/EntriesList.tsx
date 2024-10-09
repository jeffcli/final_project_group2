import { useState } from "react";
import {MakeProtectedPostRequest} from "@/utils/makeProtectedPostRequest.ts";
import {useAuth0} from "@auth0/auth0-react";

interface Entry {
    title: string;
    text: string;
    dateCreated: string;
}

interface EntriesListProps {
    entries: Entry[];
    expandedEntryIndex: number | null;
    toggleEntry: (index: number) => void;
    editingIndex: number | null;
    setEditingIndex: (index: number | null) => void;
    handleEditEntry: (index: number, newTitle: string, newText: string) => void;
    handleDeleteEntry: (entryIndex: number) => void;
}

const EntriesList: React.FC<EntriesListProps> = ({
                                                     entries,
                                                     expandedEntryIndex,
                                                     toggleEntry,
                                                     editingIndex,
                                                     setEditingIndex,
                                                     handleEditEntry,
                                                     handleDeleteEntry,
                                                 }) => {
    const [editedTitle, setEditedTitle] = useState<string>('');
    const [editedText, setEditedText] = useState<string>('');

    const handleEditStart = (index: number) => {
        setEditingIndex(index);
        setEditedTitle(entries[index].title);
        setEditedText(entries[index].text);
    };
    const {user, getAccessTokenSilently} = useAuth0();
    const removeEntry = async (entryId: string) => {
        try {
            const token = await getAccessTokenSilently();

            const bodyData = {
                _id: entryId
            };

            const data = await MakeProtectedPostRequest('/api/removeEntry', bodyData, token);
            props.getHabits();
        } catch (e) {
            console.log("Error removing habit: ", e);
        }
    }

    const handleSave = (index: number) => {
        handleEditEntry(index, editedTitle, editedText);
        setEditingIndex(null);
    };

    return (
        <div>
            <h2 className="text-2xl">Entries:</h2>
            <ul className="mt-4">
                {entries.map((entry, index) => (
                    <li key={index} className="p-4 bg-gray-100 rounded-md mt-2">
                        {editingIndex === index ? (
                            <div className="flex flex-col">
                                <input
                                    type="text"
                                    value={editedTitle}
                                    onChange={(e) => setEditedTitle(e.target.value)}
                                    className="mb-2 p-1 border rounded-md"
                                    placeholder="Edit Title"
                                />
                                <textarea
                                    value={editedText}
                                    onChange={(e) => setEditedText(e.target.value)}
                                    className="h-24 p-1 border rounded-md"
                                    placeholder="Edit Text"
                                />
                                <div className="flex justify-end mt-2">
                                    <button
                                        onClick={() => handleSave(index)}
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
                            <>
                                <div className="flex justify-between items-center">
                                    <strong
                                        className="cursor-pointer hover:text-blue-500"
                                        onClick={() => toggleEntry(index)}
                                    >
                                        {entry.title}
                                    </strong>
                                    <div className="text-sm text-gray-500">{entry.dateCreated}</div>
                                    <div>
                                        <button
                                            onClick={() => handleEditStart(index)}
                                            className="text-green-600 hover:text-green-800 mr-2"
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
                                {expandedEntryIndex === index && (
                                    <div className="mt-2 p-2 border rounded-md bg-white">
                                        <p>{entry.text}</p>
                                    </div>
                                )}
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EntriesList;