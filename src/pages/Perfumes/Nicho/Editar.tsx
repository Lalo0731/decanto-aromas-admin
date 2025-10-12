// src/pages/Perfumes/Edit/Editar.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../../styles/pages/perfumesNew.scss"; // mismo estilo que crear
import { getPerfumeById, updatePerfume, uploadPerfumeImages } from "../../../services/perfumes";
import { showSuccess, showError, showWarning } from "../../../utils/alerts";

const PerfumesNichoEdit: React.FC = () => {
  const { id } = useParams();
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precioAntes, setPrecioAntes] = useState("");
  const [precio, setPrecio] = useState("");
  const [decantsUnicamente, setDecantsUnicamente] = useState(false);
  const [precioDecants, setPrecioDecants] = useState("");
  const [decants, setDecants] = useState(false);
  const [nuevo, setNuevo] = useState(false);
  const [disponible, setDisponible] = useState(false);

  const [acordes, setAcordes] = useState<any[]>([]);
  const [especialPara, setEspecialPara] = useState<any[]>([]);
  const [imagenes, setImagenes] = useState<FileList | null>(null);
  const [imagenesExistentes, setImagenesExistentes] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const res = await getPerfumeById(Number(id));
          console.log("Data:",res.data);
          const p = res.data;

          setNombre(p.name || "");
          setDescripcion(p.description || "");
          setPrecioAntes(p.price?.toString() || "");
          setPrecio(p.price?.toString() || "");
          setDecantsUnicamente(p.isDecantOnly || false);
          setPrecioDecants(p.priceDecant?.toString() || "");
          setDecants(p.isDecant || false);
          setNuevo(p.isNew || false);
          setDisponible(p.available || false);
          setAcordes(p.accords || []);
          setEspecialPara(p.specialFor || []);
          setImagenesExistentes(p.images || []);

        } catch (err) {
          showError("Error al obtener perfume");
        }
      }
    };
    fetchData();
  }, [id]);

  const handleReplaceImage = async (imageId: number, file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`${import.meta.env.VITE_API_URL}/perfumes-images/${imageId}/replace`, {
        method: "PUT",
        body: formData,
      });

      if(!response.ok){
        throw new Error("Error en la actualización de la imagen")
      }

      const data = await response.json();
      const newImageFileName = data?.newImageUrl || file.name;

      const updatedImages = imagenesExistentes.map((img) => 
        img.id === imageId ? { ...img, image_url: newImageFileName } : img
      );
      setImagenesExistentes(updatedImages);

      showSuccess("Imagen reemplazada con éxito");
      // window.location.reload();
    } catch (err) {
      console.error(err);
      showError("Error al reemplazar imagen");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre || !descripcion || !precio) {
      showWarning("Todos los campos son obligatorios");
      return;
    }

    try {
      const payload : any = {
        name: nombre,
        description: descripcion,
        category: "nicho",
        price: Number(precio),
        oldPrice: Number(precioAntes),
        isDecantOnly: decantsUnicamente,
        priceDecant: decants ? Number(precioDecants) : null,
        isDecant: decants,
        isNew: nuevo,
        available: disponible,
        
        
      };

      if(acordes.length > 0){
        payload.accords = acordes.map((a) => ({
          id: a.id,
          accord: a.accord,
        }));
      }

      if(especialPara.length > 0){
        payload.specialFor = especialPara.map((s) => ({
          id: s.id,
          context: s.context,
        }));
      }

      await updatePerfume(Number(id), payload);

      if (imagenes) {
        await uploadPerfumeImages(Number(id), imagenes);
      }

      showSuccess("Perfume actualizado con éxito");
    } catch (error) {
      console.log("Error al actualizar perfume", error);
      showError("Error al actualizar perfume");
    }
  };

  return (
    <div className="perfumes-udpate">
      <h2>Editar Perfume Nicho</h2>
      <form className="perfumes-form" onSubmit={handleSubmit}>
        {/* Nombre */}
        <div className="perfumes-form__group">
          <label>Nombre</label>
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        </div>

        {/* Descripción */}
        <div className="perfumes-form__group full-width">
          <label>Descripción</label>
          <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
        </div>

        {/* Precio Antes*/}
        <div className="perfumes-form__group">
          <label>Precio Antes</label>
          <input type="number" value={precioAntes} onChange={(e) => setPrecioAntes(e.target.value)} />
        </div>

        {/* Precio */}
        <div className="perfumes-form__group">
          <label>Precio</label>
          <input type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} />
        </div>

        {/* Decants */}
        <div className="perfumes-form__group">
          <label>Decants</label>
          <select value={decants ? "true" : "false"} onChange={(e) => setDecants(e.target.value === "true")}>
            <option value="false">No</option>
            <option value="true">Sí</option>
          </select>
        </div>

        {decants && (
          <>
            {/* Precio Decants */}
            <div className="perfumes-form__group">
              <label>Precio Decants</label>
              <input
                type="number"
                value={precioDecants}
                onChange={(e) => setPrecioDecants(e.target.value)}
              />
            </div>

            {/* Únicamente Decants */}
            <div className="perfumes-form__group">
              <label>¿Únicamente Decants?</label>
              <select
                value={decantsUnicamente ? "true" : "false"}
                onChange={(e) => setDecantsUnicamente(e.target.value === "true")}
              >
                <option value="false">No</option>
                <option value="true">Sí</option>
              </select>
            </div>
          </>
        )}

        {/* Nuevo */}
        <div className="perfumes-form__group">
          <label>¿Es Nuevo?</label>
          <select value={nuevo ? "true" : "false"} onChange={(e) => setNuevo(e.target.value === "true")}>
            <option value="false">No</option>
            <option value="true">Sí</option>
          </select>
        </div>

        {/* Disponible */}
        <div className="perfumes-form__group">
          <label>¿Disponible?</label>
          <select value={disponible ? "true" : "false"} onChange={(e) => setDisponible(e.target.value === "true")}>
            <option value="false">No</option>
            <option value="true">Sí</option>
          </select>
        </div>

        <div className="perfumes-form__group full-width">
          <label>Acordes principales</label>
          <textarea
            value={acordes.map((a) => a.accord).join(", ")}
            onChange={(e) => {
              const values = e.target.value.split(",").map((v) => v.trim());
              setAcordes((prev) =>
                values.map((val, idx) => {
                  const existente = prev[idx];
                  if (existente) return { ...existente, accord: val };
                  return { accord: val };
                })
              );
            }}
            placeholder="Ejemplo: Amaderado, Floral, Dulce..."
          />
        </div>

        <div className="perfumes-form__group full-width">
          <label>Especial para</label>
          <textarea
            value={especialPara.map((s) => s.context).join(", ")}
            onChange={(e) => {
              const values = e.target.value.split(",").map((v) => v.trim());
              setEspecialPara((prev) =>
                values.map((val, idx) => {
                  const existente = prev[idx];
                  if (existente) return { ...existente, context: val };
                  return { context: val };
                })
              );
            }}
            placeholder="Ejemplo: Día, Noche, Invierno, Primavera..."
          />
        </div>

        <div className="perfumes-form__group full-width">
          <label>Imágenes actuales</label>
          <div className="perfumes-images-list">
            {imagenesExistentes.length > 0 ? (
              imagenesExistentes.map((img, idx) => (
                <div key={img.id} className="perfume-image-item">
                  <img
                    src={`${import.meta.env.VITE_API_URL}/uploads/perfumes/${img.image_url}`}
                    alt={`Imagen ${idx + 1}`}
                    width="120"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleReplaceImage(img.id, e.target.files[0]);
                      }
                    }}
                  />
                </div>
              ))
            ) : (
              <p>No hay imágenes cargadas</p>
            )}
          </div>
        </div>

        <div className="perfumes-form__group full-width">
          <label>Actualizar imágenes (opcional)</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setImagenes(e.target.files)}
          />
        </div>

        <div className="perfumes-form__actions full-width">
          <button type="submit" className="perfumes-btn">
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  );
};

export default PerfumesNichoEdit;
