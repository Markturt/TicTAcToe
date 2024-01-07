const openDialog=document.querySelector("#openDialog");

const playerInfo=document.querySelector("dialog");

const closeDialog=document.querySelector("form>button");

const buttons=Array.from(document.querySelectorAll("#gameBoard>button"));

const restartButton=document.querySelector("#restart");

const output=document.getElementById("output");

let player;
closeDialog.addEventListener("click",()=>{
    const playerName=document.getElementById("Name");
    const playersMark=document.getElementById("mark");
    player=[Player(playerName.value,playersMark.value),Player("Computer","X")]
    if(player[0].marker==player[1].marker){
        player[1].marker="C";
    }
    Game.handleClick();
    playerInfo.close();
})
openDialog.addEventListener("click",()=>{
    playerInfo.showModal();
})

function Player(name,marker){
    return {name,marker};
}
let gameBoard=(function(){
    let board=["","","","","","","","",""];

    let emptyArrayIndex=function(){
        let emptyCell=[];
        for(let i=0;i<board.length;i++){
            if(board[i]==""){
                emptyCell.push(i);
            }
        }
        return emptyCell;
    };

    let getGameBoard=()=>board;

    return {getGameBoard,emptyArrayIndex}
})();

let Game=(function (){
    let handleClick=function(){
        for(let button of buttons){
            button.addEventListener("click",(e)=>{
                if(button.textContent!==""){
                    return;
                }
                if(Game.checkStatus().getWInner!==undefined){
                    output.textContent=Game.checkStatus().getWInner +"Wins";
                    return;
                }
                else if(Game.checkStatus().isATie!==undefined){
                    output.textContent="It's A Tie";
                    return;
                }
                else{
                    let buttonId=+e.target.id;
                    button.textContent=player[0].marker;
                    gameBoard.getGameBoard()[buttonId]=player[0].marker;
                    chooseCell();
                    if(Game.checkStatus().getWInner!==undefined){
                        output.textContent=Game.checkStatus().getWInner +"Wins";
                        return;
                    }
                }
            })
        }
    }
    let chooseCell=function(){
        console.log(checkStatus());
        let availableArray=gameBoard.emptyArrayIndex();
        let randomIndex=Math.floor(Math.random()*availableArray.length);  //this helps shuff;es the empty array
        let index=availableArray[randomIndex]
        gameBoard.getGameBoard()[index]=player[1].marker;
        console.log(gameBoard.getGameBoard());
        for(let button of buttons){
            if(button.id==index){
                button.textContent=player[1].marker;
            }
        }

    }
    let checkStatus=function(){
        let currentPlayer;
        let winningCombinations=[
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ]

        let getWInner=(()=>{
            for(let [a,b,c] of winningCombinations){
                if(gameBoard.getGameBoard()[a] && (gameBoard.getGameBoard()[a]==gameBoard.getGameBoard()[b]) && (gameBoard.getGameBoard()[a]==gameBoard.getGameBoard()[c])){
                    if(gameBoard.getGameBoard()[a]==player[0].marker){
                        return player[0].name;
                    }
                    else{
                        return player[1].name;
                    }
                }
            }
        })()

        let isATie=(function(){
            for(let [a,b,c] of winningCombinations){
                
                if((gameBoard.getGameBoard()[a]!==gameBoard.getGameBoard()[b] || gameBoard.getGameBoard()[a]!==gameBoard.getGameBoard()[c]) && gameBoard.emptyArrayIndex().length==0){
                    return true;;
                }
            }
        })();
        return {getWInner,isATie}
    }
    let restart=function(){
        location.reload();
    }
    return {handleClick,restart,checkStatus}
})()

restartButton.addEventListener("click",Game.restart)
