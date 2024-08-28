import React from "react"
import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"
import Split from "react-split"
import { SlideCollection, db} from "./firebase"
import { addDoc, onSnapshot, doc, deleteDoc,  setDoc} from "firebase/firestore"




export default function App() {
    const [notes, setNotes] = React.useState([]); 
    const [currentNoteId, setCurrentNoteId] = React.useState("");
    const [tempNoteText, setTempNoteText] = React.useState('');

    const currentNote =  notes.find(note => {
        return note.id === currentNoteId
    }) || notes[0]

    const sortedNotes = notes.sort((a, b) => b.updateAt - a.updateAt);

    React.useEffect(() => {
        const unsubscribe = onSnapshot(SlideCollection, (snapshot) => {
            //sync local array with the snapshot data
            const newArray = snapshot.docs.map((doc) => ({

                    ...doc.data(),
                    id: doc.id
            }));
            
            setNotes(newArray);
        })
        return unsubscribe; // to clear sideEffect before unmounting
    }, [])

    // giving id if notes changes
    React.useEffect(() => {
        if(!currentNoteId){
            setCurrentNoteId(notes[0]?.id)
        }
    }, [notes])
    

    // for applying debouncing logic to delay request
    React.useEffect(() => {
        if(currentNote){
            setTempNoteText(currentNote.body)
        }
    }, [currentNote])

    React.useEffect(() => {
        const delayTime = setTimeout(() => {  // for delay the update in firebase
            if(tempNoteText !== currentNote.body){

                updateNote(tempNoteText);
            }
        }, 500)
        return () => clearTimeout(delayTime)
    }, [tempNoteText])

    
    async function createNewNote() {
        const newNote = {
            
            body: "# Type your markdown slide's title here",
            createAt: Date.now(),
            updateAt: Date.now()
        }
        const notesRef = await addDoc(SlideCollection, newNote);

        setCurrentNoteId(notesRef.id)
    }
    
    async function updateNote(text) {
       const docRef = doc(db, 'notes', currentNoteId);
       await setDoc(docRef, {body : text, updateAt: Date.now()}, {merge: true}) //merge > tells Firestore to merge the provided data with the existing document data. 
                                                        //It will only update the body field and leave other fields unchanged
    }
    
    
    
    async function deleteNote(noteId) {
        const docRef = doc(db, 'notes', noteId);
        await deleteDoc(docRef);
    }

    return (
        <main>
        {
            notes.length > 0 
            ?
            <Split 
                sizes={[30, 70]} 
                direction="horizontal" 
                className="split"
            >
                <Sidebar
                    notes={sortedNotes}
                    currentNote={currentNote}
                    setCurrentNoteId={setCurrentNoteId}
                    newNote={createNewNote}
                    deleteNote={deleteNote}
                />
                
                    
                <Editor 
                    tempNoteText={tempNoteText} 
                    setTempNoteText={setTempNoteText}
                        
                />
                
            </Split>
            :
            <div className="no-notes">
                <h1>You have no slide</h1>
                <button 
                    className="first-note" 
                    onClick={createNewNote}
                >
                    Create one now
                </button>
            </div>
            
        }
        </main>
    )
}    