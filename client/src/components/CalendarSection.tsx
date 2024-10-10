import 'react-calendar/dist/Calendar.css';
import { Calendar } from "@/components/ui/calendar"; // Adjust the import path as needed

interface CalendarSectionProps {
    date: Date;
    handleDateChange: (date: Date) => void;
}

const CalendarSection: React.FC<CalendarSectionProps> = ({ date, handleDateChange }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6 flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4 text-center">Calendar</h2>
            <div className="flex justify-center h-full">
                <Calendar
                    value={date}
                    onDayClick={handleDateChange}
                    className="w-full max-w-xs"
                />
            </div>
        </div>
    );
};

export default CalendarSection;