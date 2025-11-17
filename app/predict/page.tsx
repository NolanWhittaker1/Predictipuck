"use client";
import { createClient } from "../utils/supabase/client";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import Navbar from "../navbar/page";

interface gameFormat {
  game_id: string;
  home_team: string;
  away_team: string;
  start_time: string; // ISO string from DB
}

interface pickFormat {
  game_id: string,
  team_picked: string,
  pick_time: string,
}

export default function Predict() {
  const supabase = createClient();
  const [games, setGames] = useState<gameFormat[]>([]);
  const [picks, setPicks] = useState<pickFormat[]>([]);  

  useEffect(() => {
    const current_date = new Date();
    const fetchData = async () => {
      const { data, error } = await supabase.from("games").select('*').gt('start_time', current_date.toLocaleString("en-US", {timeZone: "America/Los_Angeles"}));

      if (error) {
        redirect("/");
        return;
      }

      const initialPicks = [];
      for(let i = 0; i < data.length; i++) {
          const game = data[i];
          initialPicks.push({'game_id': game.game_id, 'team_picked': game.home_team, 'pick_time': current_date.toLocaleString("en-US", {timeZone: "America/Los_Angeles"})})
      }

      setPicks(initialPicks as pickFormat[] || []);
      setGames(data as gameFormat[] || []);
    };
    fetchData();

  }, []);

  function updatePick(game_id: string, team: string) {
        var foundIndex = picks.findIndex(pick => pick.game_id === game_id)
        if(foundIndex === -1) {
            return;
        }
        picks[foundIndex] = {game_id, 'team_picked': team, 'pick_time' : new Date().toLocaleString("en-US", {timeZone: "America/Los_Angeles"})};       
        const newPicks = [...picks];

        newPicks[foundIndex] = {
            game_id, 
            team_picked: team, 
            pick_time: new Date().toLocaleString("en-US", {timeZone: "America/Los_Angeles"})
        };
        
        setPicks(newPicks);
    }

    async function submitPicks() {
      const user = await supabase.auth.getUser();
      
      if (!user || !user.data.user?.id) {
          console.error("User not authenticated or user ID not found.");
          return;
      }

      const userId = user.data.user.id;

      for(const pick of picks) {
          const upsertData = {
              user_id: userId,
              game_id: pick.game_id,
              team_picked: pick.team_picked,
              pick_time: pick.pick_time
          };
          
          const { error } = await supabase
              .from('predictions')
              .upsert(upsertData, { 
                  onConflict: 'user_id, game_id' 
              });

          if (error) {
              console.error("Error during upsert:", error);
          }
      }

      redirect('/profile');
    }


  return (
    <>
    <Navbar></Navbar>
    <div className="w-screen min-h-screen h-fit flex justify-center items-center">
      <div className="w-1/3 h-fit border-2 border-blue-500 p-2 rounded-3xl">
        {games.map((game) => (
          <div key={game.game_id} className="flex flex-row justify-between items-center space-x-4 space-y-2 p-1">
            <img onClick={() => updatePick(game.game_id, game.away_team)} className={`h-20 w-20 hover:cursor-pointer ${picks.some(p => p.team_picked.includes(game.away_team)) ? "border-2 border-green-500" : "border-none"}`} src={`https://assets.nhle.com/logos/nhl/svg/${game.away_team}_light.svg`} alt="Team"></img>
            <h1>vs</h1>
            <img onClick={() => updatePick(game.game_id, game.home_team)} className={`h-20 w-20 hover:cursor-pointer ${picks.some(p => p.team_picked.includes(game.home_team)) ? "border-2 border-green-500" : "border-none"}`}src={`https://assets.nhle.com/logos/nhl/svg/${game.home_team}_light.svg`}></img>
          </div>
        ))}
        <button className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={() => submitPicks()}>Submit Picks</button>
      </div>
    </div>
    </>
    
  );
}
