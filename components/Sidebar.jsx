


import React from "react";

export default function Sidebar(props) {
    const [searchItem, setSearchItem] = React.useState("");

    // Filter notes based on the search input
    const filterItem = props.notes.filter((item) =>
        
          item.body.toLowerCase().includes(searchItem.toLowerCase())
    );

    // Create note elements for the sidebar
    const noteElements = (searchItem.length > 0 ? filterItem : props.notes).map((note) => (
        <div key={note.id}>
            <div
                className={`title ${
                    note.id === props.currentNote.id ? "selected-note" : ""
                }`}
                onClick={() => props.setCurrentNoteId(note.id)}
            >
                <h4 className="text-snippet">{note.body.split('\n')[0]}</h4>
                <button 
                    className="delete-btn"
                    onClick={() => 
                        
                        props.deleteNote(note.id)
                    }
                >
                    <i className="gg-trash trash-icon"></i>
                </button>
            </div>
        </div>
    ));

    return (
        <section className="pane sidebar">
            <div className="sidebar--header">
                <h3>Slides</h3>
                <button className="new-note" onClick={props.newNote}>+</button>
            </div>
            <input
                type="text"
                placeholder="search..."
                value={searchItem}
                className="input-search"
                onChange={(e) => setSearchItem(e.target.value)}
            />
            <div>
                {searchItem.length > 0 ? 
                (
                    filterItem.length > 0 ? (
                        noteElements
                    ) : (
                        <p className="slide-para">No Slide</p>
                    )

                ) :
                noteElements
            }
            </div>
        </section>
    );
}
