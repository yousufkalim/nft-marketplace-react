
export const uploadNft = async (selectedImage) => {
    const data = new FormData();
    data.append("file", selectedImage);
    const res = await fetch(
      `https://nftdepot-api.azurewebsites.net/collections/0bb4ca4d-b3f2-4401-b5c8-2241c3765a1f/upload_nft_zip`,
      {
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
        maxRedirects: 0,
      }
    );
    const resKey = await res.json();
    return resKey;
  };
  