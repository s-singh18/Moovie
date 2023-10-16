const uploadVideo = async ({ irys, fileToUpload, title, user }) => {
  // const irys = await getIrys();
  // Your file
  // const fileToUpload = "./myImage.png";

  console.log("Video upload Irys", irys);
  console.log("Video upload fileToUpload", fileToUpload);
  console.log("Video upload title", title);
  console.log("Video upload user", user);

  const tags = [
    { name: "Content-Type", value: "video/mp4" },
    { name: "application-id", value: "Moovie" },
    { name: "title", value: title },
    { name: "user", value: user },
  ];

  try {
    const receipt = await irys.uploadFile(fileToUpload, { tags });
    console.log(`File uploaded ==> https://gateway.irys.xyz/${receipt.id}`);
    return receipt;
  } catch (e) {
    console.log("Error uploading file ", e);
  }
};

export default uploadVideo;
