import {GET_NOTES} from './queries'

export const saveNotes = cache => {
    const {notes} = cache.readQuery({query: GET_NOTES});
    const jsonNotes = JSON.stringify(notes);
    try {
        //setItem(key: string, data: string):void
        localStorage.setItem("notes", jsonNotes);
    } catch (error) {
        console.log(error);
    }
}

export const restoreNotes = () =>{
    //getItem(key: String):String
    const notes = localStorage.getItem("notes");
    if(notes){
        try {
            const parsedNotes = JSON.parse(notes);
            return parsedNotes;
        } catch (error) {
            console.log(error);
            return [];
        }
    }   
    return [];
}