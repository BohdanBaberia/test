import { useEffect,useRef,useState } from "react";

function DragAndDrop ({handleFiles,fileType}){

    const [dragActive,setDragActive] = useState(false)
    const [accept] = useState(fileType || "") 

    const inputRef = useRef(null)

    const handleClick = () => {
        inputRef.current.click()
    }

    const handleDrag = function (e) {
        e.preventDefault()
        e.stopPropagation()

        if(e.type === "dragenter" || e.type === "dragover"){
            setDragActive(true)
        }
        else if(e.type === "dragleave"){ //else if ... better than if if cause 3 options can work at the same time
            setDragActive(false)
        }
    }

    const handleChange = function(e){
        e.preventDefault()
        if(e.target.files && e.target.files[0]){
            handleFiles(Array.from(e.target.files))
        }
    }

    const handleDrop = function (e){
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)

        if(e.dataTranser.files && e.dataTranser.files[0]) {
            handleFiles(Array.from(e.dataTranser.files))
        }
    }


    return (
       <form id="form_upload" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
            <input  type="file" id="input_upload" ref={inputRef} multiple={true}  onChange={handleChange} />
            <label id="label_upload" htmlFor="input_upload" className={dragActive ? "drag_active" : ""} >
                <div>
                    <p>Upload Files</p>
                    <button className="button_upload" onClick={handleClick}>Upload</button>
                </div>
                </label>
                { dragActive && 
                    <div id="drag_file" 
                        onDragEnter={handleDrag} 
                        onDragOver={handleDrag}
                        onDragLeave={handleDrag}
                        onDrop={handleDrop}
                    ></div>
                }

       </form>
    )
}

export default DragAndDrop;