import { Button } from "../components/ui/button";
import {useAuth0} from "@auth0/auth0-react";
import {MakeProtectedPostRequest} from "@/utils/makeProtectedPostRequest.ts";
// import {useState} from "react";

interface JournalEntryFormProps {
    title: string;
    text: string;
    setTitle: (title: string) => void;
    setText: (text: string) => void;
    handleSubmit: (e: React.FormEvent) => void;
    getEntries: () => Promise<void>; // Add getEntries to the props interface
}

const JournalEntryForm: React.FC<JournalEntryFormProps> = ({ title, text, setTitle, setText, handleSubmit, getEntries }) => {
    const { user, getAccessTokenSilently } = useAuth0();

    const addEntry = async () => {
        try {
            const token = await getAccessTokenSilently();

            const bodyData = {
                userName: user!.name,
                title: title,
                entry: text,
                dateCreated: new Date().toISOString(),
            };

            await MakeProtectedPostRequest('/api/addEntry', bodyData, token);
            await getEntries();
        } catch (e) {
            console.log("Error adding entry: ", e);
        }
    }

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
            <h1 className="text-center text-2xl font-bold mb-4">Add a journal entry</h1>
            <form>
                <div className="mb-4">
                    <input
                        type="text"
                        className="w-full max-w-lg p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                    />
                </div>
                <div className="relative mb-4">
                    <textarea
                        className="w-full max-w-lg h-40 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder={"Write your journal entry..."}
                    />
                </div>
                <Button type="submit" onClick={addEntry} className="mt-2 px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
                    {'Add Entry'}
                </Button>
            </form>
        </div>
    );
}
export default JournalEntryForm;
