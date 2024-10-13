import { useState } from 'react';

function App() {
  const [image, setImage] = useState(null);

  const handleUpload = async () => {
    if (!image) {
      console.log('no image selected');
      return;
    };

    const formData = new FormData();
    formData.append('image', image);

    try {
      // get a secure url from server
      const { url } = await fetch(`${process.env.REACT_APP_BACKEND_API}/s3-url`).then(res => res.json());
      console.log(url);

      // post image to s3
      await fetch(url, {
        method: 'PUT',
        headers: {
          "Content-Type": "multipart/form-data"
        },
        body: formData,
      })

      const imageUrl = url.split('?')[0];
      console.log(imageUrl);
      // to be stored in db...
      
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div>
        <input id="imageInput" type="file" accept="image/*" onChange={e => setImage(e.target.files[0])}/>
      </div>
      <div>
        <button onClick={handleUpload}>Upload</button>
      </div>
    </div>
  );
}

export default App;
