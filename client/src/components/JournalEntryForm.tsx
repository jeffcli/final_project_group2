import { Button } from "../components/ui/button";

interface JournalEntryFormProps {
    title: string;
    text: string;
    setTitle: (title: string) => void;
    setText: (text: string) => void;
    handleSubmit: (e: React.FormEvent) => void;

}

const JournalEntryForm: React.FC<JournalEntryFormProps> = ({ title, text, setTitle, setText, handleSubmit }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
            <h1 className="text-center text-2xl font-bold mb-4">Add a journal entry</h1>
            <form onSubmit={handleSubmit}>
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
                        className="w-full max-w-lg h-40 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" // Adjusted width and height
                        value={text}
                        onChange={(e) => {
                            setText(e.target.value);
                        }}
                        placeholder={"Write your journal entry..."}
                    />
                </div>
                <Button type="submit" className="mt-2 px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
                    {'Add Entry'}
                </Button>
            </form>
        </div>
    );
};

export default JournalEntryForm;