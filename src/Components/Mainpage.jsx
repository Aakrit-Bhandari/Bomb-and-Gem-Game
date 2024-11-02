import "./Mainpage.css"
import { useState } from "react";
import bomb from "../Images/Bombpng-removebg-preview.png"
import gem from "../Images/gem-removebg-preview(1).png"
export default function Mainpage()
{
    const [selectedNumber,setSelectedNumber] = useState(1);
    const [boxes,setBoxes] = useState(Array(25).fill(false));
    const [revealedBoxes,setRevealedBoxes]= useState(Array(25).fill(false));
    const [revealed,setRevealed] = useState(0);
    const [toReveal,setToReveal] =useState(0);
    const [gameOver,setGameOver] = useState(false);
    const [betDisabled,setBetDisabled]=useState(false);
    const [selectDisabled,setSelectDisabled]=useState(false);
    const handleSelectChange = (event)=>{
        setSelectedNumber(Number(event.target.value));
    }
    const handleBetClick=()=>{
        const newBoxes = Array(25).fill(false);
        let bombCount =0;
        setToReveal(25-selectedNumber);
        while(bombCount<selectedNumber){
            const randomIdx = Math.floor(Math.random()*25);
            if(!newBoxes[randomIdx])
            {
                newBoxes[randomIdx]=true;
                bombCount++;
            }
        }
        setBoxes(newBoxes);
        setRevealedBoxes(Array(25).fill(false));
        setGameOver(false);
        setBetDisabled(true);
        setSelectDisabled(true);
        setRevealed(0);
    }
    const handleBoxClick=(index)=>{
        if(!betDisabled||gameOver||revealedBoxes[index])return;
        if(boxes[index])
        {
            setRevealedBoxes((prev)=>{
                const newRevealed=[...prev];
                newRevealed[index]=true;
                return newRevealed;
            })
            alert("You have lost Restart Game");
            setGameOver(true);
            setBetDisabled(false);
            setSelectDisabled(false);
        }
        else{
            setRevealedBoxes((prev)=>{
                const newRevealed=[...prev];
                newRevealed[index]=true;
                return newRevealed;
            });
            setRevealed((prev)=>{
                const newCount = prev+1;
                if(newCount===toReveal)
                {
                    setGameOver(true);
                    alert("HOrray! You won the Game!");
                    setBetDisabled(false);
                    setSelectDisabled(false);
                }
                return newCount;
            });
            
        }
    }
    return(
        <section className="Main_Section">
            <div className="Main_Section_Left">
            <h1>Mine Game!!!</h1>
                <span >Mines</span>
                <div className="Left_Option_Button">
                    <select onChange={handleSelectChange} disabled={selectDisabled}>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                        <option value='10'>10</option>
                        <option value='15'>15</option>
                        <option value='20'>20</option>
                        <option value='24'>24</option>
                    </select>
                    <button 
                        type="button" 
                        onClick={handleBetClick}
                        disabled={betDisabled}
                        style={{
                            backgroundColor:betDisabled?'rgb(163, 222, 163)':'rgb(0, 222, 0)',
                            cursor:betDisabled?'not-allowed':'pointer',
                        }}
                        >Bet</button>
                </div>
            </div>
            <div className="Main_Section_Right">
                <div className="Right_Arranged_Boxes">
                    {boxes.map((isBomb,idx)=>(
                        <div key={idx} className="Box" onClick={()=>handleBoxClick(idx)}>
                            {revealedBoxes[idx]?(
                                <img src={isBomb?bomb:gem}alt={isBomb?"Bomb":"Gem"}/>
                            ):(
                                <div className="Cover">
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );  
}
