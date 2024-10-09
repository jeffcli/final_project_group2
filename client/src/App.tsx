import { useEffect, useState } from 'react'
import './App.css'
import { Card } from './components/ui/card'
import logo from './assets/logo.png'
import { useAuth0 } from '@auth0/auth0-react'
import { MakeProtectedPostRequest } from './utils/makeProtectedPostRequest'
import habitIcon from './assets/task-square-svgrepo-com.svg'
import journalIcon from './assets/notebook-svgrepo-com.svg'
import moodIcon from './assets/smile-circle-svgrepo-com.svg'
import { Button } from './components/ui/button'
import MoodForm from './components/MoodForm'
import { QuoteModal } from './components/quoteModal'
import { makeProtectedGetRequest } from './utils/makeProtectedGetRequest'

type wellnessStats = {
  habitsCompleted: string,
  lastJournalEntry: string,
  averageMood: string
}
interface quote{
  quote:string, 
  userName:string, 
}

function App() {
  const [quote, setQuote] = useState<{ text: string, author: string }>({ text: 'Suggest a Quote for it to appear here!', author: '' }); 
  const [quoteModalOpen, setQuoteModalOpen] = useState<boolean>(false); 
  const [userStats, setUserStats] = useState<wellnessStats>({
    habitsCompleted: 'N/A',
    lastJournalEntry: 'N/A',
    averageMood: 'N/A'
  });

   useEffect(() => { 
    const makeRequest = async () => { 
      const token = await getAccessTokenSilently(); 
      const data = await makeProtectedGetRequest('/api/fetchQuotes', token); 
      const quotes = data.data; 
      const tail = (quotes[quotes.length - 1] as quote); 
      setQuote({text:tail.quote, author:tail.userName}); 
    }
    makeRequest().then(); 
  }, [window])

  const {user, getAccessTokenSilently} = useAuth0();
  const addQuote = async (quote:string) => { 
    const token = await getAccessTokenSilently(); 
    const toAdd = { 
      userName: user!.name, 
      quote: quote
    }; 
    const data = await MakeProtectedPostRequest('/api/addQuote', toAdd, token ); 
    console.log("the data is", data.data); 
    const quotes = data.data; 
    const tail = (quotes[quotes.length - 1] as quote); 
    setQuote({text:tail.quote, author:tail.userName}); 

   

  }

  const updateStats = async () => {
    const stats = {
      habitsCompleted: 'N/A',
      lastJournalEntry: 'N/A',
      averageMood: 'N/A'
    }
      try {
        let token = await getAccessTokenSilently(); 
        console.log(token)
    
        const toFetch = {
          userName: user!.name
      }; 
  
        let data = await MakeProtectedPostRequest('/api/getHabits',toFetch, token);
          let completed = 0;
          data.data.forEach((habit : any) => {
            for (let i = 0; i < habit.completed.length; i++) {
              let mongoDBDate = new Date(habit.completed[i]).toDateString();
              let today = new Date().toDateString();
              if (mongoDBDate.slice(0, 10) === today.slice(0, 10)) {
                  completed++;
                  break;
              }
            }
          })
          stats.habitsCompleted = completed.toString() + "/" + data.data.length;
      } catch (e) {
        console.log("Error getting habits: ", e);
      }
      setUserStats(stats);
  }

  useEffect(() => {
    updateStats();
  }, [window])

  return (
    <>
    {/* Daily Quote */}
    <div className="absolute w-full h-64 bg-red-200 -z-10"></div>
    <div className="max-w-screen-lg mx-auto">
      
      <div className="w-2/5 mx-auto h-64 flex flex-col">
        <div className="inline-flex flex-col justify-center self-center gap-2 h-full mt-[2rem]">
          <h1 className="text-center text-4xl font-semibold text-wrap">
            {quote.text}
          </h1>
          <p className="text-right text-xl font-light">
            -{quote.author}
          </p>
        </div>
        <div className="mx-auto">
          <Button onClick = {() => setQuoteModalOpen(true)}variant="link" className="text-rose-500">Suggest a Quote</Button>
        </div>
      </div>

      
      {/* Your Wellness Overview */}
      <h1 className="text-4xl font-semibold my-4">
          Your Wellness
        </h1>
      <div className="grid grid-rows-1 grid-cols-3 my-4 h-60 gap-3 px-4">

        <Card>
          <div className="flex flex-col m-2 h-full">
            <div className="w-16 h-16 mx-auto my-4">
              <img src={habitIcon} className="w-full h-full object-contain"/>
            </div>  
            <div>
              <h1 className="font-extrabold text-center text-4xl">
                {userStats.habitsCompleted}
              </h1>
              <div className="font-bold text-center">
                Habits Completed Today
              </div>
            </div>
            <Button className="m-auto max-w-36" variant="outline">Go to Habits</Button>
          </div>
          

        </Card>
        <Card>
          <div className="flex flex-col m-2 h-full">
            <div className="w-16 h-16 mx-auto my-4">
              <img src={journalIcon} className="w-full h-full object-contain"/>
            </div>  
            <div>
              <h1 className="font-extrabold text-center text-4xl">
                {userStats.lastJournalEntry}
              </h1>
              <div className="font-bold text-center">
                Last Journal Entry
              </div>
            </div>
            <Button className="m-auto max-w-36" variant="outline">Go to Journal</Button>
          </div>
          

        </Card>
        <Card>
          <div className="flex flex-col m-2 h-full">
            <div className="w-16 h-16 mx-auto my-4">
              <img src={moodIcon} className="w-full h-full object-contain"/>
            </div>  
            <div>
              <h1 className="font-extrabold text-center text-4xl">
                {userStats.averageMood}
              </h1>
              <div className="font-bold text-center">
                Average Mood (last 7 days)
              </div>
            </div>
            <MoodForm/>
          </div>
        </Card>
      </div>
      {/* open:boolean;
    setOpen: (state:boolean) => void; 
    addQuote:  (username:string, quote:string) => void;  */}
      <QuoteModal open={quoteModalOpen} setOpen={(state) => setQuoteModalOpen(state)} addQuote={( quote) => addQuote( quote)}/>
    </div>
    </>
  )
}

export default App
