import { useEffect, useState } from 'react'
import './App.css'
import { Card } from './components/ui/card'
import logo from './assets/logo.png'
import { useAuth0 } from '@auth0/auth0-react'
import { MakeProtectedPostRequest } from './utils/makeProtectedPostRequest'

type wellnessStats = {
  habitsCompleted: string,
  lastJournalEntry: string,
  averageMood: string
}

function App() {
  const [quote, setQuote] = useState<{ text: string, author: string }>({ text: 'Today is Sunday omggggg', author: 'Dante' })
  const [userStats, setUserStats] = useState<wellnessStats>({
    habitsCompleted: 'N/A',
    lastJournalEntry: 'N/A',
    averageMood: 'N/A'
  });

  const {user, getAccessTokenSilently} = useAuth0();

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
      
      <div className="flex flex-col justify-center gap-2 w-2/5 mx-auto h-64">
        <h1 className="text-center text-4xl font-semibold text-wrap">
          {quote.text}
        </h1>
        <p className="text-right text-xl font-light">
          -{quote.author}
        </p>
      </div>
      
      {/* Your Wellness Overview */}
      <div className="grid grid-rows-1 grid-cols-4 my-4 h-52 gap-3">
        <h1 className="text-4xl font-semibold my-4">
          Your Wellness
        </h1>
        <Card>
          <div className="flex flex-col m-2">
            <div className="w-24 h-24 mx-auto">
              <img src={logo} className="w-full h-full object-contain"/>
            </div>  
            <div>
              <h1 className="font-extrabold text-center text-4xl">
                {userStats.habitsCompleted}
              </h1>
              <div className="font-bold text-center">
                Habits Completed Today
              </div>
            </div>
          </div>
          

        </Card>
        <Card>
          <div className="flex flex-col m-2">
            <div className="w-24 h-24 mx-auto">
              <img src={logo} className="w-full h-full object-contain"/>
            </div>  
            <div>
              <h1 className="font-extrabold text-center text-4xl">
                {userStats.lastJournalEntry}
              </h1>
              <div className="font-bold text-center">
                Last Journal Entry
              </div>
            </div>
          </div>
          

        </Card>
        <Card>
          <div className="flex flex-col m-2">
            <div className="w-24 h-24 mx-auto">
              <img src={logo} className="w-full h-full object-contain"/>
            </div>  
            <div>
              <h1 className="font-extrabold text-center text-4xl">
                {userStats.averageMood}
              </h1>
              <div className="font-bold text-center">
                Average Mood (last 7 days)
              </div>
            </div>
          </div>
          

        </Card>
      </div>
    </div>
    </>
  )
}

export default App
