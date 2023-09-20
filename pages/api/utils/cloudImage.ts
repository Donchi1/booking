import { UploadApiResponse, v2 } from "cloudinary";
import formidable from "formidable";
import fs, { unlinkSync } from "fs";
import { NextApiRequest } from "next";
import path from "path";

const cloudinary = v2;
// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME || "donny12",
  api_key: process.env.API_KEY || "356334839991679",
  api_secret: process.env.API_SECRET || "gDkF1r2xFX9ZmUfm8-R-dOtaUXU",
});



// Upload

const formiDatableOptions:formidable.Options ={
   uploadDir: path.join(process.cwd(), "/pages/api/uploads"),
   filename: (name, ext, path, form) => {
    return Date.now().toString() + "_" + path.originalFilename
  },
  maxFileSize: 4000 * 1024 * 1024,
  multiples: true

}

const readFile = (
  req: NextApiRequest,
  ): Promise<{ fields: formidable.Fields;files: formidable.Files }> => {
  
  const form = formidable(formiDatableOptions);
  
    return new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve({fields, files})
      });
      
    });
  
};

const refactorField = (field: formidable.Fields | undefined)=> {

  const data = {
    username: field?.username[0],
    password: field?.password[0],
    email: field?.email[0],
    country: field?.country[0],
    firstname: field?.firstname[0],
    lastname: field?.lastname[0],
    city: field?.city[0],
    phone: field?.phone[0]
  }
  return data
}

export const imageUploaderMultiple = async (req: NextApiRequest) => {
  try {
    const {files, fields} = await readFile(req)
   
    //upload image to cloudinary
    const data = await Promise.all(
     files.file.map(async (each) => {
        return await cloudinary.uploader.upload(each.filepath, {public_id: each.originalFilename as string})
      })
    )
     //delete the uploaded files
    files.file.map((each) => unlinkSync(each.filepath))
  return { errorData: {message: null, error: false }, data : {fields: refactorField(fields), imgInfo: data}};
  }catch(err:any){  
    return { errorData: {message: err, error: true}, data: null };
  }

};
export const imageUploader = async (req: NextApiRequest) => {
   
  try {
    const {files, fields} = await readFile(req)
    
    //upload image to cloudinary
    const data = await cloudinary.uploader.upload(
       files?.file[0]?.filepath as string,
      { public_id: files?.file[0]?.originalFilename as string }
    );
    fs.unlinkSync(files?.file[0]?.filepath)
    return { error: false, data : {fields: refactorField(fields), imgInfo: data}};
  } catch (err: any) {
   
    return { errorData: {message: err, error: true}, data: null };
  }
};
export const imageDeleteMultiple = async (filesForDelete: UploadApiResponse[]) => {

  try {
    //delete image in cloudinary
  await Promise.all(
    filesForDelete.map(async (each) => {
      await cloudinary.uploader.destroy(each.public_id);
    })
    )
    return { errorData: {message: "", error: false}, data: null };
  } catch (err: any) {
    return { errorData: {message: err as string || undefined, error: true}, data: null };
  }
};
export const imageDelete = async (fileId: string) => {
  try {
    //delete image in cloudinary
    await cloudinary.uploader.destroy(fileId);
    return { errorData: {message: "", error: false}, data: null };
  } catch (err:any) {
    return { errorData: {message: err as string || undefined, error: true}, data: null };
  }
};
