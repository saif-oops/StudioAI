"use client";

import { useState } from "react";

type UploadBoxProps = {
  image: string | null;
  handleImageUpload: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  analyzeThumbnail: () => void;
};


export default function UploadBox({
  image,
  handleImageUpload,
  analyzeThumbnail,
}: UploadBoxProps) {

  const [dragActive, setDragActive] = useState(false);


  const handleDrop = (
    event: React.DragEvent<HTMLLabelElement>
  ) => {

    event.preventDefault();

    setDragActive(false);


    const file = event.dataTransfer.files[0];

    if (!file) return;


    const fakeEvent = {
      target: {
        files: [file],
      },
    } as unknown as React.ChangeEvent<HTMLInputElement>;


    handleImageUpload(fakeEvent);

  };



  return (

    <div className="mt-8 rounded-3xl border border-gray-800 bg-gray-950 p-8">


      <h3 className="mb-6 text-xl font-semibold">
        Upload Thumbnail
      </h3>



      {!image && (

        <label
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}

          onDragLeave={() => {
            setDragActive(false);
          }}

          onDrop={handleDrop}


          className={`
            flex h-64 cursor-pointer
            flex-col items-center justify-center
            rounded-2xl border-2 border-dashed
            transition

            ${
              dragActive
              ? "border-blue-500 bg-blue-500/10"
              : "border-gray-700"
            }
          `}
        >

          <div className="text-5xl">
            📤
          </div>


          <p className="mt-4 text-lg font-semibold">
            Drag & Drop your thumbnail
          </p>


          <p className="mt-2 text-sm text-gray-400">
            or click to browse
          </p>



          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />


        </label>

      )}




      {image && (

        <div className="space-y-6">


          <img
            src={image}
            alt="thumbnail preview"
            className="max-w-lg rounded-2xl border border-gray-700"
          />



          <button
            onClick={analyzeThumbnail}
            className="
            rounded-xl 
            bg-blue-600 
            px-8 py-3
            font-semibold
            hover:bg-blue-700
            transition
            "
          >
            Analyze Thumbnail ✨
          </button>


        </div>

      )}


    </div>

  );

}