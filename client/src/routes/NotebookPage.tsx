import { useState } from 'react';
import CalendarSection from "../components/CalendarSection";
import EntriesList from "../components/EntriesList";
import JournalEntryForm from "../components/JournalEntryForm";

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

    const handleEditEntry = (index: number, newTitle: string, newText: string) => {
        const dateString = date.toISOString().split('T')[0];
        setEntries(prevEntries => {
            const newEntries = { ...prevEntries };
            if (newEntries[dateString] && newEntries[dateString][index]) {
                newEntries[dateString][index] = { title: newTitle, text: newText };
            }
            return newEntries;
        });
    };

    const dateString = date.toISOString().split('T')[0];
    const todayEntries = entries[dateString] || [];

    return (
        <div className="max-w-5xl mx-auto mt-10 p-6">
            <div className="flex">

                <div className="flex-1 max-w-1/2 p-4">
                    <JournalEntryForm
                        title={title}
                        text={text}
                        setTitle={setTitle}
                        setText={setText}
                        handleSubmit={handleSubmit}
                        isTyping={isTyping}
                    />
                </div>


                <div className="flex-1 max-w-1/2 p-4">
                    <CalendarSection date={date} handleDateChange={handleDateChange} />
                </div>
            </div>

            {/* Entries List below Calendar */}
            <div className="mt-8">
                <EntriesList
                    entries={todayEntries}
                    editingIndex={editingIndex}
                    setEditingIndex={setEditingIndex}
                    handleEditEntry={handleEditEntry}
                    handleDeleteEntry={handleDeleteEntry}
                    expandedEntryIndex={expandedEntryIndex}
                    toggleEntry={toggleEntry}

                />
            </div>
        </div>
    );
}