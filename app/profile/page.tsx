"use client";
import { createClient } from "../utils/supabase/client";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import Navbar from "../navbar/page";

interface predictionFormat {
    game_id: string,
    team_picked: string,
    correct_pick: boolean
}

export default function Profile() {
    const supabase = createClient();
    const [username, setUsername] = useState('unknown');
    const [favteam, setFavteam] = useState('VAN');
    const [userp, setUserp] = useState<predictionFormat[]>([]);


    useEffect(() => {
        const fetchdata = async () => {
            const user = await supabase.auth.getUser();
            const user_id = user.data.user?.id;
            console.log(user_id);
            let { data: profiles, error: userError } = await supabase.from('profiles').select("*").eq('id', user_id);
            
            if(!profiles) {
                return;
            }

            setUsername(profiles[0]?.username);
            setFavteam(profiles[0]?.favteam);
            
            let { data: predictions, error: predictionsError } = await supabase.from('predictions').select('game_id, team_picked, pick_time').eq('user_id', user_id)
            let { data: results, error: resultsError } = await supabase.from('results').select('*') // {game_id, winner}
            
            console.log(predictions);

            if(predictionsError) {
                return;
            }

            if(!predictions) {
                return;
            }

            if(!results) {
                return;
            }
            
            const temp = predictions
            .filter(prediction => {
                // keep only predictions that have a matching result
                return results.some(r => r.game_id === prediction.game_id);
            })
            .map(prediction => {
                const result = results.find(r => r.game_id === prediction.game_id);

                return {
                    game_id: prediction.game_id,
                    team_picked: prediction.team_picked,
                    correct_pick: prediction.team_picked === result.winner,
                };
            });
            console.log(temp);
            temp.sort((a, b) => a.game_id- b.game_id);
            setUserp(temp);
        
        }

        fetchdata();

    }, [])
    
    return (
        <>
        <Navbar></Navbar>
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="w-3/4 h-3/4 flex flex-col border border-blue-300">
                <div className="flex flex-row justify-end items-center space-x-4"><h1>{username}</h1><img className="w-15 h-15" src={`https://assets.nhle.com/logos/nhl/svg/${favteam}_light.svg`}></img></div>
                <div className="flex flex-col">
                    <h1>Predictions</h1>
                    {userp.map((pred) => (
                        <div key={pred.game_id} className="flex flex-row space-x-2">
                            <div>{pred.game_id}</div>
                            <div>{pred.team_picked}</div>
                            <div>{pred.correct_pick ? "Correct" : "Incorrect"}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        </>
    );
}
