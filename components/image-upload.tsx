"use client";

import React, { useRef, useState } from "react";
import { IKImage, ImageKitProvider, IKUpload } from "imagekitio-next";
import config from "@/lib/config";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";

const { publicKey, urlEndpoint } = config.env.imagekit;

const authenticator = async () => {
  try {
    const response = await fetch(
      `${config.env.apiEndpoint}/api/auth/imagekit  `
    );
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }
    const data = await response.json();
    const { signature, expire, token } = data;
    return { token, signature, expire };
  } catch (error: any) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

type TProps = {
  onFileChange: (filePath: string) => void;
};

const ImageUpload = ({ onFileChange }: TProps) => {
  const { toast } = useToast();
  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string } | null>(null);

  const onError = (error: unknown) => {
    console.log("@Error in image upload", error);
    toast({
      title: "Image uploaded failed",
      description: `Your image could not be uploaded`,
      variant: "destructive",
    });
  };
  const onSuccess = (res: any) => {
    setFile(res);
    onFileChange(res.filePath);
    toast({
      title: "Image uploaded successfully",
      description: `${res.filePath} uploaded successfully`,
    });
  };

  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        className="hidden"
        ref={ikUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        fileName="test-upload.png"
      />
      <button
        className="upload-btn bg-slate-800"
        type="button"
        onClick={(e) => {
          e.preventDefault();
          if (ikUploadRef.current) {
            //@ts-ignore
            ikUploadRef.current?.click();
          }
        }}
      >
        <Image
          src="/icons/upload.svg"
          alt="upload-icon"
          width={20}
          height={20}
          className="object-contain"
        />
        <p className="text-base text-light-100">Upload a file</p>
        {file && <p className="upload-filename">{file.filePath}</p>}
      </button>
      {file && (
        <IKImage
          alt={file.filePath}
          path={file.filePath}
          width={500}
          height={300}
        />
      )}
    </ImageKitProvider>
  );
};

export default ImageUpload;
