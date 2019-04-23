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