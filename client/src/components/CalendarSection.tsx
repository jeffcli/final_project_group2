import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

interface CalendarSectionProps {
    date: Date;
    handleDateChange: (date: Date) => void;
}

const CalendarSection: React.FC<CalendarSectionProps> = ({ date, handleDateChange }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
            <h2 className="text-center text-2xl font-bold mb-4">Calendar</h2>
            <div className="flex justify-center mb-4">
                <Calendar onChange={handleDateChange} value={date} className="w-full max-w-xs" />
            </div>
        </div>
    );
};

export default CalendarSection;