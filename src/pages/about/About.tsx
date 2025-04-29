import { useState } from "react";
import './About.module.scss'
const About = () => {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Обработка данных формы
    console.log({ name, url });
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    setUrl(newUrl);
    setImagePreview(newUrl);
  };

  return (
    <div className="imageFormContainer">
      <form onSubmit={handleSubmit} className="imageForm">
        <div className="formGroup">
          <label htmlFor="name">Название</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Введите название"
            required
          />
        </div>

        <div className="formGroup">
          <label style={{ color: 'white' }} htmlFor="url">URL изображения</label>
          <input
            type="url"
            id="url"
            value={url}
            onChange={handleUrlChange}
            placeholder="https://example.com/image.jpg"
            required
          />
        </div>

        {imagePreview && (
          <div className="imagePreview">
            <img src={imagePreview} alt="Предпросмотр" onError={() => setImagePreview('')} />
          </div>
        )}

        <button type="submit" className="submitButton">
          Подтвердить
        </button>
      </form>
    </div>
  );
};

export default About;
