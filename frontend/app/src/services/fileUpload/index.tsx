import API from "../API";

const upload = (file: File, onUploadProgress: any): Promise<any> => {
  let formData = new FormData();

  formData.append("file", file);

  return API.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress,
  });
};

const getFiles = () : Promise<any> => {
  return API.get("/files");
};

const FileUploadService = {
  upload,
  getFiles,
};

export default FileUploadService;