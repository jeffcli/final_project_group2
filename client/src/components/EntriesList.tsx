import {useState} from 'react';
import {MakeProtectedPostRequest} from '@/utils/makeProtectedPostRequest';
import {useAuth0} from '@auth0/auth0-react';
import {Button} from '../components/ui/button';
import {formatDate} from '@/utils/formatDate';

interface Entry {
    _id: string;
    title: string;
    entry: string;
    dateCreated: string;
}

interface EntriesListProps {
    entries: Entry[];
    expandedEntryIndex: number | null;
    toggleEntry: (index: number) => void;
    editingIndex: number | null;
    setEditingIndex: (index: number | null) => void;
    handleEditEntry: (index: number, newTitle: string, newText: string) => void;
    handleDeleteEntry: (index: number) => void;
    getEntries: () => Promise<void>;
}

const EntriesList: React.FC<EntriesListProps> = ({
                                                     entries,
                                                     expandedEntryIndex,
                                                     toggleEntry,
                                                     editingIndex,
                                                     setEditingIndex,
                                                     handleEditEntry,
                                                     handleDeleteEntry,
                                                     getEntries,
                                                 }) => {
    const [editedTitle, setEditedTitle] = useState<string>('');
    const [editedText, setEditedText] = useState<string>('');

    const handleEditStart = (index: number) => {
        setEditingIndex(index);
        setEditedTitle(entries[index].title);
        setEditedText(entries[index].entry);
    };

    const {getAccessTokenSilently} = useAuth0();

    const removeEntry = async (entryId: string, index: number) => {
        handleDeleteEntry(index);
        try {
            const token = await getAccessTokenSilently();
            const bodyData = {_id: entryId};
            await MakeProtectedPostRequest('/api/deleteEntry', bodyData, token);
            await getEntries(); // Ensure this updates the entries state
        } catch (e) {
            console.log("Error removing entry: ", e);
        }
    };

    const handleSave = async (index: number) => {
        await handleEditEntry(index, editedTitle, editedText);
        setEditingIndex(null);
    };

    return (
        <div>
            <h2 className="text-2xl">Entries:</h2>
            <ul className="mt-4">
                {Array.isArray(entries) && entries.length === 0 ? (
                    <p>No entries found.</p>
                ) : (
                    entries.map((entry, index) => (
                        <li key={entry._id} className="p-4 bg-gray-100 rounded-md mt-2"> {/* Use _id as key */}
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
                                        <Button
                                            onClick={() => handleSave(index)}
                                            className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700 mr-2"
                                        >
                                            Save
                                        </Button>
                                        <Button
                                            onClick={() => setEditingIndex(null)}
                                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex justify-between items-center">
                                    <div className="flex-1">
                                        <strong
                                            className="cursor-pointer hover:text-blue-500"
                                            onClick={() => toggleEntry(index)}
                                        >
                                            {entry.title || 'Untitled'}
                                        </strong>
                                    </div>
                                    <div className="flex-1 text-sm text-gray-500 flex items-center">
                                        {formatDate(entry.dateCreated)}
                                    </div>
                                    <div className="flex items-center">
                                        <Button
                                            onClick={() => handleEditStart(index)}
                                            className="text-white-600 bg-red mr-2"
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            onClick={() => removeEntry(entry._id, index)}
                                            className="text-white bg-red-600 hover:bg-red-700"
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            )}
                            {expandedEntryIndex === index && (
                                <div className="mt-2 p-2 border rounded-md bg-white">
                                    <p>{entry.entry || 'No content available.'}</p>
                                </div>
                            )}
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default EntriesList;