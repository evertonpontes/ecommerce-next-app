import { NextRequest, NextResponse } from "next/server";

import { v4 as uuidv4 } from "uuid";

import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "@/lib/firebase";

export const POST = async (request: NextRequest) => {
  const data = await request.formData();
  const query = request.nextUrl.searchParams;

  const file = data.get("file") as unknown as File;
  const key = query.get("key");
  const name = query.get("name");
  const cat = query.get("cat");

  if (!file) {
    return;
  }

  const newFileName = `${uuidv4()}_${file.name}`;
  const storageRef = ref(
    storage,
    `files/${key || "others"}/${name?.replaceAll(" ", "_")}/${cat}/${newFileName}`
  );
  const uploadTask = uploadBytesResumable(storageRef, file);

  return await new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        return NextResponse.json(
          {
            error:
              "Failed to upload file to Firebase Storage. Please try again later.",
          },
          { status: 400 }
        );
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log("File available at", downloadURL);

          resolve(
            NextResponse.json({ downloadURL, newFileName }, { status: 201 })
          );
        });
      }
    );
  });
};

export const DELETE = async (request: NextRequest) => {
  const query = request.nextUrl.searchParams;
  const key = query.get("key");
  const name = query.get("name");
  const cat = query.get("cat");
  const newFileName = query.get("newFileName");

  console.log({ key, name });

  const desertRef = ref(storage, `files/${key || "others"}/${name?.replaceAll(" ", "_")}/${cat}/${newFileName}`);

  return await new Promise((resolve, reject) => {
    deleteObject(desertRef)
      .then(() => {
        resolve(
          NextResponse.json(
            { msg: "File successfully deleted." },
            { status: 201 }
          )
        );
      })
      .catch((error) => {
        reject(
          NextResponse.json(
            { error: "Failed to delete file. Please try again later." },
            { status: 400 }
          )
        );
      });
  });
};
