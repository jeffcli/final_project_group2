import { useState } from "react";
import CalendarSection from "../components/CalendarSection";
import EntriesList from "../components/EntriesList";
import JournalEntryForm from "../components/JournalEntryForm";

interface Entry {
    title: string;
    text: string;
    dateCreated: string;
}

export default function NotebookPage() {
    const [title, setTitle] = useState<string>('');
    const [text, setText] = useState<string>('');
    const [entries, setEntries] = useState<{ [key: string]: Entry[] }>({});
    const [date, setDate] = useState<Date>(new Date());
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [expandedEntryIndex, setExpandedEntryIndex] = useState<number | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const dateString = date.toISOString().split('T')[0];
        if (title.trim() && text.trim()) {
            const newEntry = {
                title,
                text,
                dateCreated: new Date().toLocaleString(),
            };
            setEntries(prevEntries => {
                const newEntries = { ...prevEntries };
                if (!newEntries[dateString]) {
                    newEntries[dateString] = [];
                }
                if (editingIndex !== null) {
                    newEntries[dateString][editingIndex] = newEntry;
                } else {
                    newEntries[dateString].push(newEntry);
                }
                return newEntries;
            });
            resetForm();
        }
    };

    const resetForm = () => {
        setTitle('');
        setText('');
        setEditingIndex(null);
    };

    const handleDateChange = (day: Date) => {
        setDate(day);
        resetForm();
        setExpandedEntryIndex(null);
    };

    const dateString = date.toISOString().split('T')[0];
    const todayEntries = entries[dateString] || [];

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
                    entries={todayEntries}
                    expandedEntryIndex={expandedEntryIndex}
                    toggleEntry={setExpandedEntryIndex}
                    editingIndex={editingIndex}
                    setEditingIndex={setEditingIndex}
                    handleEditEntry={(index: number, newTitle: string, newText: string) => {
                        const updatedEntry = {
                            title: newTitle,
                            text: newText,
                            dateCreated: todayEntries[index].dateCreated,
                        };
                        setEntries(prevEntries => {
                            const newEntries = { ...prevEntries };
                            if (newEntries[dateString]) {
                                newEntries[dateString][index] = updatedEntry;
                            }
                            return newEntries;
                        });
                    }}
                    handleDeleteEntry={(index: number) => {
                        setEntries(prevEntries => {
                            const newEntries = { ...prevEntries };
                            if (newEntries[dateString]) {
                                newEntries[dateString] = newEntries[dateString].filter((_, i) => i !== index);
                                if (newEntries[dateString].length === 0) {
                                    delete newEntries[dateString];
                                }
                            }
                            return newEntries;
                        });
                    }}
                />
            </div>
        </div>
    );
}