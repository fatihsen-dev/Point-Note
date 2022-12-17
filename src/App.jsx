import { useState } from "react";

export default function App() {
   const colors = ["#ff595e", "#ffca3a", "#8ac926", "#1982c4", "#6a4c93"];
   const [points, setPoints] = useState([]);
   const [title, setTitle] = useState("");
   const [desc, setdesc] = useState("");
   const [formActive, setFormActive] = useState(false);
   const [activePoint, setActivePoint] = useState({});
   const [noteMode, setNoteMode] = useState(false);

   const pointsHandle = (e) => {
      if (noteMode) {
         const randomColor = Math.floor(Math.random() * colors.length);
         const { clientX, clientY } = e;
         setActivePoint({ X: clientX, Y: clientY, C: colors[randomColor] });
         setFormActive(true);
      }
   };

   const buttonHandle = (e) => {
      e.stopPropagation();
   };

   const submitHandle = (e) => {
      if (title.length > 0 && desc.length > 0) {
         setPoints([...points, { ...activePoint, title, desc }]);
         setFormActive(false);
         setTitle("");
         setdesc("");
      }
   };
   const cencelHandle = (e) => {
      setActivePoint({});
      setFormActive(false);
   };

   const editHandle = (e) => {
      // splice(4, 1, "May");
   };

   return (
      <div className='container'>
         <div className='header'>
            <button onClick={() => setNoteMode(!noteMode)} className='new'>
               {noteMode ? "Disable" : "Active"}
            </button>
         </div>
         <main onClick={pointsHandle} className='main'>
            {points &&
               points.map((point, key) => (
                  <div
                     tabIndex={0}
                     style={{
                        "--left": point.X + "px",
                        "--top": point.Y + "px",
                        "--color": point.C,
                     }}
                     className='btn-ctnr'
                     onClick={buttonHandle}
                     key={key}>
                     <button key={key} className='point'></button>
                     <div className='menu'>
                        <span>{point.title}</span>
                        <p>{point.desc}</p>
                        <button onClick={editHandle}>Edit</button>
                     </div>
                  </div>
               ))}
            {formActive && (
               <form
                  onClick={(e) => e.stopPropagation()}
                  className='form'
                  onSubmit={(e) => {
                     e.preventDefault();
                  }}>
                  <div className='inset'>
                     <input
                        maxLength={30}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder='Title'
                        type='text'
                        name='title'
                     />
                     <textarea
                        maxLength={160}
                        value={desc}
                        onChange={(e) => setdesc(e.target.value)}
                        placeholder='Description'
                        name='desc'></textarea>
                     <div className='buttons'>
                        <button onClick={cencelHandle} type='reset'>
                           Cencel
                        </button>
                        <button onClick={submitHandle}>Save</button>
                     </div>
                  </div>
               </form>
            )}
         </main>
      </div>
   );
}
