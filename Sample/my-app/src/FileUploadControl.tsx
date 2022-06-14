import { useRef } from "react";
import * as React from "react";

const FileUploadControl = () => {
    const ImageUploadWrap: React.RefObject<any> = useRef(null);
    const FileUploadImage: React.RefObject<any> = useRef(null);
    const FileUploadContent: React.RefObject<any> = useRef(null);
    const FileUploadInput : React.RefObject<any>= useRef(null)
    const ImageTitle: React.RefObject<any> = React.useRef();

    React.useEffect(()=>{
        ImageUploadWrap.current.hidden = false;
        FileUploadContent.current.hidden = true;
        ImageUploadWrap.current.addEventListener('dragover',  () => {
            ImageUploadWrap.current.classList.add('image-dropping'); 
        }); 
        ImageUploadWrap.current.addEventListener('dragleave',  () => {
            ImageUploadWrap.current.classList.remove('image-dropping'); 
        }); 
    },[]);

    const removeUpload = () => {
        // FileUploadInput.current.replaceWith()
        FileUploadContent.current.hidden = true;
        ImageUploadWrap.current.hidden = false;
        FileUploadInput.current.value = null;
        // $('.file-upload-input').replaceWith($('.file-upload-input').clone());
        // $('.file-upload-content').hide();
        // $('.image-upload-wrap').show();
    }

    const readURL = (e: any) => { 
        if (e.target.files && e.target.files[0]) {
            var reader = new FileReader();
            reader.onload = function (file) {
                ImageUploadWrap.current.hidden = true;
                FileUploadImage.current.setAttribute('src', file.target?.result);
                FileUploadContent.current.hidden = false;
                ImageTitle.current.InnerHTML = e.target?.files[0].name; 
            };
            reader.readAsDataURL(e.target.files[0]);
        } else {
            removeUpload();
        }
    }

    return (
        <div className="file-upload">
            <div className="image-upload-wrap" ref={ImageUploadWrap}>
                <input className="file-upload-input" type='file' onChange={readURL.bind(this)} accept="image/*" ref={FileUploadInput} />
                <div className="drag-text">
                    <h3>Drag and drop a file or select add Image</h3>
                </div>
            </div>
            <div className="file-upload-content" ref={FileUploadContent}>
                <img className="file-upload-image" src="#" alt="your image" ref={FileUploadImage} />
                <div className="image-title-wrap">
                    <button type="button" onClick={()=>removeUpload()} className="remove-image">Remove 
                        <span className="image-title" ref={ImageTitle}>Uploaded Image</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FileUploadControl;