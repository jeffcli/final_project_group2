import { useEffect, useState } from "react";
import CalendarSection from "../components/CalendarSection";
import EntriesList from "../components/EntriesList";
import JournalEntryForm from "../components/JournalEntryForm";
import { MakeProtectedPostRequest } from "@/utils/makeProtectedPostRequest.ts";
import { useAuth0 } from "@auth0/auth0-react";

interface Entry {
    _id: string;
    title: string;
    entry: string;
    dateCreated: string;
}

export default function NotebookPage() {
    const { user, getAccessTokenSilently } = useAuth0();
    const [userEntries, setUserEntries] = useState<Entry[]>([]);
    const [title, setTitle] = useState<string>('');
    const [text, setText] = useState<string>('');
    const [date, setDate] = useState<Date>(new Date());
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [expandedEntryIndex, setExpandedEntryIndex] = useState<number | null>(null);

    // Fetch entries from the backend
    const getEntries = async () => {
        try {
            const token = await getAccessTokenSilently();
            const toFetch = {
                userName: user!.name,
            };

            const data = await MakeProtectedPostRequest('/api/getEntries', toFetch, token);
            const sortedEntries = data.data.sort((a: Entry, b: Entry) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime());
            setUserEntries(sortedEntries);

        } catch (e) {
            console.log("Error getting entries: ", e);
        }
    };

    useEffect(() => {
        getEntries();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const dateString = date.toISOString().split('T')[0];

        if (title.trim() && text.trim()) {
            const newEntry = {
                title: title,
                entry: text,
                dateCreated: new Date().toLocaleString(),
            };

            try {
                const token = await getAccessTokenSilently();
                const toSave = { ...newEntry, userName: user!.name };

                await MakeProtectedPostRequest('/api/addEntry', toSave, token);

                getEntries();

            } catch (e) {
                console.log("Error saving entry: ", e);
            }

            // Reset the form after submission
            resetForm();
        }
    };

    // Reset form fields
    const resetForm = () => {
        setTitle('');
        setText('');
        setEditingIndex(null);
    };

    // Handle date change in calendar
    const handleDateChange = (day: Date) => {
        setDate(day);
        resetForm();
        setExpandedEntryIndex(null);
    };

    const handleEditEntry = async (index: number, newTitle: string, newText: string) => {
        const entryToUpdate = userEntries[index];

        const updatedEntry = {
            ...entryToUpdate,
            title: newTitle,
            entry: newText,
        };

        try {
            const token = await getAccessTokenSilently();
            const toUpdate = { ...updatedEntry, userName: user!.name };

            await MakeProtectedPostRequest('/api/updateEntry', toUpdate, token);

            // Update local state
            setUserEntries(prevEntries => {
                const newEntries = [...prevEntries];
                newEntries[index] = updatedEntry;
                return newEntries;
            });

            // Fetch updated entries from the backend to ensure persistence
            getEntries();

        } catch (e) {
            console.log("Error updating entry: ", e);
        }
    };

    return (
        <div className="max-w-5xl mx-auto mt-10 p-6">
            <div className="flex">
                <div className="flex-1 p-4">
                    <JournalEntryForm
                        title={title}
                        text={text}
                        setTitle={setTitle}
                        setText={setText}
                        handleSubmit={handleSubmit}
                        getEntries={getEntries}
                    />
                </div>
                <div className="flex-1 p-4">
                    <CalendarSection
                        date={date}
                        handleDateChange={handleDateChange}
                    />
                </div>
            </div>
            <div className="mt-8">
                <EntriesList
                    entries={userEntries}
                    expandedEntryIndex={expandedEntryIndex}
                    toggleEntry={setExpandedEntryIndex}
                    editingIndex={editingIndex}
                    setEditingIndex={setEditingIndex}
                    handleEditEntry={handleEditEntry}
                    handleDeleteEntry={(index: number) => {
                        setUserEntries(prevEntries => {
                            const newEntries = [...prevEntries];
                            newEntries.splice(index, 1);
                            return newEntries;
                        });
                    }}
                    getEntries={getEntries}
                />
            </div>
        </div>
    );
}